import React from 'react';
import classes from './Button.module.scss';

const Button = ({ size, fill, type, disabled, children }) => {
  const btnClasses = [classes.Button, classes[size], classes[fill]];
  if (disabled) btnClasses.push(classes.Disabled);

  return (
    <button
      className={btnClasses.join(' ')}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;