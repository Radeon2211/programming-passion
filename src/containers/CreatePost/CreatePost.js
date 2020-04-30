import React, { Component } from 'react';
import Form from '../../components/UI/Form/Form';
import { updateObject, createInputElements, createStateInput, checkValidity, checkFormValidation } from '../../shared/utility';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/indexActions';

class SignUp extends Component {
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
    this.props.onCreatePost(data, this.props.history, this.props.canAddPost);
  };

  render () {
    const inputs = createInputElements(this.state, this.inputChangedHandler);

    return (
      <Form
        headingText="Create Post"
        btnText="Create"
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
  canAddPost: state.post.canAddPost,
});

const mapDispatchToProps = (dispatch) => ({
  onCreatePost: (data, history, canAddPost) => dispatch(actions.createPost(data, history, canAddPost)),
  onDeleteError: () => dispatch(actions.deleteError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);