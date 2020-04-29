import React from 'react';
import classes from './PostSummary.module.scss';
import Line from '../../../components/UI/Line/Line';
import AuthorData from '../../../components/UI/AuthorData/AuthorData';
import sprite from '../../../images/sprite.svg';
import Heading from '../../../components/UI/Heading/Heading';

const PostSummary = ({ post }) => {
  const { authorFirstName, authorLastName, authorPhotoURL, title, likesCount, commentsCount, createdAt } = post;
  return (
    <div className={classes.PostSummary}>
      <div className={classes.Left}>
        <Heading variant="H5" align="Left" mgBottom="Mg-Bottom-Small">{title}</Heading>
        <Line type="Begin" size="Size-1" />
        <div className={classes.User}>
          <AuthorData
            size="Small"
            firstName={authorFirstName}
            lastName={authorLastName}
            photoURL={authorPhotoURL}
            createdAt={createdAt}
          />
        </div>
      </div>
      <div className={classes.Right}>
        <div className={classes.IconBox}>
          <svg className={classes.Icon}>
            <use href={`${sprite}#icon-heart`}></use>
          </svg>
          <span className={classes.IconCaption}>{likesCount}</span>
        </div>
        <div className={classes.IconBox}>
          <svg className={classes.Icon}>
            <use href={`${sprite}#icon-bubble`}></use>
          </svg>
          <span className={classes.IconCaption}>{commentsCount}</span>
        </div>
      </div>
    </div>
  );
};

export default PostSummary;