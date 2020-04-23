import React from 'react';
import classes from './Input.module.scss';

const Input = ({ kind, label, value, config, validation, valid, touched, changed }) => {
  let input = null;
  let validClass = null;
  if (touched && validation) {
    validClass = valid ? classes.Valid : classes.Invalid;
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
        <input
          className={classes.Input}
          {...config}
          value={value}
          onChange={changed}
        />
      );
      break;
    case ('textarea'):
      const textareaClasses = [classes.Input, classes.Textarea];
      input = (
        <textarea
          className={textareaClasses.join(' ')}
          {...config}
          value={value}
          onChange={changed}
          onKeyDown={autoSize}
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