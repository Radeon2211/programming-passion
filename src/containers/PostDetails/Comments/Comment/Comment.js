import React from 'react';
import classes from './Comment.module.scss';
import AuthorData from '../../../../components/UI/AuthorData/AuthorData';
import sprite from '../../../../images/sprite.svg';
import RenderIfIsAdmin from '../../../../components/RenderIfsAdmin/RenderIfIsAdmin';

const Comment = ({ comment, commentHandlingData: { authUID, postAuthorUID, deleteStarted } }) => {
  const { id: commentID, authorFirstName, authorLastName, authorPhotoURL, authorUID, createdAt, content } = comment;

  let deleteIcon = null;
  if (authUID === authorUID || authUID === postAuthorUID) {
    deleteIcon = (
      <svg className={classes.DeleteIcon} onClick={deleteStarted.bind(this, commentID)}>
        <use href={`${sprite}#icon-bin`}></use>
      </svg>
    );
  } else {
    deleteIcon = (
      <RenderIfIsAdmin>
        <svg className={classes.DeleteIcon} onClick={deleteStarted.bind(this, commentID)}>
          <use href={`${sprite}#icon-bin`}></use>
        </svg>
      </RenderIfIsAdmin>
    );
  }

  return (
    <div className={classes.Comment}>
      <div className={classes.AuthorDataAndDelete}>
        <AuthorData
          size="Small"
          firstName={authorFirstName}
          lastName={authorLastName}
          photoURL={authorPhotoURL}
          createdAt={createdAt}
        />
        {deleteIcon}
      </div>
      <p className={classes.Content}>{content}</p>
    </div>
  );
};

export default Comment;