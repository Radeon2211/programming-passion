import React from 'react';
import AuthorData from '../../../../../components/UI/AuthorData/AuthorData';
import classes from './Comment.module.scss';

const Comment = ({ comment }) => {
  const { authorFirstName, authorLastName, authorPhotoURL, createdAt, content } = comment;

  return (
    <div className={classes.Comment}>
      <AuthorData
        size="Small"
        firstName={authorFirstName}
        lastName={authorLastName}
        photoURL={authorPhotoURL}
        createdAt={createdAt}
      />
      <p className={classes.Content}>{content}</p>
    </div>
  );
};

export default Comment;