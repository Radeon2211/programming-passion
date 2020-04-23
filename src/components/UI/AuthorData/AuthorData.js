import React from 'react';
import noUser from '../../../images/no-user.jpg';
import classes from './AuthorData.module.scss';
import moment from 'moment';

const AuthorData = ({ firstName, lastName, photoURL, createdAt }) => (
  <div className={classes.AuthorData}>
    <img src={photoURL || noUser} alt="Author" className={classes.Photo} />
    <div className={classes.Right}>
      <span className={classes.Name}>{firstName} {lastName}</span>
      <span className={classes.Date}>{moment(createdAt.toDate()).format('lll')}</span>
    </div>
  </div>
);

export default AuthorData;