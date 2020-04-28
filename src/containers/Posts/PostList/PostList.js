import React from 'react';
import classes from './PostList.module.scss';
import { Link } from 'react-router-dom';
import PostSummary from '../PostSummary/PostSummary';
import sprite from '../../../images/sprite.svg';

const PostList = ({ posts, deletable, deleteStarted }) => {
  let postList = null;
  if (deletable) {
    postList = posts.map((post) => (
      <div className={classes.DeletePostWrapper} key={post.id}>
        <Link to={`/posts/${post.id}`} className={classes.Link}>
          <PostSummary
            post={post}
          />
        </Link>
        <svg className={classes.DeletePostIcon} onClick={deleteStarted.bind(this, post.id)}>
          <use href={`${sprite}#icon-bin`}></use>
        </svg>
      </div>
    ));
  } else {
    postList = posts.map((post) => (
      <Link to={`/posts/${post.id}`} key={post.id} className={classes.Link}>
        <PostSummary
          post={post}
        />
      </Link>
    ));
  }

  return (
    <div className={classes.PostList}>
      {postList}
    </div>
  );
};

export default PostList;