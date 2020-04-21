import React from 'react';
import classes from './Form.module.scss';
import { connect } from 'react-redux';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';

const Form = ({ headingText, btnText, submitted, isValid, children, loading, error }) => {
  const loader = loading ? <Loader size="Small" /> : null;

  return (
    <div className={classes.Container}>
      <h3 className={classes.Heading}>{headingText}</h3>
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
      <span className={classes.Error}>{error}</span>
    </div>
  );
}

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
});

export default connect(mapStateToProps)(Form);