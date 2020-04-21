import React, { Component } from 'react';
import classes from './SignedInLinks.module.scss';
import { Link } from 'react-router-dom';
import Button from '../../UI/Button/Button';
import Dropdown from './Dropdown/Dropdown';
import noUser from '../../../images/no-user.jpg';

class SignedInLinks extends Component {
  state = {
    dropdownIsVisible: false,
  };

  toggleDropdownHandler = () => {
    this.setState({ dropdownIsVisible: !this.state.dropdownIsVisible });
  };

  closeDropdownHandler = () => {
    if (this.state.dropdownIsVisible) this.setState({ dropdownIsVisible: false });
  };

  render () {
    const arrowClasses = [classes.Arrow];
    if (this.state.dropdownIsVisible) arrowClasses.push(classes.Rotated);

    return (
      <nav className={classes.SignedInLinks}>
        <Link to="/create">
          <Button
            size="Small"
            fill="Filled"
          >
            Create post
          </Button>
        </Link>
        <div className={classes.User} id="user" onClick={this.toggleDropdownHandler}>
          <img src={noUser} alt="You" className={classes.UserPhoto} />
          <div className={arrowClasses.join(' ')}></div>
          <Dropdown
            visible={this.state.dropdownIsVisible}
            closed={this.closeDropdownHandler}
          />
        </div>
      </nav>
    );
  }
}

export default SignedInLinks;