import React, { Component } from 'react';
import Form from '../../components/UI/Form/Form';
import { updateObject, createInputElements, createStateInput, checkValidity, checkFormValidation } from '../../shared/utility';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/indexActions';

class ChangePassword extends Component {
  state = {
    email: createStateInput('input', 'Email', '',
      { type: 'email', id: 'email', autoComplete: 'email', placeholder: 'Your email...' },
      null,
      true,
    ),
    oldPassword: createStateInput('input', 'Old password', '',
      { type: 'password', id: 'oldPassword', autoComplete: 'current-password', placeholder: 'Your old password...' },
      null,
      true,
    ),
    newPassword: createStateInput('input', 'New password', '',
      { type: 'password', id: 'newPassword', autoComplete: 'new-password', placeholder: 'Type safe password...' },
      { minLength: 6 },
    ),
  };

  componentDidMount() {
    this.props.onDeleteError();
  }

  inputChangedHandler = (inputId, e) => {
    this.setState({
      [inputId]: updateObject(this.state[inputId], {
        value: inputId === 'newPassword' ? e.target.value.trim() : e.target.value,
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
    this.props.onChangePassword(data, this.props.history);
  };

  render () {
    const inputs = createInputElements(this.state, this.inputChangedHandler);

    return (
      <Form
        headingText="Change Password"
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
  onChangePassword: (data, history) => dispatch(actions.changePassword(data, history)),
  onDeleteError: () => dispatch(actions.deleteError()),
});

export default connect(null, mapDispatchToProps)(ChangePassword);