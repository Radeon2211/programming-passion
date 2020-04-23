import React, { Component } from 'react';
import Form from '../../components/UI/Form/Form';
import { updateObject, createInputElements, createStateInput, checkValidity, checkFormValidation } from '../../shared/utility';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/indexActions';

class DeleteAccount extends Component {
  state = {
    email: createStateInput('input', 'Email', '',
      { type: 'email', id: 'email', autoComplete: 'email', placeholder: 'Your email...' },
      null,
      true,
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
    this.props.onDeleteAccount(data, this.props.history);
  };

  render () {
    const inputs = createInputElements(this.state, this.inputChangedHandler);

    return (
      <Form
        headingText="Delete Account"
        btnText="Delete"
        isValid={checkFormValidation(this.state)}
        submitted={this.formSubmittedHandler}
      >
        {inputs}
      </Form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onDeleteAccount: (data, history) => dispatch(actions.deleteAccount(data, history)),
  onDeleteError: () => dispatch(actions.deleteError()),
});

export default connect(null, mapDispatchToProps)(DeleteAccount);