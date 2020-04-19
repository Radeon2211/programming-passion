import React from 'react';
import classes from './Button.module.scss';

const Button = (props) => {
  const btnClasses = [classes.Button, classes[props.size], classes[props.fill]];

  return (
    <button className={btnClasses.join(' ')}>
      {props.children}
    </button>
  );
}

export default Button;