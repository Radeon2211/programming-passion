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

export const switchCanWritePost = (canWritePost) => ({
  type: actionTypes.SWITCH_CAN_WRITE_POST,
  canWritePost,
});

export const switchCanWriteComment = (canWriteComment) => ({
  type: actionTypes.SWITCH_CAN_WRITE_COMMENT,
  canWriteComment,
});

export const checkIfCanWritePost = (canWritePost) => {
  return (dispatch) => {
    if (!canWritePost) {
      dispatch(postFail(new Error('You have to wait 10 seconds after writing last post')));
      return false;
    } else {
      dispatch(switchCanWritePost(false));
      setTimeout(() => {
        dispatch(switchCanWritePost(true));
        dispatch(postSuccess());
      }, 10000);
      return true;
    }
  };
};

export const checkIfCanWriteComment = (canWriteComment) => {
  return (dispatch) => {
    if (!canWriteComment) {
      dispatch(postFail(new Error('You have to wait 10 seconds after writing last comment')));
      return false;
    } else {
      dispatch(switchCanWriteComment(false));
      setTimeout(() => {
        dispatch(switchCanWriteComment(true));
        dispatch(postSuccess());
      }, 10000);
      return true;
    }
  };
};

export const createPost = ({ title, content }, history, canWritePost) => {
  return async (dispatch, getState, { getFirestore }) => {
    dispatch(postStart());
    const firestore = getFirestore();
    try {
      if (!dispatch(checkIfCanWritePost(canWritePost))) return;
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

export const editPost = ({ title, content }, postID, history, canWritePost) => {
  return async (dispatch, getState, { getFirestore }) => {
    dispatch(postStart());
    const firestore = getFirestore();
    try {
      if (!dispatch(checkIfCanWritePost(canWritePost))) return;
      await firestore.collection('posts').doc(postID).update({
        title,
        content,
      });
      dispatch(postSuccess());
      history.push(`/posts/${postID}`);
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

export const addComment = (content, postID, postAuthorUID, canWriteComment, resetForm) => {
  return async (dispatch, getState, { getFirestore }) => {
    dispatch(postStart());
    const firestore = getFirestore();
    try {
      if (!dispatch(checkIfCanWriteComment(canWriteComment))) return;
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
      resetForm();
      dispatch(postSuccess());
    } catch (error) {
      dispatch(postFail(error));
    }
  };
};

export const editComment = (content, commentID, canEditComment, closed) => {
  return async (dispatch, getState, { getFirestore }) => {
    dispatch(postStart());
    const firestore = getFirestore();
    try {
      if (!dispatch(checkIfCanWriteComment(canEditComment))) return;
      await firestore.collection('comments').doc(commentID).update({
        content,
      });
      closed();
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