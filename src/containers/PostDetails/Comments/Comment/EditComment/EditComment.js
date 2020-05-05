import React, { Component } from 'react';
import { updateObject, createInputElements, createStateInput, checkValidity, checkFormValidation } from '../../../../../shared/utility';
import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions/indexActions';
import Form from '../../../../../components/UI/Form/Form';

class EditComment extends Component {
  state = {
    content: createStateInput('textarea', 'Content', this.props.currentContent,
      { id: 'content', autoComplete: 'off', placeholder: 'What do you think about this post...' },
      { minLength: 1, maxLength: 400 },
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
        touched: e.target.value.length > 0 ? true : false,
      }),
    });
  };

  formSubmittedHandler = (e) => {
    e.preventDefault();
    const content = this.state.content.value.trim();
    if (content === this.props.currentContent) {
      this.props.cancelled();
      return;
    }
    this.props.onEditComment(content, this.props.commentID, this.props.canEditComment, this.props.cancelled);
  };

  render () {
    const inputs = createInputElements(this.state, this.inputChangedHandler);

    return (
      <Form
        btnText="Edit"
        isValid={checkFormValidation(this.state)}
        submitted={this.formSubmittedHandler}
        isPostForm
        cancelled={this.props.cancelled}
      >
        {inputs}
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({
  canEditComment: state.post.canWriteComment,
});

const mapDispatchToProps = (dispatch) => ({
  onEditComment: (content, commentID, canEditComment, closed) => dispatch(actions.editComment(content, commentID, canEditComment, closed)),
  onDeleteError: () => dispatch(actions.deleteError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditComment);