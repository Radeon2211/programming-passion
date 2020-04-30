import React from 'react';
import classes from './Form.module.scss';
import { connect } from 'react-redux';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import Heading from '../../UI/Heading/Heading';

const Form = (props) => {
  const { headingText, btnText, isValid, submitted, isPostForm, size, children, authLoading, postLoading, authError, postError } = props;
  const loading = isPostForm ? postLoading : authLoading;
  const loader = loading ? <Loader size="Small" /> : null;
  const error = isPostForm ? postError : authError;
  let heading = null;
  if (headingText) {
    heading = <Heading variant="H4" mgBottom="Mg-Bottom-Medium">{headingText}</Heading>
  }
  let errorNode = null;
  if (error) {
    errorNode = <span className={classes.Error}>{error}</span>;
  }
  const containerClasses = [classes.Container];
  if (size) containerClasses.push(classes[size])

  return (
    <div className={classes.Container}>
      {heading}
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