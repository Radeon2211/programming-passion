import React from 'react';
import classes from './Input.module.scss';

const Input = ({ kind, label, value, config, valid, touched, changed }) => {
  let input = null;
  let validClass = null;
  if (touched) {
    validClass = valid ? classes.Valid : classes.Invalid;
  }
  const inputWrapperClasses = [classes.InputWrapper, validClass];

  switch (kind) {
    case ('input'):
      input = (
        <input
          className={classes.Input}
          {...config}
          value={value}
          onChange={changed}
        />
      );
      break;
    case ('textarea'):
      input = (
        <textarea
          className={classes.Input}
          {...config}
          value={value}
          onChange={changed}
        />
      );
      break;
    default:
      input = (
        <input
          className={classes.Input}
          {...config}
          value={value}
          onChange={changed}
        />
      );
  }

  return (
    <div className={inputWrapperClasses.join(' ')}>
      <label htmlFor={config.id} className={classes.Label}>{label}</label>
      {input}
    </div>
  );
}

export default Input;