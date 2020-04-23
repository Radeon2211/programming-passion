import React from 'react';
import Input from '../components/UI/Input/Input';

export const updateObject = (oldObject, updatedProps) => ({
  ...oldObject,
  ...updatedProps,
});

export const createInputElements = (state, changeHandler) => (
  Object.values(state).map(({ kind, label, value, config, validation, valid, touched }) => (
    <Input
      key={config.id}
      kind={kind}
      label={label}
      value={value}
      config={config}
      validation={validation}
      valid={valid}
      touched={touched}
      changed={(e) => changeHandler(config.id, e)}
    />
  ))
);

export const createStateInput = (kind, label, value, config, validation, valid = false, touched = false) => ({
  kind,
  label,
  value,
  config,
  validation,
  valid,
  touched,
});

export const checkValidity = (value, rules) => {
  if (!rules) return true;
  const val = value.trim();
  const steps = [];

  if (rules.minLength) steps.push(val.length >= rules.minLength);
  if (rules.maxLength) steps.push(val.length <= rules.maxLength);
  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    steps.push(pattern.test(value));
  }
  if (rules.isPhoto) {
    const pattern = /\.(jpeg|jpg|gif|png)$/i;
    steps.push(pattern.test(value));
  }

  return steps.every((step) => step);
};

export const checkFormValidation = (state) => (
  Object.values(state).every(({ valid }) => valid)
);