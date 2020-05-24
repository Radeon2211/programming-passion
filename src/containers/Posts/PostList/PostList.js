import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import { Link } from 'react-router-dom';
import * as SC from './PostList.sc';
import PostSummary from '../PostSummary/PostSummary';
import sprite from '../../../images/sprite.svg';

const PostList = (props) => {
  const { posts, deletable, deleteStarted } = props;

  let postList = null;
  if (deletable) {
    postList = posts.map((post) => (
      <CSSTransition key={post.id} timeout={300} classNames="fade">
        <SC.DeletePostWrapper>
          <Link to={`/posts/${post.id}`} className="post-link">
            <PostSummary post={post} />
          </Link>
          <div className="icons">
            <Link to={`/edit-post/${post.id}`}>
              <svg className="edit-post-icon">
                <use href={`${sprite}#icon-pencil`} />
              </svg>
            </Link>
            <svg className="delete-post-icon" onClick={deleteStarted.bind(this, post.id)}>
              <use href={`${sprite}#icon-bin`} />
            </svg>
          </div>
        </SC.DeletePostWrapper>
      </CSSTransition>
    ));
  } else {
    postList = posts.map((post) => (
      <CSSTransition key={post.id} timeout={300} classNames="fade">
        <Link to={`/posts/${post.id}`} className="post-link">
          <PostSummary post={post} />
        </Link>
      </CSSTransition>
    ));
  }

  return <TransitionGroup component={SC.List}>{postList}</TransitionGroup>;
};

export default PostList;
