import React from 'react';
import classes from './SignedInLinks.module.scss';
import { Link } from 'react-router-dom';
import Button from '../../UI/Button/Button';

const SignedInLinks = () => (
  <nav className={classes.SignedInLinks}>
    <Link to="/create">
      <Button
        size="Small"
        fill="Filled"
      >
        Create post
      </Button>
    </Link>
    <Link to="/signout">
      <Button
        size="Small"
        fill="Filled"
      >
        Sign out
      </Button>
    </Link>
  </nav>
);

export default SignedInLinks;