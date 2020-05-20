import React, { useEffect, useCallback } from 'react';
import Form from '../../components/UI/Form/Form';
import Input from '../../components/UI/Input/Input';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions/indexActions';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  email: Yup.string().email().trim().required(),
});

const AddAdmin = (props) => {
  const dispatch = useDispatch();
  const onDeleteError = useCallback(() => dispatch(actions.deleteError()), [dispatch]);
  const onAddAdmin = (email, history) => dispatch(actions.addAdmin(email, history));

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
        onAddAdmin(values.email, props.history);
      }}
    >
      {({ errors, touched, isValid, dirty, setFieldTouched }) => {
        return (
          <Form
            headingText="Add Admin"
            btnText="Add"
            isValid={isValid && dirty}
          >
            <Input
              kind="input"
              config={{ type: 'email', name: 'email', id: 'email', placeholder: `Future admin's email`, autoComplete: 'email', onInput: setFieldTouched.bind(this, 'email', true, true) }}
              label="Email"
              isValid={!!!errors.email}
              isTouched={touched.email}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddAdmin;