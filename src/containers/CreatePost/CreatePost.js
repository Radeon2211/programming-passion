import React, { Component } from 'react';
import Form from '../../components/UI/Form/Form';
import { updateObject, createInputElements, createStateInput, checkValidity, checkFormValidation } from '../../shared/utility';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/indexActions';

class SignUp extends Component {
  state = {
    title: createStateInput('input', 'Title', '',
      { type: 'text', id: 'title', autoComplete: 'off', placeholder: 'Post title...' },
      { minLength: 1, maxLength: 100 }
    ),
    content: createStateInput('textarea', 'Content', '',
      { id: 'content', placeholder: 'Share your thoughts...' },
      { minLength: 1, maxLength: 400 }
    ),
  };

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
    this.props.onCreatePost(data);
  };

  render () {
    const inputs = createInputElements(this.state, this.inputChangedHandler);

    return (
      <Form
        headingText="Create Post"
        btnText="Create"
        isValid={checkFormValidation(this.state)}
        submitted={this.formSubmittedHandler}
      >
        {inputs}
      </Form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onCreatePost: (data) => dispatch(actions.createPost(data)),
});

export default connect(null, mapDispatchToProps)(SignUp);