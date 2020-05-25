import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import * as SC from '../Posts.sc';
import * as actions from '../../../store/actions/indexActions';
import Line from '../../../components/UI/Line/Line';
import PostList from '../PostList/PostList';
import Modal from '../../../components/UI/Modal/Modal';
import Heading from '../../../components/UI/Heading/Heading';

const MyPosts = () => {
  const [postIdToDelete, setPostIdToDelete] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const posts = useSelector((state) => state.firestore.ordered.userPosts || []);

  const dispatch = useDispatch();
  const onDeletePost = (postID) => dispatch(actions.deletePost(postID));

  const startDeletingPostHandler = (postID) => {
    setPostIdToDelete(postID);
    setIsModalVisible(true);
  };

  const cancelDeletingPostHandler = () => {
    setPostIdToDelete(null);
    setIsModalVisible(false);
  };

  const deletePostHandler = () => {
    setIsModalVisible(false);
    if (!postIdToDelete) return;
    onDeletePost(postIdToDelete);
  };

  let myPosts = (
    <Heading variant="h6" thickness="thin" mgTop="4">
      You didn&apos;t write any post yet.
      <Link to="/create-post" className="no-posts-link">
        {' '}
        Create one
      </Link>
    </Heading>
  );
  if (posts.length > 0) {
    myPosts = <PostList posts={posts} deletable deleteStarted={startDeletingPostHandler} />;
  }

  return (
    <>
      <Modal
        headingText="Deleting post"
        captionText="The operation is irreversible"
        isVisible={isModalVisible}
        canceled={cancelDeletingPostHandler}
        deleted={deletePostHandler}
      />
      <SC.Wrapper>
        <Heading variant="h3" mgBottom="1">
          See your posts
        </Heading>
        <Line type="begin" size="2" />
        {myPosts}
      </SC.Wrapper>
    </>
  );
};

export default firestoreConnect((state) => [
  {
    collection: 'posts',
    where: ['authorUID', '==', state.authUID],
    orderBy: ['createdAt', 'desc'],
    storeAs: 'userPosts',
  },
])(MyPosts);
