import React, { useState, useEffect, useCallback } from 'react';
import { updateObject, createInputElements, createStateInput, checkValidity, checkFormValidation } from '../../../../shared/utility';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../../../store/actions/indexActions';
import Form from '../../../../components/UI/Form/Form';

const AddComment = (props) => {
  const [controls, setControls] = useState({
    content: createStateInput('textarea', 'Add comment', '',
      { id: 'content', autoComplete: 'off', placeholder: 'What do you think about this post...' },
      { minLength: 1, maxLength: 400 },
    ),
  });

  const canWriteComment = useSelector((state) => state.post.canWriteComment);

  const dispatch = useDispatch();
  const onAddComment = (content, postID, postAuthorUID, canWriteComment, inputCleared) => (
    dispatch(actions.addComment(content, postID, postAuthorUID, canWriteComment, inputCleared))
  );
  const onDeleteError = useCallback(() => dispatch(actions.deleteError()), [dispatch]);

  useEffect(() => {
    onDeleteError();
  }, [onDeleteError]);

  const inputChangedHandler = (inputId, e) => {
    e.persist();
    setControls((prevState) => ({
      ...prevState,
      [inputId]: updateObject(prevState[inputId], {
        value: e.target.value,
        valid: checkValidity(e.target.value, prevState[inputId].validation),
        touched: e.target.value.length > 0 ? true : false,
      }),
    }));
  };

  const inputClearedHandler = () => {
    setControls((prevState) => ({
      ...prevState,
      content: updateObject(controls.content, {
        value: '',
        valid: false,
        touched: false,
      }),
    }));
  };

  const formSubmittedHandler = (e) => {
    e.preventDefault();
    const content = controls.content.value.trim();
    onAddComment(content, props.postID, props.postAuthorUID, canWriteComment, inputClearedHandler);
  };

  const inputs = createInputElements(controls, inputChangedHandler);

  return (
    <Form
      btnText="Add"
      isValid={checkFormValidation(controls)}
      submitted={formSubmittedHandler}
      isPostForm
    >
      {inputs}
    </Form>
  );
};

export default AddComment;