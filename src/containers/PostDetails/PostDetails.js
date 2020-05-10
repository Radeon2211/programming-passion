import React, { useState, useEffect, useCallback, useRef, Fragment } from 'react';
import classes from './PostDetails.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
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

const PostDetails = (props) => {
  const isUnmounted = useRef(false);

  const [isLikingPossible, setIsLikingPossible] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState(null);
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);
  const [isPostModalVisible, setIsPostModalVisible] = useState(false);

  const post = useSelector((state) => state.firestore.data.post === undefined ? undefined : state.firestore.data.post);
  const comments = useSelector((state) => state.firestore.ordered.comments || []);
  const authUID = useSelector((state) => state.firebase.auth.uid);

  const dispatch = useDispatch();
  const onTogglePostLiking = (postID, type) => dispatch(actions.togglePostLiking(postID, type));
  const onCheckPostLiking = useCallback((postID) => dispatch(actions.checkPostLiking(postID)), [dispatch]);
  const onDeleteComment = (commentID) => dispatch(actions.deleteComment(commentID));
  const onDeletePost = (postID, history) => dispatch(actions.deletePost(postID, history));
  const onSetAutoRedirectPath = (path) => dispatch(actions.setAutoRedirectPath(path));

  let likingTimeout = null;

  const { match, dispatch: firestoreDispatch } = props;

  useEffect(() => {
    const checkIfIsLiked = async () => {
      const isLiked = await onCheckPostLiking(match.params.id);
      setIsLiked(isLiked);
    };
    checkIfIsLiked();
  }, [onCheckPostLiking, match]);

  useEffect(() => {
    return () => {
      isUnmounted.current = true;
      clearTimeout(likingTimeout);
      firestoreDispatch({
        type: firestoreActionTypes.CLEAR_DATA,
        preserve: { ordered: true, data: ['allPosts', 'comments', 'userPosts'] },
      });
    };
  }, [likingTimeout, firestoreDispatch]);

  const startDeletingCommentHandler = (commentID) => {
    setCommentIdToDelete(commentID);
    setIsCommentModalVisible(true);
  };

  const deleteCommentHandler = () => {
    setCommentIdToDelete(false);
    setIsCommentModalVisible(false);
    if (!commentIdToDelete) return;
    onDeleteComment(commentIdToDelete);
  };

  const startDeletingPostHandler = () => {
    setIsPostModalVisible(true);
  };

  const deletePostHandler = () => {
    setIsCommentModalVisible(true);
    setIsPostModalVisible(false);
    if (!match.params.id) return;
    onDeletePost(match.params.id, props.history);
  };

  const cancelDeletingHandler = () => {
    setCommentIdToDelete(null);
    setIsCommentModalVisible(false);
    setIsPostModalVisible(false);
  };

  const togglePostLiking = () => {
    if (!isLikingPossible || !authUID) return;
    if (isLiked) {
      onTogglePostLiking(match.params.id, 'remove');
      setIsLiked(false);
    } else {
      onTogglePostLiking(match.params.id, 'add');
      setIsLiked(true);
    }
    setIsLikingPossible(false);
    likingTimeout = setTimeout(() => {
      if (!isUnmounted.current) {
        setIsLikingPossible(true);
      }
    }, 2000);
  };

  const commentHandlingData = {
    authUID: authUID,
    postAuthorUID: post ? post.authorUID : null,
    deleteStarted: startDeletingCommentHandler,
  };

  let postDetails = <Loader size="Small" />;
  if (post === null) {
    postDetails = <Heading variant="H6">This post does not exists</Heading>
  }

  let unauthInfo = null;

  let postOptions = (
    <RenderIfIsAdmin>
      <div className={classes.PostOptions}>
        <Line type="Begin" size="Size-2" />
        <div className={classes.PostOptionsIcons}>
          <svg className={classes.DeletePostIcon} onClick={startDeletingPostHandler}>
            <use href={`${sprite}#icon-bin`}></use>
          </svg>
        </div>
      </div>
    </RenderIfIsAdmin>
  );

  if (post) {
    const { authorFirstName, authorLastName, authorPhotoURL, title, content, likesCount, createdAt } = post;
    const likesClasses = [classes.Likes];
    if (isLiked) likesClasses.push(classes.Liked);
    const likesText = likesCount === 1 ? `${likesCount} like` : `${likesCount} likes`;

    if (!authUID) {
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
                onClick={onSetAutoRedirectPath.bind(this, `/posts/${match.params.id}`)}
              >Login</Link> or <Link
                to="/signup"
                className={classes.UnauthCaptionLink}
                onClick={onSetAutoRedirectPath.bind(this, `/posts/${match.params.id}`)}
              >sign up</Link> to like and comment posts
            </span>
          </div>
          <Line type="Begin" size="Size-2" />
        </Fragment>
      );
    }

    if (post.authorUID === authUID) {
      postOptions = (
        <div className={classes.PostOptions}>
          <Line type="Begin" size="Size-2" />
          <div className={classes.PostOptionsIcons}>
            <Link to={`/edit-post/${match.params.id}`}>
              <svg className={classes.EditPostIcon}>
                <use href={`${sprite}#icon-pencil`}></use>
              </svg>
            </Link>
            <svg className={classes.DeletePostIcon} onClick={startDeletingPostHandler}>
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
          isVisible={isCommentModalVisible}
          canceled={cancelDeletingHandler}
          deleted={deleteCommentHandler}
        />
        <Modal
          headingText="Deleting post"
          captionText="The operation is irreversible"
          isVisible={isPostModalVisible}
          canceled={cancelDeletingHandler}
          deleted={deletePostHandler}
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
            <div className={classes.LikeIconBox} onClick={togglePostLiking}>
              <svg className={classes.LikeIcon}>
                <use href={`${sprite}#icon-heart`}></use>
              </svg>
            </div>
            <span className={classes.LikeIconCaption}>{likesText}</span>
          </div>
          <Line type="Begin" size="Size-2" />
          {unauthInfo}
          <Comments
            comments={comments}
            postID={match.params.id}
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
};

export default firestoreConnect((state) => [
  { collection: 'posts', doc: state.match.params.id, storeAs: 'post' },
  { collection: 'comments', where: ['postID', '==', state.match.params.id], orderBy: ['createdAt', 'desc'], storeAs: 'comments' },
])(PostDetails);