import React, { useState, } from 'react';
import classes from './SignedInLinks.module.scss';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../../UI/Button/Button';
import Dropdown from './Dropdown/Dropdown';
import noUser from '../../../images/no-user.jpg';

const SignedInLinks = () => {
  const [dropdownIsVisible, setDropdownIsVisible] = useState(false);

  const photoURL = useSelector((state) =>state.firebase.profile.photoURL);

  const toggleDropdownHandler = () => {
    setDropdownIsVisible((prevState) => !prevState);
  };

  const closeDropdownHandler = () => {
    if (dropdownIsVisible) {
      setDropdownIsVisible(false);
    }
  };

  const arrowClasses = [classes.Arrow];
  if (dropdownIsVisible) arrowClasses.push(classes.Rotated);

  return (
    <nav className={classes.SignedInLinks}>
      <Link to="/create-post">
        <Button size="Small" fill="Filled" color="Green">Create post</Button>
      </Link>
      <div className={classes.User} id="user" onClick={toggleDropdownHandler}>
        <img src={photoURL || noUser} alt="You" className={classes.UserPhoto} />
        <div className={arrowClasses.join(' ')}></div>
        <Dropdown
          visible={dropdownIsVisible}
          closed={closeDropdownHandler}
        />
      </div>
    </nav>
  );
};

export default SignedInLinks;