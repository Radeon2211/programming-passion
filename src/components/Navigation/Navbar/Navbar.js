import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Navbar.module.scss';
import logo from '../../../images/logo.jpg';
import SignedInLinks from '../SignedInLinks/SignedInLinks';
import SignedOutLinks from '../SignedOutLinks/SignedOutLinks';
import Heading from '../../UI/Heading/Heading';

const Navbar = (props) => {
  const { isAuth } = props;

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
