import React from 'react';
import classes from './Navbar.module.scss';
import logo from '../../../images/logo.png';
import { Link } from 'react-router-dom';
import SignedInLinks from '../SignedInLinks/SignedInLinks';
import SignedOutLinks from '../SignedOutLinks/SignedOutLinks';

const Navbar = () => (
  <div className={classes.Navbar}>
    <Link to="/" className={classes.HeadingLink}>
      <h2 className={classes.Heading}>Programming Passion</h2>
      <img src={logo} alt="Programming Passion" className={classes.Logo} />
    </Link>
    <nav>
      <ul className={classes.NavList}>
        <SignedOutLinks />
      </ul>
    </nav>
  </div>
);

export default Navbar;