import React, { Component } from 'react';
import Form from '../../components/UI/Form/Form';
import { updateObject, createInputElements, createStateInput, checkValidity, checkFormValidation } from '../../shared/utility';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/indexActions';

class SignUp extends Component {
  state = {
    email: createStateInput('input', 'Email', '',
      { type: 'email', id: 'email', autoComplete: 'email', placeholder: 'Your email...' },
      { isEmail: true },
    ),
    password: createStateInput('input', 'Password', '',
      { type: 'password', id: 'password', autoComplete: 'new-password', placeholder: 'Type safe password...' },
      { minLength: 6 },
    ),
    firstName: createStateInput('input', 'First name', '',
      { type: 'text', id: 'firstName', autoComplete: 'given-name', placeholder: 'Your first name...' },
      { minLength: 1, maxLength: 50 },
    ),
    lastName: createStateInput('input', 'Last name', '',
      { type: 'text', id: 'lastName', autoComplete: 'family-name', placeholder: 'Your last name...' },
      { minLength: 1, maxLength: 50 },
    )
  };

  componentDidMount() {
    this.props.onDeleteError();
  }

  inputChangedHandler = (inputId, e) => {
    this.setState({
      [inputId]: updateObject(this.state[inputId], {
        value: inputId === 'password' ? e.target.value.trim() : e.target.value,
        valid: checkValidity(e.target.value, this.state[inputId].validation),
        touched: true,
      }),
    });
  };

  formSubmittedHandler = (e) => {
    e.preventDefault();
    if (!checkFormValidation(this.state)) return;
    const data = {};
    for (const key in this.state) {
      data[key] = this.state[key].value.trim();
    }
    this.props.onSignUp(data, this.props.history, this.props.autoRedirectPath);
  };

  render () {
    const inputs = createInputElements(this.state, this.inputChangedHandler);

    return (
      <Form
        headingText="Sign Up"
        btnText="Join our community"
        isValid={checkFormValidation(this.state)}
        submitted={this.formSubmittedHandler}
      >
        {inputs}
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({
  autoRedirectPath: state.auth.autoRedirectPath,
});

const mapDispatchToProps = (dispatch) => ({
  onSignUp: (data, history, redirectPath) => dispatch(actions.signUp(data, history, redirectPath)),
  onDeleteError: () => dispatch(actions.deleteError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);