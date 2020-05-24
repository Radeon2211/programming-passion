import React from 'react';
import { Field } from 'formik';
import * as SC from './Input.sc';

const Input = (props) => {
  const { kind, config, label, isValid, isTouched } = props;

  let input = null;
  let valid = null;
  if (isValid !== undefined && isTouched) {
    valid = isValid ? 'valid' : 'invalid';
  }

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
        <Field name={config.name}>{({ field }) => <SC.Input {...config} {...field} />}</Field>
      );
      break;
    case 'textarea':
      input = (
        <Field name={config.name}>
          {({ field }) => <SC.Textarea {...config} {...field} onKeyDown={autoSize} />}
        </Field>
      );
      break;
    default:
      input = (
        <Field name={config.name}>{({ field }) => <SC.Input {...config} {...field} />}</Field>
      );
  }

  return (
    <SC.Wrapper className={valid}>
      <SC.Label htmlFor={config.id}>{label}</SC.Label>
      {input}
    </SC.Wrapper>
  );
};

export default Input;
