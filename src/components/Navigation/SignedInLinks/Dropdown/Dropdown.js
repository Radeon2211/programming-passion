import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import onClickOutside from 'react-onclickoutside';
import classes from './Dropdown.module.scss';
import sprite from '../../../../images/sprite.svg';

class Dropdown extends Component {
  handleClickOutside = (e) => {
    const { visible, closed } = this.props;
    if (visible && !e.target.closest('#user')) closed();
  };

  render() {
    const { visible } = this.props;

    const dropdownClasses = [classes.Dropdown];
    if (visible) dropdownClasses.push(classes.Visible);

    return (
      <div
        className={dropdownClasses.join(' ')}
        onKeyDown={this.handleClickOutside}
        role="button"
        tabIndex="0"
      >
        <ul className={classes.List}>
          <li className={classes.Item}>
            <Link to="/settings" className={classes.Link}>
              Settings
              <svg className={classes.Icon}>
                <use href={`${sprite}#icon-cog`} />
              </svg>
            </Link>
          </li>
          <li className={classes.Item}>
            <Link to="/signout" className={classes.Link}>
              Sign out
              <svg className={classes.Icon}>
                <use href={`${sprite}#icon-switch`} />
              </svg>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default onClickOutside(Dropdown);
