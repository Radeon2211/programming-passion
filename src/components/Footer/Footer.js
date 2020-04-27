import React from 'react';
import classes from './Footer.module.scss';
import sprite from '../../images/sprite.svg';

const Footer = () => (
  <div className={classes.Footer}>
    <span className={classes.Copyright}>© 2020 Radosław Mikrut. All rights reserved</span>
    <div className={classes.Socials}>
      <a href="https://www.linkedin.com/in/rados%C5%82aw-mikrut-a8600b198/" rel="noreferrer" className={classes.SocialLink}>
        <svg className={classes.SocialIcon}>
          <use href={`${sprite}#icon-linkedin`}></use>
        </svg>
      </a>
      <a href="mailto:radoslawmikrut@wp.pl" className={classes.SocialLink}>
        <svg className={classes.SocialIcon}>
          <use href={`${sprite}#icon-envelop`}></use>
        </svg>
        <span>radoslawmikrut@wp.pl</span>
      </a>
    </div>
  </div>
);

export default Footer;