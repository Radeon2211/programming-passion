import React, { useState, useEffect, useCallback } from 'react';
import Form from '../../components/UI/Form/Form';
import { updateObject, createInputElements, createStateInput, checkValidity, checkFormValidation } from '../../shared/utility';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions/indexActions';

const CreatePost = (props) => {
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

  const canWritePost = useSelector((state) => state.post.canWritePost);

  const dispatch = useDispatch();
  const onDeleteError = useCallback(() => dispatch(actions.deleteError()), [dispatch]);
  const onCreatePost = (data, history, canWritePost) => dispatch(actions.createPost(data, history, canWritePost));

  useEffect(() => {
    onDeleteError();
  }, [onDeleteError]);

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

  const formSubmittedHandler = (e) => {
    e.preventDefault();
    const data = {};
    for (const key in controls) {
      data[key] = controls[key].value.trim();
    }
    onCreatePost(data, props.history, canWritePost);
  };

  const inputs = createInputElements(controls, inputChangedHandler);

  return (
    <Form
      headingText="Create Post"
      btnText="Create"
      isValid={checkFormValidation(controls)}
      submitted={formSubmittedHandler}
      isPostForm
    >
      {inputs}
    </Form>
  );
};

export default CreatePost;