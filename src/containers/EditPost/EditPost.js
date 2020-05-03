import React, { Component } from 'react';
import Form from '../../components/UI/Form/Form';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { updateObject, createInputElements, createStateInput, checkValidity, checkFormValidation } from '../../shared/utility';
import { actionTypes as firestoreActionTypes } from 'redux-firestore';
import * as actions from '../../store/actions/indexActions';
import Heading from '../../components/UI/Heading/Heading';
import Loader from '../../components/UI/Loader/Loader';

class EditPost extends Component {
  state = {
    title: createStateInput('input', 'Title', '',
      { type: 'text', id: 'title', autoComplete: 'off', placeholder: 'Post title...' },
      { minLength: 1, maxLength: 200 },
    ),
    content: createStateInput('textarea', 'Content', '',
      { id: 'content', placeholder: 'Share your thoughts...' },
      { minLength: 1, maxLength: 1200 },
    ),
  };

  oldData = {
    title: null,
    content: null,
  };

  componentDidMount() {
    this.props.onDeleteError();
  }

  componentDidUpdate() {
    if (this.props.post && this.state.title.value === '') {
      this.updateStateValues();
    }
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: firestoreActionTypes.CLEAR_DATA,
      preserve: { ordered: true, data: ['allPosts', 'comments', 'userPosts'] },
    });
  }

  updateStateValues() {
    this.setState({
      title: updateObject(this.state.title, {
        value: this.props.post.title,
        valid: true,
      }),
      content: updateObject(this.state.content, {
        value: this.props.post.content,
        valid: true,
      }),
    });

    this.oldData = {
      title: this.props.post.title,
      content: this.props.post.content,
    };
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

  editingCancelledHandler = () => {
    this.props.history.goBack();
  };

  formSubmittedHandler = (e) => {
    e.preventDefault();
    const data = {};
    for (const key in this.state) {
      data[key] = this.state[key].value.trim();
    }
    if (data.title === this.oldData.title && data.content === this.oldData.content) {
      this.props.history.push(`/posts/${this.props.match.params.id}`);
      return;
    }
    this.props.onEditPost(data, this.props.match.params.id, this.props.history, this.props.canEditPost);
  };

  render () {
    const inputs = createInputElements(this.state, this.inputChangedHandler);

    let form = <Loader size="Small" />;
    if (this.props.post === null) {
      form = <Heading variant="H6">This post does not exists</Heading>
    } else {
      form = (
        <Form
          headingText={`Edit Post${this.props.post ? `: ${this.props.post.title}` : ''}`}
          btnText="Edit"
          isValid={checkFormValidation(this.state)}
          submitted={this.formSubmittedHandler}
          isPostForm
          cancelled={this.editingCancelledHandler}
        >
          {inputs}
        </Form>
      )
    }

    return form;
  }
}

const mapStateToProps = (state) => ({
  canEditPost: state.post.canWritePost,
  post: state.firestore.data.post === undefined ? undefined : state.firestore.data.post,
});

const mapDispatchToProps = (dispatch) => ({
  onEditPost: (data, postID, history, canEditPost) => dispatch(actions.editPost(data, postID, history, canEditPost)),
  onDeleteError: () => dispatch(actions.deleteError()),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((state) => [
    { collection: 'posts', doc: state.match.params.id, storeAs: 'post' },
  ])
)(EditPost);