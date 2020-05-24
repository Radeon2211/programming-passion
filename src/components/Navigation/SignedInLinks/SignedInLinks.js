import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as SC from './SignedInLinks.sc';
import Button from '../../UI/Button/Button';
import Dropdown from './Dropdown/Dropdown';
import noUser from '../../../images/no-user.jpg';

const SignedInLinks = () => {
  const [dropdownIsVisible, setDropdownIsVisible] = useState(false);

  const photoURL = useSelector((state) => state.firebase.profile.photoURL);

  const toggleDropdownHandler = () => {
    setDropdownIsVisible((prevState) => !prevState);
  };

  const closeDropdownHandler = () => {
    if (dropdownIsVisible) {
      setDropdownIsVisible(false);
    }
  };

  return (
    <SC.Wrapper>
      <Link to="/create-post">
        <Button size="small" fill="filled" color="green">
          Create post
        </Button>
      </Link>
      <SC.User id="user" onClick={toggleDropdownHandler}>
        <img src={photoURL || noUser} alt="You" className="photo" />
        <SC.Arrow rotated={dropdownIsVisible} />
        <Dropdown visible={dropdownIsVisible} closed={closeDropdownHandler} />
      </SC.User>
    </SC.Wrapper>
  );
};

export default SignedInLinks;
