import React, { Component } from 'react';
import Form from '../../components/UI/Form/Form';
import { updateObject, createInputElements, createStateInput, checkValidity, checkFormValidation } from '../../shared/utility';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/indexActions';

class ChangeNick extends Component {
  state = {
    newFirstName: createStateInput('input', 'New first name', '',
      { type: 'text', id: 'newFirstName', autoComplete: 'given-name', placeholder: 'Your new first name...' },
      { minLength: 1, maxLength: 50 },
      false,
    ),
    newLastName: createStateInput('input', 'New last name', '',
      { type: 'text', id: 'newLastName', autoComplete: 'family-name', placeholder: 'Your new last name...' },
      { minLength: 1, maxLength: 50 },
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
    this.props.onChangeName(data, this.props.history);
  };

  render () {
    const inputs = createInputElements(this.state, this.inputChangedHandler);

    return (
      <Form
        headingText="Change Name"
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
  onChangeName: (data, history) => dispatch(actions.changeName(data, history)),
  onDeleteError: () => dispatch(actions.deleteError()),
});

export default connect(null, mapDispatchToProps)(ChangeNick);