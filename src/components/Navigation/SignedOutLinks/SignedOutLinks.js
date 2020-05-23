import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import classes from './SignedOutLinks.module.scss';
import * as actions from '../../../store/actions/indexActions';
import Button from '../../UI/Button/Button';

const SignedOutLinks = () => {
  const dispatch = useDispatch();
  const onSetAutoRedirectPath = (path) => dispatch(actions.setAutoRedirectPath(path));

  const linkClickedHandler = () => {
    onSetAutoRedirectPath(`/`);
  };

  return (
    <nav className={classes.SignedOutLinks}>
      <Link to="/signin" onClick={linkClickedHandler}>
        <Button size="Small" fill="Empty" color="Green">
          Login
        </Button>
      </Link>
      <Link to="/signup" onClick={linkClickedHandler}>
        <Button size="Small" fill="Filled" color="Green">
          Sign up
        </Button>
      </Link>
    </nav>
  );
};

export default SignedOutLinks;
