import React from 'react';
import classes from './Navbar.module.scss';
import logo from '../../../images/logo.jpg';
import { Link } from 'react-router-dom';
import SignedInLinks from '../SignedInLinks/SignedInLinks';
import SignedOutLinks from '../SignedOutLinks/SignedOutLinks';
import Heading from '../../../components/UI/Heading/Heading';

const Navbar = ({ isAuth }) => {
  const nav = isAuth ? <SignedInLinks /> : <SignedOutLinks />;

  return (
    <div className={classes.Navbar}>
      <Link to="/" className={classes.HeadingLink}>
        <header className={classes.HeadingText}>
          <Heading variant="H2">Programming Passion</Heading>
        </header>
        <img src={logo} alt="Programming Passion" className={classes.Logo} />
      </Link>
      {nav}
    </div>
  );
};

export default Navbar;