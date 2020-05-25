import React from 'react';
import * as SC from './PostSummary.sc';
import Line from '../../../components/UI/Line/Line';
import AuthorData from '../../../components/UI/AuthorData/AuthorData';
import sprite from '../../../images/sprite.svg';
import Heading from '../../../components/UI/Heading/Heading';

const PostSummary = (props) => {
  const {
    post: {
      authorFirstName,
      authorLastName,
      authorPhotoURL,
      title,
      likesCount,
      commentsCount,
      createdAt,
    },
  } = props;
  return (
    <SC.Wrapper>
      <div className="left">
        <Heading variant="h5" align="left" mgBottom="1">
          {title}
        </Heading>
        <Line type="begin" size="1" />
        <div className="user">
          <AuthorData
            size="small"
            firstName={authorFirstName}
            lastName={authorLastName}
            photoURL={authorPhotoURL}
            createdAt={createdAt}
          />
        </div>
      </div>
      <div className="right">
        <div className="icon-box">
          <svg className="icon">
            <use href={`${sprite}#icon-heart`} />
          </svg>
          <span className="icon-caption">{likesCount}</span>
        </div>
        <div className="icon-box">
          <svg className="icon">
            <use href={`${sprite}#icon-bubble`} />
          </svg>
          <span className="icon-caption">{commentsCount}</span>
        </div>
      </div>
    </SC.Wrapper>
  );
};

export default PostSummary;
