import React, { Fragment, Component } from 'react';
import classes from './PostDetails.module.scss';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import * as actions from '../../store/actions/indexActions';
import { actionTypes as firestoreActionTypes } from 'redux-firestore';
import Line from '../../components/UI/Line/Line';
import Loader from '../../components/UI/Loader/Loader';
import AuthorData from '../../components/UI/AuthorData/AuthorData';
import sprite from '../../images/sprite.svg';
import Comments from './Comments/Comments';
import Modal from '../../components/UI/Modal/Modal';
import RenderIfIsAdmin from '../../components/RenderIfsAdmin/RenderIfIsAdmin';
import Heading from '../../components/UI/Heading/Heading';

class PostDetails extends Component {
  state = {
    isLikingPossible: true,
    isLiked: false,
    commentIdToDelete: null,
    isCommentModalVisible: false,
    isPostModalVisible: false,
  };

  likingTimeout = null;

  async componentDidMount() {
    const isLiked = await this.props.onCheckPostLiking(this.props.match.params.id);
    this.setState({ isLiked });
  }

  componentWillUnmount() {
    clearTimeout(this.likingTimeout);
    this.props.dispatch({
      type: firestoreActionTypes.CLEAR_DATA,
      preserve: { ordered: true, data: ['allPosts', 'comments', 'userPosts'] },
    });
  }

  startDeletingCommentHandler = (commentID) => {
    this.setState({
      commentIdToDelete: commentID,
      isCommentModalVisible: true,
    });
  };

  deleteCommentHandler = () => {
    this.setState({
      isCommentModalVisible: false,
      isPostModalVisible: false,
    });
    if (!this.state.commentIdToDelete) return;
    this.props.onDeleteComment(this.state.commentIdToDelete);
  };

  startDeletingPostHandler = () => {
    this.setState({
      isPostModalVisible: true,
    });
  };

  deletePostHandler = () => {
    this.setState({
      isCommentModalVisible: false,
      isPostModalVisible: false,
    });
    if (!this.props.match.params.id) return;
    this.props.onDeletePost(this.props.match.params.id, this.props.history);
  };

  cancelDeletingHandler = () => {
    this.setState({
      commentIdToDelete: null,
      isPostModalVisible: false,
      isCommentModalVisible: false,
    });
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
    if (this.props.post === null) {
      postDetails = <Heading variant="H6">This post does not exists</Heading>
    }

    let unauthInfo = null;

    let postOptions = (
      <RenderIfIsAdmin>
        <div className={classes.PostOptions}>
          <Line type="Begin" size="Size-2" />
          <div className={classes.PostOptionsIcons}>
            <svg className={classes.DeletePostIcon} onClick={this.startDeletingPostHandler}>
              <use href={`${sprite}#icon-bin`}></use>
            </svg>
          </div>
        </div>
      </RenderIfIsAdmin>
    );

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
                <Link
                  to="/signin"
                  className={classes.UnauthCaptionLink}
                  onClick={this.props.onSetAutoRedirectPath.bind(this, `/posts/${this.props.match.params.id}`)}
                >Login</Link> or <Link
                  to="/signup"
                  className={classes.UnauthCaptionLink}
                  onClick={this.props.onSetAutoRedirectPath.bind(this, `/posts/${this.props.match.params.id}`)}
                >sign up</Link> to like and comment posts
              </span>
            </div>
            <Line type="Begin" size="Size-2" />
          </Fragment>
        );
      }

      if (this.props.post.authorUID === this.props.authUID) {
        postOptions = (
          <div className={classes.PostOptions}>
            <Line type="Begin" size="Size-2" />
            <div className={classes.PostOptionsIcons}>
              <Link to={`/edit-post/${this.props.match.params.id}`}>
                <svg className={classes.EditPostIcon}>
                  <use href={`${sprite}#icon-pencil`}></use>
                </svg>
              </Link>
              <svg className={classes.DeletePostIcon} onClick={this.startDeletingPostHandler}>
                <use href={`${sprite}#icon-bin`}></use>
              </svg>
            </div>
          </div>
        );
      }

      postDetails = (
        <Fragment>
          <Modal
            headingText="Deleting comment"
            captionText="The operation is irreversible"
            isVisible={this.state.isCommentModalVisible}
            canceled={this.cancelDeletingHandler}
            deleted={this.deleteCommentHandler}
          />
          <Modal
            headingText="Deleting post"
            captionText="The operation is irreversible"
            isVisible={this.state.isPostModalVisible}
            canceled={this.cancelDeletingHandler}
            deleted={this.deletePostHandler}
          />
          <div className={classes.PostDetails}>
            <Heading variant="H4" align="Left" mgBottom="Mg-Bottom-Small">{title}</Heading>
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
            {postOptions}
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

const mapStateToProps = (state) => ({
  post: state.firestore.data.post === undefined ? undefined : state.firestore.data.post,
  comments: state.firestore.ordered.comments || [],
  authUID: state.firebase.auth.uid,
});

const mapDispatchToProps = (dispatch) => ({
  onTogglePostLiking: (postID, type) => dispatch(actions.togglePostLiking(postID, type)),
  onCheckPostLiking: (postID) => dispatch(actions.checkPostLiking(postID)),
  onDeleteComment: (commentID) => dispatch(actions.deleteComment(commentID)),
  onDeletePost: (postID, history) => dispatch(actions.deletePost(postID, history)),
  onSetAutoRedirectPath: (path) => dispatch(actions.setAutoRedirectPath(path)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((state) => [
    { collection: 'posts', doc: state.match.params.id, storeAs: 'post' },
    { collection: 'comments', where: ['postID', '==', state.match.params.id], orderBy: ['createdAt', 'desc'], storeAs: 'comments' },
  ])
)(PostDetails);