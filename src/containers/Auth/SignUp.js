import React, { useState, useEffect, useCallback } from 'react';
import Form from '../../components/UI/Form/Form';
import { updateObject, createInputElements, createStateInput, checkValidity, checkFormValidation } from '../../shared/utility';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions/indexActions';

const SignUp = (props) => {
  const [controls, setControls] = useState({
    email: createStateInput('input', 'Email', '',
      { type: 'email', id: 'email', autoComplete: 'email', placeholder: 'Your email...' },
      { isEmail: true },
    ),
    password: createStateInput('input', 'Password', '',
      { type: 'password', id: 'password', autoComplete: 'new-password', placeholder: 'Type safe password...' },
      { minLength: 6 },
    ),
    firstName: createStateInput('input', 'First name', '',
      { type: 'text', id: 'firstName', autoComplete: 'given-name', placeholder: 'Your first name...' },
      { minLength: 1, maxLength: 50 },
    ),
    lastName: createStateInput('input', 'Last name', '',
      { type: 'text', id: 'lastName', autoComplete: 'family-name', placeholder: 'Your last name...' },
      { minLength: 1, maxLength: 50 },
    )
  });

  const autoRedirectPath = useSelector((state) => state.auth.autoRedirectPath);

  const dispatch = useDispatch();
  const onDeleteError = useCallback(() => dispatch(actions.deleteError()), [dispatch]);
  const onSignUp = (data, history, redirectPath) => dispatch(actions.signUp(data, history, redirectPath));

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
    if (!checkFormValidation(controls)) return;
    const data = {};
    for (const key in controls) {
      data[key] = controls[key].value.trim();
    }
    onSignUp(data, props.history, autoRedirectPath);
  };

  const inputs = createInputElements(controls, inputChangedHandler);

  return (
    <Form
      headingText="Sign Up"
      btnText="Join our community"
      isValid={checkFormValidation(controls)}
      submitted={formSubmittedHandler}
    >
      {inputs}
    </Form>
  );
};

export default SignUp;