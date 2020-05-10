import React, { useState, useEffect, useCallback } from 'react';
import Form from '../../components/UI/Form/Form';
import { updateObject, createInputElements, createStateInput, checkValidity, checkFormValidation } from '../../shared/utility';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions/indexActions';

const ChangeEmail = (props) => {
  const [controls, setControls] = useState({
    oldEmail: createStateInput('input', 'Old email', '',
      { type: 'email', id: 'oldEmail', autoComplete: 'email', placeholder: 'Your old email...' },
      null,
      true,
    ),
    newEmail: createStateInput('input', 'New email', '',
      { type: 'email', id: 'newEmail', autoComplete: 'email', placeholder: 'Your new email...' },
      { isEmail: true },
    ),
    password: createStateInput('input', 'Password', '',
      { type: 'password', id: 'password', autoComplete: 'current-password', placeholder: 'Your password...' },
      null,
      true,
    ),
  });

  const dispatch = useDispatch();
  const onDeleteError = useCallback(() => dispatch(actions.deleteError()), [dispatch]);
  const onChangeEmail = (data, history) => dispatch(actions.changeEmail(data, history));

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
    onChangeEmail(data, props.history);
  };

  const inputs = createInputElements(controls, inputChangedHandler);

  return (
    <Form
      headingText="Change Email"
      btnText="Change"
      isValid={checkFormValidation(controls)}
      submitted={formSubmittedHandler}
    >
      {inputs}
    </Form>
  );
};

export default ChangeEmail;