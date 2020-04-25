import React, { Component } from 'react';
import { updateObject, createInputElements, createStateInput, checkValidity, checkFormValidation } from '../../../../../shared/utility';
import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions/indexActions';
import Form from '../../../../../components/UI/Form/Form';

class AddComment extends Component {
  state = {
    content: createStateInput('textarea', 'Add comment', '',
      { id: 'content', autoComplete: 'off', placeholder: 'What do you think about this post...' },
      { minLength: 1, maxLength: 250 },
      false,
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
    const content = this.state.content.value.trim();
    this.props.onAddComment(content, this.props.postID);
  };

  render () {
    const inputs = createInputElements(this.state, this.inputChangedHandler);

    return (
      <Form
        btnText="Add"
        isValid={checkFormValidation(this.state)}
        submitted={this.formSubmittedHandler}
      >
        {inputs}
      </Form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onAddComment: (content, postID) => dispatch(actions.addComment(content, postID)),
});

export default connect(null, mapDispatchToProps)(AddComment);