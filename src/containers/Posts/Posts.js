import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import * as SC from './Posts.sc';
import Line from '../../components/UI/Line/Line';
import PostList from './PostList/PostList';
import Heading from '../../components/UI/Heading/Heading';

const Posts = ({ posts }) => {
  let postList = (
    <Heading variant="H6" thickness="Thin" mgTop="Mg-Top-VeryBig">
      It look like there is no posts yet. Maybe you want to
      <Link to="/create-post" className="no-posts-link">
        {' '}
        create one
      </Link>
      ?
    </Heading>
  );
  if (posts.length > 0) {
    postList = <PostList posts={posts} />;
  }

  return (
    <SC.Wrapper>
      <Heading variant="H3" mgBottom="Mg-Bottom-Small">
        Check out the latest posts
      </Heading>
      <Line type="begin" size="2" />
      {postList}
    </SC.Wrapper>
  );
};

const mapStateToProps = (state) => ({
  posts: state.firestore.ordered.allPosts || [],
});

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: 'posts', orderBy: ['createdAt', 'desc'], storeAs: 'allPosts' }]),
)(Posts);
