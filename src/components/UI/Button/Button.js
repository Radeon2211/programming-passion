import React from 'react';
import * as SC from './Button.sc';

const Button = (props) => {
  const { size, fill, color, type, disabled, clicked, children } = props;

  return (
    <SC.Button
      size={size}
      fill={fill}
      color={color}
      disabled={disabled}
      type={type}
      onClick={clicked}
    >
      {children}
    </SC.Button>
  );
};

export default Button;
