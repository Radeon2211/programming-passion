import React from 'react';
import classes from './Main.module.scss';

const Main = (props) => (
  <main className={classes.Main}>
    {props.children}
  </main>
);

export default Main;