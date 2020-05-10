import React, { useState, Fragment } from 'react';
import classes from '../Posts/Posts.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import * as actions from '../../store/actions/indexActions';
import Line from '../../components/UI/Line/Line';
import PostList from '../Posts/PostList/PostList';
import Modal from '../../components/UI/Modal/Modal';
import Heading from '../../components/UI/Heading/Heading';

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
    <Heading variant="H6" thickness="Thin" mgTop="Mg-Top-VeryBig">
      You didn't write any post yet. <Link to="/create-post" className={classes.NoPostsLink}>Create one</Link>
    </Heading>
  );
  if (posts.length > 0) {
    myPosts = (
      <PostList
        posts={posts}
        deletable
        deleteStarted={startDeletingPostHandler}
      />
    )
  }

  return (
    <Fragment>
      <Modal
        headingText="Deleting post"
        captionText="The operation is irreversible"
        isVisible={isModalVisible}
        canceled={cancelDeletingPostHandler}
        deleted={deletePostHandler}
      />
      <div className={classes.Posts}>
        <Heading variant="H3" mgBottom="Mg-Bottom-Small">See your posts</Heading>
        <Line type="Begin" size="Size-2" />
        {myPosts}
      </div>
    </Fragment>
  );
}


export default firestoreConnect((state) => [
  { collection: 'posts', where: ['authorUID', '==', state.authUID], orderBy: ['createdAt', 'desc'], storeAs: 'userPosts' },
])(MyPosts);