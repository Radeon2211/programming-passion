import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import styled from 'styled-components';
import Comment from '../Comment/Comment';
import Line from '../../../../components/UI/Line/Line';

const SC = {};
SC.Wrapper = styled.div`
  margin-top: 4.8rem;
`;

const CommentList = ({ comments, commentHandlingData }) => {
  const commentList = comments.map((comment) => (
    <CSSTransition key={comment.id} timeout={300} classNames="fade">
      <div>
        <Line type="begin" size="1" />
        <Comment comment={comment} commentHandlingData={commentHandlingData} />
      </div>
    </CSSTransition>
  ));

  return <TransitionGroup component={SC.Wrapper}>{commentList}</TransitionGroup>;
};

export default CommentList;
