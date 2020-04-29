import React from 'react';
import classes from './SignedOutLinks.module.scss';
import { Link } from 'react-router-dom';
import * as actions from '../../../store/actions/indexActions';
import { connect } from 'react-redux';
import Button from '../../UI/Button/Button';

const SignedOutLinks = ({ onSetAutoRedirectPath }) => (
  <nav className={classes.SignedOutLinks}>
    <Link to="/signin" onClick={onSetAutoRedirectPath.bind(this, `/`)}>
      <Button size="Small" fill="Empty" color="Green">Login</Button>
    </Link>
    <Link to="/signup" onClick={onSetAutoRedirectPath.bind(this, `/`)}>
      <Button size="Small" fill="Filled" color="Green">Sign up</Button>
    </Link>
  </nav>
);

const mapDispatchToProps = (dispatch) => ({
  onSetAutoRedirectPath: (path) => dispatch(actions.setAutoRedirectPath(path)),
});

export default connect(null, mapDispatchToProps)(SignedOutLinks);