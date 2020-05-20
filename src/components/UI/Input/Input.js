import React from 'react';
import classes from './Input.module.scss';
import { Field } from 'formik';

const Input = ({ kind, config, label, isValid, isTouched }) => {
  let input = null;
  let validClass = null;
  if (isValid !== undefined && isTouched) {
    validClass = isValid ? classes.Valid : classes.Invalid;
  }
  const inputWrapperClasses = [classes.InputWrapper, validClass];

  const autoSize = (e) => {
    e.persist();
    setTimeout(() => {
      e.target.style.cssText = 'height: auto; padding: 0;';
      e.target.style.cssText = `height: ${e.target.scrollHeight}px; padding: .9rem 1rem;`;
    }, 0);
  };

  switch (kind) {
    case ('input'):
      input = (
        <Field name={config.name}>
          {({ field }) => (
            <input className={classes.Input} {...config} {...field} />
          )}
        </Field>
      );
      break;
    case ('textarea'):
      const textareaClasses = [classes.Input, classes.Textarea];
      input = (
        <Field name={config.name}>
          {({ field }) => (
            <textarea
              className={textareaClasses.join(' ')}
              {...config}
              {...field}
              onKeyDown={autoSize}
            />
          )}
        </Field>
      );
      break;
    default:
      input = (
        <Field name={config.name}>
          {({ field }) => (
            <input className={classes.Input} {...config} {...field} />
          )}
        </Field>
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