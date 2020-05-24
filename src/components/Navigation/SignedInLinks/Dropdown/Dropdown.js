import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import onClickOutside from 'react-onclickoutside';
import * as SC from './Dropdown.sc';
import sprite from '../../../../images/sprite.svg';

class Dropdown extends Component {
  handleClickOutside = (e) => {
    const { visible, closed } = this.props;
    if (visible && !e.target.closest('#user')) closed();
  };

  render() {
    const { visible } = this.props;

    return (
      <SC.Wrapper visible={visible} onClick={this.handleClickOutside}>
        <ul className="list">
          <li className="item">
            <Link to="/settings" className="link">
              Settings
              <svg className="icon">
                <use href={`${sprite}#icon-cog`} />
              </svg>
            </Link>
          </li>
          <li className="item">
            <Link to="/signout" className="link">
              Sign out
              <svg className="icon">
                <use href={`${sprite}#icon-switch`} />
              </svg>
            </Link>
          </li>
        </ul>
      </SC.Wrapper>
    );
  }
}

export default onClickOutside(Dropdown);
