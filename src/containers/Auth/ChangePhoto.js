import React, { Component } from 'react';
import Form from '../../components/UI/Form/Form';
import { updateObject, createInputElements, createStateInput, checkValidity, checkFormValidation } from '../../shared/utility';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/indexActions';

class ChangePhoto extends Component {
  state = {
    newPhotoURL: createStateInput('input', 'New photo URL', '',
      { type: 'text', id: 'newPhotoURL', autoComplete: 'photo', placeholder: 'Your new photo URL...' },
      { isPhoto: true },
      false,
    ),
  };

  componentDidMount() {
    this.props.onDeleteError();
  }

  inputChangedHandler = (inputId, e) => {
    this.setState({
      [inputId]: updateObject(this.state[inputId], {
        value: e.target.value,
        valid: checkValidity(e.target.value, this.state[inputId].validation),
        touched: true,
      }),
    });
  };

  formSubmittedHandler = (e) => {
    e.preventDefault();
    const data = {};
    for (const key in this.state) {
      data[key] = this.state[key].value.trim();
    }
    this.props.onChangePhoto(data, this.props.history);
  };

  render () {
    const inputs = createInputElements(this.state, this.inputChangedHandler);

    return (
      <Form
        headingText="Change photo"
        btnText="Change"
        isValid={checkFormValidation(this.state)}
        submitted={this.formSubmittedHandler}
      >
        {inputs}
      </Form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onChangePhoto: (data, history) => dispatch(actions.changePhoto(data, history)),
  onDeleteError: () => dispatch(actions.deleteError()),
});

export default connect(null, mapDispatchToProps)(ChangePhoto);