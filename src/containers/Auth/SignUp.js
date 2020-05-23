import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Form from '../../components/UI/Form/Form';
import Input from '../../components/UI/Input/Input';
import * as actions from '../../store/actions/indexActions';

const validationSchema = Yup.object({
  email: Yup.string().email().trim().required(),
  password: Yup.string().min(6).max(64).trim().required(),
  firstName: Yup.string().max(50).trim().required(),
  lastName: Yup.string().max(50).trim().required(),
});

const SignUp = (props) => {
  const autoRedirectPath = useSelector((state) => state.auth.autoRedirectPath);

  const dispatch = useDispatch();
  const onDeleteError = useCallback(() => dispatch(actions.deleteError()), [dispatch]);
  const onSignUp = (data, history, redirectPath) =>
    dispatch(actions.signUp(data, history, redirectPath));

  useEffect(() => {
    onDeleteError();
  }, [onDeleteError]);

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        firstName: '',
        lastName: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSignUp(values, props.history, autoRedirectPath);
      }}
    >
      {({ errors, touched, isValid, dirty, setFieldTouched }) => {
        return (
          <Form headingText="Sign Up" btnText="Join our community" isValid={isValid && dirty}>
            <Input
              kind="input"
              config={{
                type: 'email',
                name: 'email',
                id: 'email',
                placeholder: 'Your email...',
                autoComplete: 'email',
                onInput: setFieldTouched.bind(this, 'email', true, true),
              }}
              label="Email"
              isValid={!errors.email}
              isTouched={touched.email}
            />
            <Input
              kind="input"
              config={{
                type: 'password',
                name: 'password',
                id: 'password',
                placeholder: 'Type safe password...',
                autoComplete: 'new-password',
                onInput: setFieldTouched.bind(this, 'password', true, true),
              }}
              label="Password"
              isValid={!errors.password}
              isTouched={touched.password}
            />
            <Input
              kind="input"
              config={{
                type: 'text',
                name: 'firstName',
                id: 'firstName',
                placeholder: 'Your new first name...',
                autoComplete: 'given-name',
                onInput: setFieldTouched.bind(this, 'firstName', true, true),
              }}
              label="First name"
              isValid={!errors.firstName}
              isTouched={touched.firstName}
            />
            <Input
              kind="input"
              config={{
                type: 'text',
                name: 'lastName',
                id: 'lastName',
                placeholder: 'Your new last name...',
                autoComplete: 'family-name',
                onInput: setFieldTouched.bind(this, 'lastName', true, true),
              }}
              label="Last name"
              isValid={!errors.lastName}
              isTouched={touched.lastName}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default SignUp;
