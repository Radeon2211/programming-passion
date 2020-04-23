import React from 'react';
import classes from './PostList.module.scss';
import { Link } from 'react-router-dom';
import PostSummary from '../PostSummary/PostSummary';

const PostList = ({ posts }) => {
  const postList = posts.map((post) => (
    <Link to={`/posts/${post.id}`} key={post.id} className={classes.Link}>
      <PostSummary
        post={post}
      />
    </Link>
  ));

  return (
    <div className={classes.PostList}>
      {postList}
    </div>
  );
};

export default PostList;