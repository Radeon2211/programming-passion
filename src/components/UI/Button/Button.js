import React from 'react';
import classes from './Button.module.scss';

const Button = (props) => {
  const { size, fill, color, type, disabled, clicked, children } = props;

  const btnClasses = [classes.Button, classes[size], classes[fill], classes[color]];
  if (disabled) btnClasses.push(classes.Disabled);

  return (
    // eslint-disable-next-line
    <button className={btnClasses.join(' ')} type={type} disabled={disabled} onClick={clicked}>
      {children}
    </button>
  );
};

export default Button;
