import React, { useState, useEffect, useCallback } from 'react';
import Form from '../../components/UI/Form/Form';
import { updateObject, createInputElements, createStateInput, checkValidity, checkFormValidation } from '../../shared/utility';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions/indexActions';

const ChangeName = (props) => {
  const [controls, setControls] = useState({
    newFirstName: createStateInput('input', 'New first name', '',
      { type: 'text', id: 'newFirstName', autoComplete: 'given-name', placeholder: 'Your new first name...' },
      { minLength: 1, maxLength: 50 },
    ),
    newLastName: createStateInput('input', 'New last name', '',
      { type: 'text', id: 'newLastName', autoComplete: 'family-name', placeholder: 'Your new last name...' },
      { minLength: 1, maxLength: 50 },
    ),
  });

  const dispatch = useDispatch();
  const onDeleteError = useCallback(() => dispatch(actions.deleteError()), [dispatch]);
  const onChangeName = (data, history) => dispatch(actions.changeName(data, history));

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
    onChangeName(data, props.history);
  };

  const inputs = createInputElements(controls, inputChangedHandler);

  return (
    <Form
      headingText="Change Name"
      btnText="Change"
      isValid={checkFormValidation(controls)}
      submitted={formSubmittedHandler}
    >
      {inputs}
    </Form>
  );
};

export default ChangeName;