import React, { useEffect, useCallback } from 'react';
import Form from '../../components/UI/Form/Form';
import Input from '../../components/UI/Input/Input';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions/indexActions';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  firstName: Yup.string().max(50).trim().required(),
  lastName: Yup.string().max(50).trim().required(),
});

const ChangeName = (props) => {
  const dispatch = useDispatch();
  const onDeleteError = useCallback(() => dispatch(actions.deleteError()), [dispatch]);
  const onChangeName = (data, history) => dispatch(actions.changeName(data, history));

  useEffect(() => {
    onDeleteError();
  }, [onDeleteError]);

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onChangeName(values, props.history);
      }}
    >
      {({ errors, touched, isValid, dirty, setFieldTouched }) => {
        return (
          <Form
            headingText="Change Name"
            btnText="Change"
            isValid={isValid && dirty}
          >
            <Input
              kind="input"
              config={{ type: 'text', name: 'firstName', id: 'firstName', placeholder: 'Your new first name...', autoComplete: 'given-name', onInput: setFieldTouched.bind(this, 'firstName', true, true)  }}
              label="First name"
              isValid={!!!errors.firstName}
              isTouched={touched.firstName}
            />
            <Input
              kind="input"
              config={{ type: 'text', name: 'lastName', id: 'lastName', placeholder: 'Your new last name...', autoComplete: 'family-name',  onInput: setFieldTouched.bind(this, 'lastName', true, true)  }}
              label="Last name"
              isValid={!!!errors.lastName}
              isTouched={touched.lastName}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default ChangeName;