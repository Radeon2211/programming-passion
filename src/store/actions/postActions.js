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

export const createPost = ({ title, content }, history) => {
  return async (dispatch, getState, { getFirestore }) => {
    dispatch(postStart());
    const firestore = getFirestore();
    try {
      const { auth: { uid: authorUID }, profile: { firstName, lastName, photoURL } } = getState().firebase;
      await firestore.collection('posts').add({
        authorUID,
        authorFirstName: firstName,
        authorLastName: lastName,
        authorPhotoURL: photoURL,
        title,
        content,
        createdAt: new Date(),
        likesCount: 0,
        commentsCount: 0,
      });
      dispatch(postSuccess());
      history.push('/posts');
    } catch (error) {
      dispatch(postFail(error));
    }
  };
};

export const deletePost = (postID) => {
  return async (dispatch, getState, { getFirestore }) => {
    dispatch(postStart());
    const firestore = getFirestore();
    try {
      await firestore.collection('posts').doc(postID).delete();
      dispatch(postSuccess());
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
        await firestore.collection('posts').doc(postID).update({
          likesCount: firestore.FieldValue.increment(1),
        });
      } else {
        await firestore.collection('users').doc(userUID).collection('likedPosts').doc('likedPosts').update({
          'likedPosts': firestore.FieldValue.arrayRemove(postID),
        });
        await firestore.collection('posts').doc(postID).update({
          likesCount: firestore.FieldValue.increment(-1),
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
      const userUID = firebase.auth().currentUser.uid;
      const likedPosts = await firestore.collection('users').doc(userUID).collection('likedPosts').where('likedPosts', 'array-contains', postID).get();
      if (likedPosts.docs.length > 0) return true;
      return false;
    } catch (error) {
      dispatch(postFail(error));
    }
  };
};

export const addComment = (content, postID, postAuthorUID) => {
  return async (dispatch, getState, { getFirestore }) => {
    dispatch(postStart());
    const firestore = getFirestore();
    try {
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
      await firestore.collection('posts').doc(postID).update({
        commentsCount: firestore.FieldValue.increment(1),
      });
      dispatch(postSuccess());
    } catch (error) {
      dispatch(postFail(error));
    }
  };
};

export const deleteComment = (commentID, postID) => {
  return async (dispatch, getState, { getFirestore }) => {
    dispatch(postStart());
    const firestore = getFirestore();
    try {
      await firestore.collection('comments').doc(commentID).delete();
      await firestore.collection('posts').doc(postID).update({
        commentsCount: firestore.FieldValue.increment(-1),
      });
      dispatch(postSuccess());
    } catch (error) {
      dispatch(postFail(error));
    }
  };
};