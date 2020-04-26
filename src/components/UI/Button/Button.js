import React from 'react';
import classes from './Button.module.scss';

const Button = ({ size, fill, color, type, disabled, clicked, children }) => {
  const btnClasses = [classes.Button, classes[size], classes[fill], classes[color]];
  if (disabled) btnClasses.push(classes.Disabled);

  return (
    <button
      className={btnClasses.join(' ')}
      type={type}
      disabled={disabled}
      onClick={clicked}
    >
      {children}
    </button>
  );
}

export default Button;