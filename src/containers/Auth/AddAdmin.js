import React, { useState, useEffect, useCallback } from 'react';
import Form from '../../components/UI/Form/Form';
import { updateObject, createInputElements, createStateInput, checkValidity, checkFormValidation } from '../../shared/utility';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions/indexActions';

const AddAdmin = () => {
  const [controls, setControls] = useState({
    email: createStateInput('input', 'Email', '',
      { type: 'email', id: 'email', autoComplete: 'email', placeholder: `Future admin's email` },
      { isEmail: true },
    ),
  });

  const dispatch = useDispatch();
  const onDeleteError = useCallback(() => dispatch(actions.deleteError()), [dispatch]);
  const onAddAdmin = (email) => dispatch(actions.addAdmin(email));

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
    const email = controls.email.value.trim();
    onAddAdmin(email);
  };

  const inputs = createInputElements(controls, inputChangedHandler);

  return (
    <Form
      headingText="Add Admin"
      btnText="Add"
      isValid={checkFormValidation(controls)}
      submitted={formSubmittedHandler}
    >
      {inputs}
    </Form>
  );
};

export default AddAdmin;