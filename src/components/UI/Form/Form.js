import React from 'react';
import classes from './Form.module.scss';
import Button from '../Button/Button';

const Form = ({ headingText, btnText, submitted, isValid, children }) => {
  return (
    <div className={classes.Container}>
      <h3 className={classes.Heading}>{headingText}</h3>
      <form className={classes.Form} onSubmit={submitted}>
        {children}
        <Button
          size="Small"
          fill="Filled"
          type="submit"
          disabled={!isValid}
        >
          {btnText}
        </Button>
      </form>
    </div>
  );
}

export default Form;