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
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(postStart());
    const firebase = getFirebase();
    const firestore = getFirestore();
    try {
      const { auth: { uid: authorUID }, profile: { firstName, lastName, photoURL, createdPosts } } = getState().firebase;
      const postDoc = await firestore.collection('posts').add({
        authorUID,
        authorFirstName: firstName,
        authorLastName: lastName,
        authorPhotoURL: photoURL,
        title,
        content,
        createdAt: new Date(),
        likesCount: 0,
        comments: [],
      });
      createdPosts.push(postDoc.id);
      await firestore.collection('users').doc(authorUID).update({
        createdPosts,
      });
      dispatch(postSuccess());
      history.push('/posts');
    } catch (error) {
      dispatch(postFail(error));
    }
  };
};