import React, { Component } from 'react';
import Form from '../../components/UI/Form/Form';
import { updateObject, createInputElements, createStateInput, checkValidity, checkFormValidation } from '../../shared/utility';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/indexActions';

class ChangeEmail extends Component {
  state = {
    oldEmail: createStateInput('input', 'Old email', '',
      { type: 'email', id: 'oldEmail', autoComplete: 'email', placeholder: 'Your old email...' },
      null,
      true,
    ),
    newEmail: createStateInput('input', 'New email', '',
      { type: 'email', id: 'newEmail', autoComplete: 'email', placeholder: 'Your new email...' },
      { isEmail: true },
      false,
    ),
    password: createStateInput('input', 'Password', '',
      { type: 'password', id: 'password', autoComplete: 'current-password', placeholder: 'Your password...' },
      null,
      true,
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
    this.props.onChangeEmail(data, this.props.history);
  };

  render () {
    const inputs = createInputElements(this.state, this.inputChangedHandler);

    return (
      <Form
        headingText="Change Email"
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
  onChangeEmail: (data, history) => dispatch(actions.changeEmail(data, history)),
  onDeleteError: () => dispatch(actions.deleteError()),
});

export default connect(null, mapDispatchToProps)(ChangeEmail);