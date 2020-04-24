import React, { Fragment, Component } from 'react';
import classes from './PostDetails.module.scss';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import * as actions from '../../../store/actions/indexActions';
import Line from '../../../components/UI/Line/Line';
import Loader from '../../../components/UI/Loader/Loader';
import AuthorData from '../../../components/UI/AuthorData/AuthorData';
import sprite from '../../../images/sprite.svg';

class PostDetails extends Component {
  state = {
    isLikingPossible: true,
    isLiked: false,
    timeout: null,
  };

  timeout = null;

  async componentDidMount() {
    const isLiked = await this.props.onCheckPostLiking(this.props.match.params.id);
    this.setState({ isLiked });
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  togglePostLiking = () => {
    if (!this.state.isLikingPossible) return;
    if (this.state.isLiked) {
      this.props.onTogglePostLiking(this.props.match.params.id, 'remove');
      this.setState({ isLiked: false });
    } else {
      this.props.onTogglePostLiking(this.props.match.params.id, 'add');
      this.setState({ isLiked: true });
    }
    this.setState({ isLikingPossible: false });
    this.timeout = setTimeout(() => {
      this.setState({ isLikingPossible: true });
    }, 2000);
  };

  render () {
    let postDetails = <Loader size="Small" />;
    if (this.props.post) {
      const { authorFirstName, authorLastName, authorPhotoURL, title, content, likesCount, commentsCount, createdAt } = this.props.post;
      const likesClasses = [classes.Likes];
      if (this.state.isLiked) likesClasses.push(classes.Liked);

      postDetails = (
        <div className={classes.PostDetails}>
          <h3 className={classes.Heading}>{title}</h3>
          <div className={classes.Author}>
            <AuthorData
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
            <span className={classes.LikeIconCaption}>{likesCount} likes</span>
          </div>
        </div>
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
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((state) => [
    { collection: 'posts', doc: state.match.params.id, storeAs: 'post' },
    { collection: 'comments', where: ['postID', '==', state.match.params.id], orderBy: ['createdAt', 'desc'], storeAs: 'comments' },
  ])
)(PostDetails);