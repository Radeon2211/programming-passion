import React, { Component } from 'react';
import classes from './Dropdown.module.scss';
import { Link } from 'react-router-dom';
import onClickOutside from 'react-onclickoutside';
import sprite from '../../../../images/sprite.svg';

class Dropdown extends Component {
  handleClickOutside = (e) => {
    if (this.props.visible && !e.target.closest('#user')) this.props.closed();
  };

  render () {
    const dropdownClasses = [classes.Dropdown];
    if (this.props.visible) dropdownClasses.push(classes.Visible);

    return (
      <div className={dropdownClasses.join(' ')} onClick={this.handleClickOutside}>
        <ul className={classes.List}>
          <li className={classes.Item}>
            <Link to="/settings" className={classes.Link}>
              Settings
              <svg className={classes.Icon}>
                <use href={`${sprite}#icon-cog`}></use>
              </svg>
            </Link>
          </li>
          <li className={classes.Item}>
            <Link to="/signout" className={classes.Link}>
              Sign out
              <svg className={classes.Icon}>
                <use href={`${sprite}#icon-switch`}></use>
              </svg>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default onClickOutside(Dropdown);