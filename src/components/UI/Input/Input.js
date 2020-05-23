import React from 'react';
import { Field } from 'formik';
import classes from './Input.module.scss';

const Input = (props) => {
  const { kind, config, label, isValid, isTouched } = props;

  let input = null;
  let validClass = null;
  if (isValid !== undefined && isTouched) {
    validClass = isValid ? classes.Valid : classes.Invalid;
  }
  const inputWrapperClasses = [classes.InputWrapper, validClass];
  const textareaClasses = [classes.Input, classes.Textarea];

  const autoSize = (e) => {
    e.persist();
    setTimeout(() => {
      e.target.style.cssText = 'height: auto; padding: 0;';
      e.target.style.cssText = `height: ${e.target.scrollHeight}px; padding: .9rem 1rem;`;
    }, 0);
  };

  switch (kind) {
    case 'input':
      input = (
        <Field name={config.name}>
          {({ field }) => <input className={classes.Input} {...config} {...field} />}
        </Field>
      );
      break;
    case 'textarea':
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
          {({ field }) => <input className={classes.Input} {...config} {...field} />}
        </Field>
      );
  }

  return (
    <div className={inputWrapperClasses.join(' ')}>
      <label htmlFor={config.id} className={classes.Label}>
        {label}
      </label>
      {input}
    </div>
  );
};

export default Input;
