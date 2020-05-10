import React, { useState, useEffect, useCallback, useRef } from 'react';
import Form from '../../components/UI/Form/Form';
import { useSelector, useDispatch } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { updateObject, createInputElements, createStateInput, checkValidity, checkFormValidation } from '../../shared/utility';
import { actionTypes as firestoreActionTypes } from 'redux-firestore';
import * as actions from '../../store/actions/indexActions';
import Heading from '../../components/UI/Heading/Heading';
import Loader from '../../components/UI/Loader/Loader';

const EditPost = (props) => {
  const oldData = useRef({
    title: null,
    content: null,
  });

  const [controls, setControls] = useState({
    title: createStateInput('input', 'Title', '',
      { type: 'text', id: 'title', autoComplete: 'off', placeholder: 'Post title...' },
      { minLength: 1, maxLength: 200 },
    ),
    content: createStateInput('textarea', 'Content', '',
      { id: 'content', placeholder: 'Share your thoughts...' },
      { minLength: 1, maxLength: 1200 },
    ),
  });

  const canEditPost = useSelector((state) => state.post.canWritePost);
  const post = useSelector((state) => state.firestore.data.post === undefined ? undefined : state.firestore.data.post);

  const dispatch = useDispatch();
  const onDeleteError = useCallback(() => dispatch(actions.deleteError()), [dispatch]);
  const onEditPost = (data, postID, history, canEditPost) => dispatch(actions.editPost(data, postID, history, canEditPost));

  useEffect(() => {
    onDeleteError();
  }, [onDeleteError]);

  const updateStateValues = useCallback(() => {
    setControls((prevState) => ({
      ...prevState,
      title: updateObject(controls.title, {
        value: post.title,
        valid: true,
      }),
      content: updateObject(controls.content, {
        value: post.content,
        valid: true,
      }),
    }));

    oldData.current = {
      title: post.title,
      content: post.content,
    };
  }, [controls, post]);

  useEffect(() => {
    if (post && controls.title.value === '') {
      updateStateValues();
    }
  }, [updateStateValues, controls, post]);

  const { dispatch: firestoreDispatch } = props;

  useEffect(() => {
    return () => {
      firestoreDispatch({
        type: firestoreActionTypes.CLEAR_DATA,
        preserve: { ordered: true, data: ['allPosts', 'comments', 'userPosts'] },
      });
    };
  }, [updateStateValues, firestoreDispatch]);

  const inputChangedHandler = (inputId, e) => {
    e.persist();
    setControls((prevState) => ({
      ...prevState,
      [inputId]: updateObject(controls[inputId], {
        value: e.target.value,
        valid: checkValidity(e.target.value, controls[inputId].validation),
        touched: true,
      }),
    }));
  };

  const editingCancelledHandler = () => {
    props.history.goBack();
  };

  const formSubmittedHandler = (e) => {
    e.preventDefault();
    const data = {};
    for (const key in controls) {
      data[key] = controls[key].value.trim();
    }
    if (data.title === oldData.current.title && data.content === oldData.current.content) {
      props.history.push(`/posts/${props.match.params.id}`);
      return;
    }
    onEditPost(data, props.match.params.id, props.history, canEditPost);
  };

  const inputs = createInputElements(controls, inputChangedHandler);

  let form = <Loader size="Small" />;
  if (post === null) {
    form = <Heading variant="H6">This post does not exists</Heading>
  } else {
    form = (
      <Form
        headingText={`Edit Post${post ? `: ${post.title}` : ''}`}
        btnText="Edit"
        isValid={checkFormValidation(controls)}
        submitted={formSubmittedHandler}
        isPostForm
        cancelled={editingCancelledHandler}
      >
        {inputs}
      </Form>
    )
  }

  return form;
};

export default firestoreConnect((state) => [
  { collection: 'posts', doc: state.match.params.id, storeAs: 'post' },
])(EditPost);