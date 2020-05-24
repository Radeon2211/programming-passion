import React from 'react';
import * as SC from './Loader.sc';

const Loader = (props) => {
  const { size } = props;

  return <SC.Loader size={size} />;
};

export default Loader;
