import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import Form from '../../components/UI/Form/Form';
import Input from '../../components/UI/Input/Input';
import * as actions from '../../store/actions/indexActions';

const DeleteAccount = (props) => {
  const dispatch = useDispatch();
  const onDeleteError = useCallback(() => dispatch(actions.deleteError()), [dispatch]);
  const onDeleteAccount = (data, history) => dispatch(actions.deleteAccount(data, history));

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
        onDeleteAccount(values, props.history);
      }}
    >
      {({ isValid, dirty }) => {
        return (
          <Form headingText="Delete Account" btnText="Delete" isValid={isValid && dirty}>
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

export default DeleteAccount;
