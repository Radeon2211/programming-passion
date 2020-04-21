import React from 'react';
import classes from './Loader.module.scss';

const Loader = ({ size }) => {
  const loaderClasses = [classes.Loader, classes[size]];

  return (
    <div className={loaderClasses.join(' ')}></div>
  );
};

export default Loader;