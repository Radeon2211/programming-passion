import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Form from '../../components/UI/Form/Form';
import Input from '../../components/UI/Input/Input';
import * as actions from '../../store/actions/indexActions';

const validationSchema = Yup.object({
  newEmail: Yup.string().email().trim().required(),
});

const ChangeEmail = (props) => {
  const dispatch = useDispatch();
  const onDeleteError = useCallback(() => dispatch(actions.deleteError()), [dispatch]);
  const onChangeEmail = (data, history) => dispatch(actions.changeEmail(data, history));

  useEffect(() => {
    onDeleteError();
  }, [onDeleteError]);

  return (
    <Formik
      initialValues={{
        oldEmail: '',
        newEmail: '',
        password: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onChangeEmail(values, props.history);
      }}
    >
      {({ errors, touched, isValid, dirty, setFieldTouched }) => {
        return (
          <Form headingText="Change Email" btnText="Change" isValid={isValid && dirty}>
            <Input
              kind="input"
              config={{
                type: 'email',
                name: 'oldEmail',
                id: 'oldEmail',
                placeholder: 'Your old email...',
                autoComplete: 'email',
              }}
              label="Old email"
            />
            <Input
              kind="input"
              config={{
                type: 'email',
                name: 'newEmail',
                id: 'newEmail',
                placeholder: 'Your new email...',
                autoComplete: 'email',
                onInput: setFieldTouched.bind(this, 'newEmail', true, true),
              }}
              label="New email"
              isValid={!errors.newEmail}
              isTouched={touched.newEmail}
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

export default ChangeEmail;
