import React, { useState, useEffect, useCallback } from 'react';
import { updateObject, createInputElements, createStateInput, checkValidity, checkFormValidation } from '../../../../../shared/utility';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../../../../store/actions/indexActions';
import Form from '../../../../../components/UI/Form/Form';

const EditComment = (props) => {
  const [controls, setControls] = useState({
    content: createStateInput('textarea', 'Content', props.currentContent,
      { id: 'content', autoComplete: 'off', placeholder: 'What do you think about this post...' },
      { minLength: 1, maxLength: 400 },
    ),
  });

  const canEditComment = useSelector((state) => state.post.canWriteComment);

  const dispatch = useDispatch();
  const onEditComment = (content, commentID, canEditComment, closed) => dispatch(actions.editComment(content, commentID, canEditComment, closed));
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

  const formSubmittedHandler = (e) => {
    e.preventDefault();
    const content = controls.content.value.trim();
    if (content === props.currentContent) {
      props.cancelled();
      return;
    }
    onEditComment(content, props.commentID, canEditComment, props.cancelled);
  };

  const inputs = createInputElements(controls, inputChangedHandler);

  return (
    <Form
      btnText="Edit"
      isValid={checkFormValidation(controls)}
      submitted={formSubmittedHandler}
      isPostForm
      cancelled={props.cancelled}
    >
      {inputs}
    </Form>
  );
};

export default EditComment;