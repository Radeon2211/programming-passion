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

  return steps.every((step) => step);
};

export const checkFormValidation = (state) => (
  Object.values(state).every(({ valid }) => valid)
);

export const createCustomError = (error) => {
  switch (error.code) {
    case ('auth/wrong-password'): return 'You entered wrong password';
    case ('auth/invalid-photo-url'): return 'You entered invalid photo URL';
    default: return error.message;
  }
}

const fileTypes = [
  "image/apng",
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/svg+xml",
  "image/tiff",
  "image/webp",
  "image/x-icon"
];

export const isValidFileType = (type) => (
  fileTypes.includes(type)
);

export const calculateFileSize = (size) => {
  if (size < 1024) {
    return `${size} bytes`;
  } else if (size >= 1024 && size < 1048576) {
    return `${(size / 1024).toFixed(1)}KB`;
  } else if (size >= 1048576) {
    return `${(size / 1048576).toFixed(1)}MB`;
  }
};

export const isValidFileSize = (size) => (
  size <= 1048576
);