import React from 'react';
import moment from 'moment';
import noUser from '../../../images/no-user.jpg';
import * as SC from './AuthorData.sc';

const AuthorData = (props) => {
  const { size, firstName, lastName, photoURL, createdAt } = props;

  return (
    <SC.Wrapper size={size}>
      <img src={photoURL || noUser} alt="Author" className="photo" />
      <div className="right">
        <span className="name">
          {/* eslint-disable-next-line */}
          {firstName} {lastName}
        </span>
        <span className="date">{moment(createdAt.toDate()).format('lll')}</span>
      </div>
    </SC.Wrapper>
  );
};

export default AuthorData;
