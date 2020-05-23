import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import Form from '../../components/UI/Form/Form';
import Input from '../../components/UI/Input/Input';
import * as actions from '../../store/actions/indexActions';

const SignUp = (props) => {
  const autoRedirectPath = useSelector((state) => state.auth.autoRedirectPath);

  const dispatch = useDispatch();
  const onDeleteError = useCallback(() => dispatch(actions.deleteError()), [dispatch]);
  const onSignIn = (data, history, redirectPath) =>
    dispatch(actions.signIn(data, history, redirectPath));

  useEffect(() => {
    onDeleteError();
  }, [onDeleteError]);

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={(values) => {
        onSignIn(values, props.history, autoRedirectPath);
      }}
    >
      {({ isValid, dirty }) => {
        return (
          <Form headingText="Sign In" btnText="Login" isValid={isValid && dirty}>
            <Input
              kind="input"
              config={{
                type: 'email',
                name: 'email',
                id: 'email',
                placeholder: 'Your email...',
                autoComplete: 'email',
              }}
              label="Email"
            />
            <Input
              kind="input"
              config={{
                type: 'password',
                name: 'password',
                id: 'password',
                placeholder: 'Your password...',
                autoComplete: 'current-password',
              }}
              label="Password"
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default SignUp;
