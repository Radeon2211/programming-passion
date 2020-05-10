import React, { useState, useEffect, useCallback } from 'react';
import Form from '../../components/UI/Form/Form';
import { updateObject, createInputElements, createStateInput, checkValidity, checkFormValidation } from '../../shared/utility';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions/indexActions';

const ChangePassword = (props) => {
  const [controls, setControls] = useState({
    email: createStateInput('input', 'Email', '',
      { type: 'email', id: 'email', autoComplete: 'email', placeholder: 'Your email...' },
      null,
      true,
    ),
    oldPassword: createStateInput('input', 'Old password', '',
      { type: 'password', id: 'oldPassword', autoComplete: 'current-password', placeholder: 'Your old password...' },
      null,
      true,
    ),
    newPassword: createStateInput('input', 'New password', '',
      { type: 'password', id: 'newPassword', autoComplete: 'new-password', placeholder: 'Type safe password...' },
      { minLength: 6 },
    ),
  });

  const dispatch = useDispatch();
  const onDeleteError = useCallback(() => dispatch(actions.deleteError()), [dispatch]);
  const onChangePassword = (data, history) => dispatch(actions.changePassword(data, history));

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
    onChangePassword(data, props.history);
  };

  const inputs = createInputElements(controls, inputChangedHandler);

  return (
    <Form
      headingText="Change Password"
      btnText="Change"
      isValid={checkFormValidation(controls)}
      submitted={formSubmittedHandler}
    >
      {inputs}
    </Form>
  );
};

export default ChangePassword;