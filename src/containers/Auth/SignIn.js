import React, { useState, useEffect, useCallback } from 'react';
import Form from '../../components/UI/Form/Form';
import { updateObject, createInputElements, createStateInput, checkValidity, checkFormValidation } from '../../shared/utility';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions/indexActions';

const SignUp = (props) => {
  const [controls, setControls] = useState({
    email: createStateInput('input', 'Email', '',
      { type: 'email', id: 'email', autoComplete: 'email', placeholder: 'Your email...' },
      null,
      true,
    ),
    password: createStateInput('input', 'Password', '',
      { type: 'password', id: 'password', autoComplete: 'current-password', placeholder: 'Your password...' },
      null,
      true,
    ),
  });

  const autoRedirectPath = useSelector((state) => state.auth.autoRedirectPath);

  const dispatch = useDispatch();
  const onDeleteError = useCallback(() => dispatch(actions.deleteError()), [dispatch]);
  const onSignIn = (data, history, redirectPath) => dispatch(actions.signIn(data, history, redirectPath));

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
    onSignIn(data, props.history, autoRedirectPath);
  };

  const inputs = createInputElements(controls, inputChangedHandler);

  return (
    <Form
      headingText="Sign In"
      btnText="Login"
      isValid={checkFormValidation(controls)}
      submitted={formSubmittedHandler}
    >
      {inputs}
    </Form>
  );
};

export default SignUp;