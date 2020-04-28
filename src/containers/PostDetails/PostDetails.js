import React, { Fragment, Component } from 'react';
import classes from './PostDetails.module.scss';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import * as actions from '../../store/actions/indexActions';
import Line from '../../components/UI/Line/Line';
import Loader from '../../components/UI/Loader/Loader';
import AuthorData from '../../components/UI/AuthorData/AuthorData';
import sprite from '../../images/sprite.svg';
import Comments from './Comments/Comments';
import Modal from '../../components/UI/Modal/Modal';

class PostDetails extends Component {
  state = {
    isLikingPossible: true,
    isLiked: false,
    commentIdToDelete: null,
    isModalVisible: false,
  };

  likingTimeout = null;

  async componentDidMount() {
    const isLiked = await this.props.onCheckPostLiking(this.props.match.params.id);
    this.setState({ isLiked });
  }

  componentWillUnmount() {
    clearTimeout(this.likingTimeout);
  }

  startDeletingCommentHandler = (commentID) => {
    this.setState({
      commentIdToDelete: commentID,
      isModalVisible: true,
    });
  };

  cancelDeletingCommentHandler = () => {
    this.setState({
      commentIdToDelete: null,
      isModalVisible: false,
    });
  };

  deleteCommentHandler = () => {
    this.setState({ isModalVisible: false });
    if (!this.state.commentIdToDelete) return;
    this.props.onDeleteComment(this.state.commentIdToDelete, this.props.match.params.id);
  };

  togglePostLiking = () => {
    if (!this.state.isLikingPossible || !this.props.authUID) return;
    if (this.state.isLiked) {
      this.props.onTogglePostLiking(this.props.match.params.id, 'remove');
      this.setState({ isLiked: false });
    } else {
      this.props.onTogglePostLiking(this.props.match.params.id, 'add');
      this.setState({ isLiked: true });
    }
    this.setState({ isLikingPossible: false });
    this.likingTimeout = setTimeout(() => {
      this.setState({ isLikingPossible: true });
    }, 2000);
  };

  render () {
    const commentHandlingData = {
      authUID: this.props.authUID,
      postAuthorUID: this.props.post ? this.props.post.authorUID : null,
      deleteStarted: this.startDeletingCommentHandler,
    };

    let postDetails = <Loader size="Small" />;
    let unauthInfo = null;

    if (this.props.post) {
      const { authorFirstName, authorLastName, authorPhotoURL, title, content, likesCount, createdAt } = this.props.post;
      const likesClasses = [classes.Likes];
      if (this.state.isLiked) likesClasses.push(classes.Liked);
      const likesText = likesCount === 1 ? `${likesCount} like` : `${likesCount} likes`;

      if (!this.props.authUID) {
        unauthInfo = (
          <Fragment>
            <div className={classes.UnauthInfo}>
              <svg className={classes.LockIcon}>
                <use href={`${sprite}#icon-lock`}></use>
              </svg>
              <span className={classes.UnauthCaption}>
                <Link to="/signin" className={classes.UnauthCaptionLink}>Login</Link> to like and comment posts
              </span>
            </div>
            <Line type="Begin" size="Size-2" />
          </Fragment>
        );
      }

      postDetails = (
        <Fragment>
          <Modal
            headingText="Deleting comment"
            captionText="The operation is irreversible"
            isVisible={this.state.isModalVisible}
            canceled={this.cancelDeletingCommentHandler}
            deleted={this.deleteCommentHandler}
          />
          <div className={classes.PostDetails}>
            <h3 className={classes.Heading}>{title}</h3>
            <div className={classes.Author}>
              <AuthorData
                size="Big"
                firstName={authorFirstName}
                lastName={authorLastName}
                photoURL={authorPhotoURL}
                createdAt={createdAt}
              />
            </div>
            <Line type="Begin" size="Size-2" />
            <p className={classes.Content}>{content}</p>
            <div className={likesClasses.join(' ')}>
              <div className={classes.LikeIconBox} onClick={this.togglePostLiking}>
                <svg className={classes.LikeIcon}>
                  <use href={`${sprite}#icon-heart`}></use>
                </svg>
              </div>
              <span className={classes.LikeIconCaption}>{likesText}</span>
            </div>
            <Line type="Begin" size="Size-2" />
            {unauthInfo}
            <Comments
              comments={this.props.comments}
              postID={this.props.match.params.id}
              commentHandlingData={commentHandlingData}
            />
          </div>
        </Fragment>
      );
    }

    return (
      <Fragment>
        {postDetails}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    post: state.firestore.data.post || null,
    comments: state.firestore.ordered.comments || [],
    authUID: state.firebase.auth.uid,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onTogglePostLiking: (postID, type) => dispatch(actions.togglePostLiking(postID, type)),
  onCheckPostLiking: (postID) => dispatch(actions.checkPostLiking(postID)),
  onDeleteComment: (commentID, postID) => dispatch(actions.deleteComment(commentID, postID)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((state) => [
    { collection: 'posts', doc: state.match.params.id, storeAs: 'post' },
    { collection: 'comments', where: ['postID', '==', state.match.params.id], orderBy: ['createdAt', 'desc'], storeAs: 'comments' },
  ])
)(PostDetails);