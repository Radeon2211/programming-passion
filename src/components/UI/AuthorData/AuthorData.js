import React from 'react';
import noUser from '../../../images/no-user.jpg';
import classes from './AuthorData.module.scss';
import moment from 'moment';

const AuthorData = ({ size, firstName, lastName, photoURL, createdAt }) => {
  const authorDataClasses = [classes.AuthorData, classes[size]]

  return (
    <div className={authorDataClasses.join(' ')}>
      <img src={photoURL || noUser} alt="Author" className={classes.Photo} />
      <div className={classes.Right}>
        <span className={classes.Name}>{firstName} {lastName}</span>
        <span className={classes.Date}>{moment(createdAt.toDate()).format('lll')}</span>
      </div>
    </div>
  );
};

export default AuthorData;