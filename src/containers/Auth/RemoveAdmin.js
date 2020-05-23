import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Form from '../../components/UI/Form/Form';
import Input from '../../components/UI/Input/Input';
import * as actions from '../../store/actions/indexActions';

const validationSchema = Yup.object({
  email: Yup.string().email().trim().required(),
});

const RemoveAdmin = (props) => {
  const dispatch = useDispatch();
  const onDeleteError = useCallback(() => dispatch(actions.deleteError()), [dispatch]);
  const onRemoveAdmin = (email, history) => dispatch(actions.removeAdmin(email, history));

  useEffect(() => {
    onDeleteError();
  }, [onDeleteError]);

  return (
    <Formik
      initialValues={{
        email: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onRemoveAdmin(values.email, props.history);
      }}
    >
      {({ errors, touched, isValid, dirty, setFieldTouched }) => {
        return (
          <Form headingText="Remove Admin" btnText="Remove" isValid={isValid && dirty}>
            <Input
              kind="input"
              config={{
                type: 'email',
                name: 'email',
                id: 'email',
                placeholder: `Email of admin to remove`,
                autoComplete: 'email',
                onInput: setFieldTouched.bind(this, 'email', true, true),
              }}
              label="Email"
              isValid={!errors.email}
              isTouched={touched.email}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default RemoveAdmin;
