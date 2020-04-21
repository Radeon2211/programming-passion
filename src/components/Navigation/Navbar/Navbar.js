import React from 'react';
import classes from './Navbar.module.scss';
import logo from '../../../images/logo.jpg';
import { Link } from 'react-router-dom';
import SignedInLinks from '../SignedInLinks/SignedInLinks';
import SignedOutLinks from '../SignedOutLinks/SignedOutLinks';

const Navbar = ({ isAuth }) => {
  const nav = isAuth ? <SignedInLinks /> : <SignedOutLinks />;

  return (
    <div className={classes.Navbar}>
      <Link to="/" className={classes.HeadingLink}>
        <h2 className={classes.Heading}>Programming Passion</h2>
        <img src={logo} alt="Programming Passion" className={classes.Logo} />
      </Link>
      {nav}
    </div>
  );
};

export default Navbar;