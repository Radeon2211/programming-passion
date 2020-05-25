import React from 'react';
import styled from 'styled-components';
import CommentList from './CommentList/CommentList';
import sprite from '../../../images/sprite.svg';
import AddComment from './AddComment/AddComment';
import Heading from '../../../components/UI/Heading/Heading';

const SC = {};
SC.Wrapper = styled.div`
  margin-top: 4.8rem;

  & .heading-box {
    align-items: center;
    display: flex;
  }

  & .comments-count {
    font-size: 2.3rem;
    margin-left: 0.6rem;
  }

  & .icon {
    fill: #fff;
    height: 2.7rem;
    margin-right: 1.2rem;
    width: 2.7rem;
  }
`;

const Comments = ({ comments, postID, commentHandlingData }) => {
  const addComment = commentHandlingData.authUID ? (
    <AddComment postID={postID} postAuthorUID={commentHandlingData.postAuthorUID} />
  ) : null;

  return (
    <SC.Wrapper>
      <div className="heading-box">
        <svg className="icon">
          <use href={`${sprite}#icon-bubble`} />
        </svg>
        <Heading variant="h4" thickness="thin">
          Comments
          {/* eslint-disable-next-line */}
          <span className="comments-count">( {comments.length}{' '} )</span>
        </Heading>
      </div>
      {addComment}
      <CommentList comments={comments} commentHandlingData={commentHandlingData} />
    </SC.Wrapper>
  );
};

export default Comments;
