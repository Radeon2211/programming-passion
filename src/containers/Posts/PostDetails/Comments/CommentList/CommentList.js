import React from 'react';
import Comment from '../Comment/Comment';
import Line from '../../../../../components/UI/Line/Line';
import classes from './CommentList.module.scss';

const CommentList = ({ comments }) => {
  const commentList = comments.map((comment) => (
    <React.Fragment key={comment.id}>
      <Line type="Begin" size="Size-1" />
      <Comment comment={comment} />
    </React.Fragment>
  ));

  return (
    <div className={classes.CommentList}>
      {commentList}
    </div>
  );
};

export default CommentList;