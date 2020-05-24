import React from 'react';
import * as SC from './Footer.sc';
import sprite from '../../images/sprite.svg';

const Footer = () => (
  <SC.Wrapper>
    <span className="copyright">© 2020 Radosław Mikrut. All rights reserved</span>
    <div className="socials">
      <a
        href="https://www.linkedin.com/in/rados%C5%82aw-mikrut-a8600b198/"
        target="_blank"
        rel="noopener noreferrer"
        className="social-link"
      >
        <svg className="social-icon">
          <use href={`${sprite}#icon-linkedin`} />
        </svg>
      </a>
      <a href="mailto:radoslawmikrut@wp.pl" className="social-link">
        <svg className="social-icon">
          <use href={`${sprite}#icon-envelop`} />
        </svg>
        <span>radoslawmikrut@wp.pl</span>
      </a>
    </div>
  </SC.Wrapper>
);

export default Footer;
