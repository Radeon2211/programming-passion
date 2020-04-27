import React from 'react';
import classes from './Posts.module.scss';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Line from '../../components/UI/Line/Line';
import PostList from './PostList/PostList';

const Posts = ({ posts }) => {
  let postList = <span className={classes.NoPostsInfo}>It looks like there are no posts yet</span>;
  if (posts.length > 0) {
    postList = <PostList posts={posts} />;
  }

  return (
    <div className={classes.Posts}>
      <h1 className={classes.Heading}>Check out the latest posts</h1>
      <Line type="Begin" size="Size-2" />
      {postList}
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: state.firestore.ordered.allPosts || [],
});

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'posts', orderBy: ['createdAt', 'desc'], storeAs: 'allPosts' },
  ])
)(Posts);