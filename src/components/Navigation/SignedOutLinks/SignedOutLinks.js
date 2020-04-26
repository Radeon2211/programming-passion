import React from 'react';
import classes from './SignedOutLinks.module.scss';
import { Link } from 'react-router-dom';
import Button from '../../UI/Button/Button';

const SignedOutLinks = () => (
  <nav className={classes.SignedOutLinks}>
    <Link to="/signin">
      <Button size="Small" fill="Empty" color="Green">Login</Button>
    </Link>
    <Link to="/signup">
      <Button size="Small" fill="Filled" color="Green">Sign up</Button>
    </Link>
  </nav>
);

export default SignedOutLinks;