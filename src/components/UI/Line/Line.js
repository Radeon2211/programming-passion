import React from 'react';
import classes from './Line.module.scss';

const Line = ({ type }) => {
  const lineClasses = [classes.Line, classes[type]];

  return (
    <div className={lineClasses.join(' ')}></div>
  );
};

export default Line;