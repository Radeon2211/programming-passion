import React from 'react';
import * as SC from './Heading.sc';

const Heading = (props) => {
  const { variant, thickness, color, align, mgTop, mgBottom, children } = props;

  return (
    <SC.Heading
      variant={variant}
      thickness={thickness}
      color={color}
      align={align}
      mgTop={mgTop}
      mgBottom={mgBottom}
    >
      {children}
    </SC.Heading>
  );
};

export default Heading;
