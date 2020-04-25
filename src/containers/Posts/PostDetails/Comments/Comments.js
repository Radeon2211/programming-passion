import React from 'react';
import classes from './Comments.module.scss';
import CommentList from './CommentList/CommentList';
import sprite from '../../../../images/sprite.svg';
import AddComment from './AddComment/AddComment';

const Comments = ({ comments, postID, isAuth }) => {
  const addComment = isAuth ? <AddComment postID={postID} /> : null;

  return (
    <div className={classes.Comments}>
      <h4 className={classes.Heading}>
        <svg className={classes.Icon}>
          <use href={`${sprite}#icon-bubble`}></use>
        </svg>
        Comments ( {comments.length} )
      </h4>
      {addComment}
      <CommentList comments={comments} />
    </div>
  );
};

export default Comments;