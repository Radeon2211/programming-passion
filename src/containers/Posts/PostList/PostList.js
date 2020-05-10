import React from 'react';
import classes from './PostList.module.scss';
import '../../../css/animations.scss';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import { Link } from 'react-router-dom';
import PostSummary from '../PostSummary/PostSummary';
import sprite from '../../../images/sprite.svg';

const PostList = ({ posts, deletable, deleteStarted }) => {
  let postList = null;
  if (deletable) {
    postList = posts.map((post) => (
      <CSSTransition
        key={post.id}
        timeout={300}
        classNames="fade"
      >
        <div className={classes.DeletePostWrapper}>
          <Link to={`/posts/${post.id}`} className={classes.PostLink}>
            <PostSummary
              post={post}
            />
          </Link>
          <div className={classes.Icons}>
            <Link to={`/edit-post/${post.id}`}>
              <svg className={classes.EditPostIcon}>
                <use href={`${sprite}#icon-pencil`}></use>
              </svg>
            </Link>
            <svg className={classes.DeletePostIcon} onClick={deleteStarted.bind(this, post.id)}>
              <use href={`${sprite}#icon-bin`}></use>
            </svg>
          </div>
        </div>
      </CSSTransition>
    ));
  } else {
    postList = posts.map((post) => (
      <CSSTransition
        key={post.id}
        timeout={300}
        classNames="fade"
      >
        <Link to={`/posts/${post.id}`} className={classes.PostLink}>
          <PostSummary
            post={post}
          />
        </Link>
      </CSSTransition>
    ));
  }

  return (
    <TransitionGroup
      component="div"
      className={classes.PostList}
    >
      {postList}
    </TransitionGroup>
  );
};

export default PostList;