import React from 'react';
import classes from './CommentList.module.scss';
import '../../../../css/animations.scss';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import Comment from '../Comment/Comment';
import Line from '../../../../components/UI/Line/Line';

const CommentList = ({ comments, commentHandlingData }) => {
  const commentList = comments.map((comment) => (
    <CSSTransition
      key={comment.id}
      timeout={300}
      classNames="fade"
    >
      <div>
        <Line type="Begin" size="Size-1" />
        <Comment
          comment={comment}
          commentHandlingData={commentHandlingData}
        />
      </div>
    </CSSTransition>
  ));

  return (
    <TransitionGroup
      component="div"
      className={classes.CommentList}
    >
      {commentList}
    </TransitionGroup>
  );
};

export default CommentList;