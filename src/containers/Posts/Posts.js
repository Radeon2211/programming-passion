import React from 'react';
import classes from './Posts.module.scss';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Line from '../../components/UI/Line/Line';
import PostList from './PostList/PostList';

const Posts = ({ posts }) => (
  <div className={classes.Posts}>
    <h1 className={classes.Heading}>Check out the latest posts</h1>
    <Line type="Begin" />
    <PostList posts={posts} />
  </div>
);

const mapStateToProps = (state) => ({
  posts: state.firestore.ordered.posts || [],
});

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'posts', orderBy: ['createdAt', 'desc'] },
  ])
)(Posts);