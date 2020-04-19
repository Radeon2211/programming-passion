import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../UI/Button/Button';

const SignedOutLinks = () => (
  <Fragment>
    <li>
      <Link to="/signin">
        <Button
          size="Small"
          fill="Empty"
        >
          Login
        </Button>
      </Link>
    </li>
    <li>
      <Link to="/signup">
        <Button
          size="Small"
          fill="Filled"
        >
          Sign up
        </Button>
      </Link>
    </li>
  </Fragment>
);

export default SignedOutLinks;