import React from 'react';
import classes from './Line.module.scss';

const Line = ({ type, size }) => {
  const lineClasses = [classes.Line, classes[type], classes[size]];

  return <div className={lineClasses.join(' ')} />;
};

export default Line;
