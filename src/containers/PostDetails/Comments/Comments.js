import React from 'react';
import classes from './Comments.module.scss';
import CommentList from './CommentList/CommentList';
import sprite from '../../../images/sprite.svg';
import AddComment from './AddComment/AddComment';
import Heading from '../../../components/UI/Heading/Heading';

const Comments = ({ comments, postID, commentHandlingData }) => {
  const addComment = commentHandlingData.authUID
  ? <AddComment postID={postID} postAuthorUID={commentHandlingData.postAuthorUID} />
  : null;

  return (
    <div className={classes.Comments}>
      <div className={classes.HeadingBox}>
        <svg className={classes.Icon}>
          <use href={`${sprite}#icon-bubble`}></use>
        </svg>
        <Heading variant="H4" thickness="Thin">
          Comments<span className={classes.CommentsCount}>( {comments.length} )</span>
        </Heading>
      </div>
      {addComment}
      <CommentList
        comments={comments}
        commentHandlingData={commentHandlingData}
      />
    </div>
  );
};

export default Comments;