import React, { Fragment, Component } from 'react';
import classes from '../Posts/Posts.module.scss';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import * as actions from '../../store/actions/indexActions';
import Line from '../../components/UI/Line/Line';
import PostList from '../Posts/PostList/PostList';
import Modal from '../../components/UI/Modal/Modal';

class MyPosts extends Component {
  state = {
    postIdToDelete: null,
    isModalVisible: false,
  };

  startDeletingPostHandler = (postID) => {
    this.setState({
      postIdToDelete: postID,
      isModalVisible: true,
    });
  };

  cancelDeletingPostHandler = () => {
    this.setState({
      postIdToDelete: null,
      isModalVisible: false,
    });
  };

  deletePostHandler = () => {
    this.setState({ isModalVisible: false });
    if (!this.state.postIdToDelete) return;
    this.props.onDeletePost(this.state.postIdToDelete);
  };

  render () {
    return (
      <Fragment>
        <Modal
          headingText="Deleting post"
          captionText="The operation is irreversible"
          isVisible={this.state.isModalVisible}
          canceled={this.cancelDeletingPostHandler}
          deleted={this.deletePostHandler}
        />
        <div className={classes.Posts}>
          <h1 className={classes.Heading}>See your posts</h1>
          <Line type="Begin" size="Size-2" />
          <PostList
            posts={this.props.posts}
            deletable
            deleteStarted={this.startDeletingPostHandler} />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.firestore.ordered.userPosts || [],
});

const mapDispatchToProps = (dispatch) => ({
  onDeletePost: (postID) => dispatch(actions.deletePost(postID)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((state) => [
    { collection: 'posts', where: ['authorUID', '==', state.authUID], orderBy: ['createdAt', 'desc'], storeAs: 'userPosts' },
  ])
)(MyPosts);