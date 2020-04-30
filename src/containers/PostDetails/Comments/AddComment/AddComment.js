import React, { Component } from 'react';
import { updateObject, createInputElements, createStateInput, checkValidity, checkFormValidation } from '../../../../shared/utility';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/indexActions';
import Form from '../../../../components/UI/Form/Form';

class AddComment extends Component {
  state = {
    content: createStateInput('textarea', 'Add comment', '',
      { id: 'content', autoComplete: 'off', placeholder: 'What do you think about this post...' },
      { minLength: 1, maxLength: 400 },
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
    const content = this.state.content.value.trim();
    this.props.onAddComment(content, this.props.postID, this.props.postAuthorUID, this.props.canAddComment);
  };

  render () {
    const inputs = createInputElements(this.state, this.inputChangedHandler);

    return (
      <Form
        btnText="Add"
        isValid={checkFormValidation(this.state)}
        submitted={this.formSubmittedHandler}
        isPostForm
      >
        {inputs}
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({
  canAddComment: state.post.canAddComment,
});

const mapDispatchToProps = (dispatch) => ({
  onAddComment: (content, postID, postAuthorUID, canAddComment) => dispatch(actions.addComment(content, postID, postAuthorUID, canAddComment)),
  onDeleteError: () => dispatch(actions.deleteError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddComment);