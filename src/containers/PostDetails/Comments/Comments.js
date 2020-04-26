import React from 'react';
import classes from './Comments.module.scss';
import CommentList from './CommentList/CommentList';
import sprite from '../../../images/sprite.svg';
import AddComment from './AddComment/AddComment';

const Comments = ({ comments, postID, commentHandlingData }) => {
  const addComment = commentHandlingData.authUID
  ? <AddComment postID={postID} postAuthorUID={commentHandlingData.postAuthorUID} />
  : null;

  return (
    <div className={classes.Comments}>
      <h4 className={classes.Heading}>
        <svg className={classes.Icon}>
          <use href={`${sprite}#icon-bubble`}></use>
        </svg>
        Comments<span className={classes.CommentsCount}>( {comments.length} )</span>
      </h4>
      {addComment}
      <CommentList
        comments={comments}
        commentHandlingData={commentHandlingData}
      />
    </div>
  );
};

export default Comments;