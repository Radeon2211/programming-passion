import * as actionTypes from './actionTypes';

export const postStart = () => ({
  type: actionTypes.POST_START,
});

export const postSuccess = () => ({
  type: actionTypes.POST_SUCCESS,
});

export const postFail = (error) => ({
  type: actionTypes.POST_FAIL,
  error,
});

export const switchCanAddPost = (canAddPost) => ({
  type: actionTypes.SWITCH_CAN_ADD_POST,
  canAddPost,
});

export const switchCanAddComment = (canAddComment) => ({
  type: actionTypes.SWITCH_CAN_ADD_COMMENT,
  canAddComment,
});

export const createPost = ({ title, content }, history, canAddPost) => {
  return async (dispatch, getState, { getFirestore }) => {
    dispatch(postStart());
    const firestore = getFirestore();
    try {
      if (!canAddPost) {
        throw new Error('You have to wait 10 seconds after writing last post');
      } else {
        dispatch(switchCanAddPost(false));
        setTimeout(() => {
          dispatch(switchCanAddPost(true));
          dispatch(postSuccess());
        }, 10000);
      }
      const { auth: { uid: authorUID }, profile: { firstName, lastName, photoURL } } = getState().firebase;
      await firestore.collection('posts').add({
        authorUID,
        authorFirstName: firstName,
        authorLastName: lastName,
        authorPhotoURL: photoURL,
        title,
        content,
        likesCount: 0,
        commentsCount: 0,
        createdAt: new Date(),
      });
      dispatch(postSuccess());
      history.push('/posts');
    } catch (error) {
      dispatch(postFail(error));
    }
  };
};

export const deletePost = (postID, history) => {
  return async (dispatch, getState, { getFirestore }) => {
    dispatch(postStart());
    const firestore = getFirestore();
    try {
      await firestore.collection('posts').doc(postID).delete();
      dispatch(postSuccess());
      if (history) {
        history.replace('/posts');
      }
    } catch (error) {
      dispatch(postFail(error));
    }
  };
};

export const togglePostLiking = (postID, type) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    try {
      const userUID = firebase.auth().currentUser.uid;
      if (type === 'add') {
        await firestore.collection('users').doc(userUID).collection('likedPosts').doc('likedPosts').update({
          'likedPosts': firestore.FieldValue.arrayUnion(postID),
        });
      } else {
        await firestore.collection('users').doc(userUID).collection('likedPosts').doc('likedPosts').update({
          'likedPosts': firestore.FieldValue.arrayRemove(postID),
        });
      }
    } catch (error) {
      dispatch(postFail(error));
    }
  };
};

export const checkPostLiking = (postID) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    try {
      const currentUser = firebase.auth().currentUser;
      if (!currentUser) return false;
      const likedPosts = await firestore.collection('users').doc(currentUser.uid).collection('likedPosts').where('likedPosts', 'array-contains', postID).get();
      if (likedPosts.docs.length > 0) return true;
      return false;
    } catch (error) {
      dispatch(postFail(error));
    }
  };
};

export const addComment = (content, postID, postAuthorUID, canAddComment) => {
  return async (dispatch, getState, { getFirestore }) => {
    dispatch(postStart());
    const firestore = getFirestore();
    try {
      if (!canAddComment) {
        throw new Error('You have to wait 10 seconds after writing last comment');
      } else {
        dispatch(switchCanAddComment(false));
        setTimeout(() => {
          dispatch(switchCanAddComment(true));
          dispatch(postSuccess());
        }, 10000);
      }
      const { auth: { uid: userUID }, profile: { firstName, lastName, photoURL } } = getState().firebase;
      await firestore.collection('comments').add({
        authorFirstName: firstName,
        authorLastName: lastName,
        authorPhotoURL: photoURL,
        authorUID: userUID,
        postID,
        postAuthorUID,
        content,
        createdAt: new Date(),
      });
      dispatch(postSuccess());
    } catch (error) {
      dispatch(postFail(error));
    }
  };
};

export const deleteComment = (commentID) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    await firestore.collection('comments').doc(commentID).delete();
  };
};