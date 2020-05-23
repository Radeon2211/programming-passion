import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Form from '../../components/UI/Form/Form';
import Input from '../../components/UI/Input/Input';
import * as actions from '../../store/actions/indexActions';

const validationSchema = Yup.object({
  newPassword: Yup.string().min(6).max(64).trim().required(),
});

const ChangePassword = (props) => {
  const dispatch = useDispatch();
  const onDeleteError = useCallback(() => dispatch(actions.deleteError()), [dispatch]);
  const onChangePassword = (data, history) => dispatch(actions.changePassword(data, history));

  useEffect(() => {
    onDeleteError();
  }, [onDeleteError]);

  return (
    <Formik
      initialValues={{
        email: '',
        oldPassword: '',
        newPassword: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onChangePassword(values, props.history);
      }}
    >
      {({ errors, touched, isValid, dirty, setFieldTouched }) => {
        return (
          <Form headingText="Change Password" btnText="Change" isValid={isValid && dirty}>
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
                name: 'oldPassword',
                id: 'oldPassword',
                placeholder: 'Your current password...',
                autoComplete: 'current-password',
              }}
              label="Old password"
            />
            <Input
              kind="input"
              config={{
                type: 'password',
                name: 'newPassword',
                id: 'newPassword',
                placeholder: 'Type safe password...',
                autoComplete: 'new-password',
                onInput: setFieldTouched.bind(this, 'newPassword', true, true),
              }}
              label="New password"
              isValid={!errors.newPassword}
              isTouched={touched.newPassword}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default ChangePassword;
