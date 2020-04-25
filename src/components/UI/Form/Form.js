import React from 'react';
import classes from './Form.module.scss';
import { connect } from 'react-redux';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';

const Form = ({ headingText, btnText, isValid, submitted, isPostForm, children, authLoading, postLoading, authError, postError }) => {
  const loading = isPostForm ? postLoading : authLoading;
  const loader = loading ? <Loader size="Small" /> : null;
  const error = isPostForm ? postError : authError;
  let heading = null;
  if (headingText) {
    heading = <h3 className={classes.Heading}>{headingText}</h3>
  }
  let errorNode = null;
  if (error) {
    errorNode = <span className={classes.Error}>{error}</span>;
  }

  return (
    <div className={classes.Container}>
      {heading}
      <form className={classes.Form} onSubmit={submitted}>
        {children}
        <div className={classes.BtnAndLoader}>
          <Button
            size="Small"
            fill="Filled"
            type="submit"
            disabled={!isValid || loading}
          >
            {btnText}
          </Button>
          {loader}
        </div>
      </form>
      {errorNode}
    </div>
  );
}

const mapStateToProps = (state) => ({
  authLoading: state.auth.loading,
  postLoading: state.post.loading,
  authError: state.auth.error,
  postError: state.post.error,
});

export default connect(mapStateToProps)(Form);