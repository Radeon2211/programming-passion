import React from 'react';
import { useSelector } from 'react-redux';
import { Form as FormikForm } from 'formik';
import * as SC from './Form.sc';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import Heading from '../Heading/Heading';

const Form = (props) => {
  const { headingText, btnText, isValid, isPostForm, cancelled, children, submitted } = props;

  const { loading: postLoading, error: postError } = useSelector((state) => state.post);
  const { loading: authLoading, error: authError } = useSelector((state) => state.auth);

  const loading = isPostForm ? postLoading : authLoading;
  const loader = loading ? <Loader size="small" /> : null;
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
    errorNode = <span className="error">{error}</span>;
  }

  let cancelButton = null;
  if (cancelled) {
    cancelButton = (
      <div className="cancel-button-box">
        <Button size="small" fill="empty" color="green" type="button" clicked={cancelled}>
          Cancel
        </Button>
      </div>
    );
  }

  let form = null;
  if (submitted) {
    form = (
      <form onSubmit={submitted}>
        {children}
        <div className="btn-and-loader">
          <Button
            size="small"
            fill="filled"
            color="green"
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
      <FormikForm>
        {children}
        <div className="btn-and-loader">
          <Button
            size="small"
            fill="filled"
            color="green"
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
    <SC.Wrapper>
      {heading}
      {form}
      {errorNode}
    </SC.Wrapper>
  );
};

export default Form;
