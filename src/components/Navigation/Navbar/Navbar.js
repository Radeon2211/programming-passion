import React from 'react';
import { Link } from 'react-router-dom';
import * as SC from './Navbar.sc';
import logo from '../../../images/logo.jpg';
import SignedInLinks from '../SignedInLinks/SignedInLinks';
import SignedOutLinks from '../SignedOutLinks/SignedOutLinks';
import Heading from '../../UI/Heading/Heading';

const Navbar = (props) => {
  const { isAuth } = props;

  const nav = isAuth ? <SignedInLinks /> : <SignedOutLinks />;

  return (
    <SC.Wrapper>
      <Link to="/" className="heading-link">
        <header className="heading-text">
          <Heading variant="H2">Programming Passion</Heading>
        </header>
        <img src={logo} alt="Programming Passion" className="logo" />
      </Link>
      {nav}
    </SC.Wrapper>
  );
};

export default Navbar;
