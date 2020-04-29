import React, { Component } from 'react';
import Form from '../../components/UI/Form/Form';
import { updateObject, createInputElements, createStateInput, checkValidity, checkFormValidation } from '../../shared/utility';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/indexActions';

class RemoveAdmin extends Component {
  state = {
    email: createStateInput('input', 'Email', '',
      { type: 'email', id: 'email', autoComplete: 'email', placeholder: `Email of admin to remove` },
      { isEmail: true },
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
    const email = this.state.email.value.trim();
    this.props.onRemoveAdmin(email);
  };

  render () {
    const inputs = createInputElements(this.state, this.inputChangedHandler);

    return (
      <Form
        headingText="Remove Admin"
        btnText="Remove"
        isValid={checkFormValidation(this.state)}
        submitted={this.formSubmittedHandler}
      >
        {inputs}
      </Form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onRemoveAdmin: (email) => dispatch(actions.removeAdmin(email)),
  onDeleteError: () => dispatch(actions.deleteError()),
});

export default connect(null, mapDispatchToProps)(RemoveAdmin);