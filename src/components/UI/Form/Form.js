import React from 'react';
import { useSelector } from 'react-redux';
import { Form as FormikForm } from 'formik';
import classes from './Form.module.scss';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import Heading from '../Heading/Heading';

const Form = (props) => {
  const { headingText, btnText, isValid, isPostForm, cancelled, children, submitted } = props;

  const { loading: postLoading, error: postError } = useSelector((state) => state.post);
  const { loading: authLoading, error: authError } = useSelector((state) => state.auth);

  const loading = isPostForm ? postLoading : authLoading;
  const loader = loading ? <Loader size="Small" /> : null;
  const error = isPostForm ? postError : authError;

  let heading = null;
  if (headingText) {
    heading = (
      <Heading variant="H4" mgBottom="Mg-Bottom-Medium">
        {headingText}
      </Heading>
    );
  }

  let errorNode = null;
  if (error) {
    errorNode = <span className={classes.Error}>{error}</span>;
  }

  let cancelButton = null;
  if (cancelled) {
    cancelButton = (
      <div className={classes.CancelButtonBox}>
        <Button size="Small" fill="Empty" color="Green" type="button" clicked={cancelled}>
          Cancel
        </Button>
      </div>
    );
  }

  let form = null;
  if (submitted) {
    form = (
      <form className={classes.Form} onSubmit={submitted}>
        {children}
        <div className={classes.BtnAndLoader}>
          <Button
            size="Small"
            fill="Filled"
            color="Green"
            type="submit"
            disabled={!isValid || loading}
          >
            {btnText}
          </Button>
          {cancelButton}
          {loader}
        </div>
      </form>
    );
  } else {
    form = (
      <FormikForm className={classes.Form}>
        {children}
        <div className={classes.BtnAndLoader}>
          <Button
            size="Small"
            fill="Filled"
            color="Green"
            type="submit"
            disabled={!isValid || loading}
          >
            {btnText}
          </Button>
          {cancelButton}
          {loader}
        </div>
      </FormikForm>
    );
  }

  return (
    <div className={classes.Container}>
      {heading}
      {form}
      {errorNode}
    </div>
  );
};

export default Form;
