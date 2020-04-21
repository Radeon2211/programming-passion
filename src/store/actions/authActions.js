import * as actionTypes from './actionTypes';

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});

export const authSuccess = () => ({
  type: actionTypes.AUTH_SUCCESS,
});

export const authFail = (error) => ({
  type: actionTypes.AUTH_FAIL,
  error,
});

export const deleteError = () => ({
  type: actionTypes.DELETE_ERROR,
});

export const signUp = ({ email, password, firstName, lastName }) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(authStart());
    const firebase = getFirebase();
    const firestore = getFirestore();
    try {
      const { user: { uid } } = await firebase.auth().createUserWithEmailAndPassword(email, password);
      await firestore.collection('users').doc(uid).set({
        firstName: `${firstName.slice(0, 1).toUpperCase()}${firstName.slice(1)}`,
        lastName: `${lastName.slice(0, 1).toUpperCase()}${lastName.slice(1)}`,
        likedPosts: [],
      });
      dispatch(authSuccess());
    } catch (error) {
      dispatch(authFail(error));
    }
  };
};

export const signIn = ({ email, password }) => {
  return async (dispatch, getState, { getFirebase }) => {
    dispatch(authStart());
    const firebase = getFirebase();
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      dispatch(authSuccess());
    } catch (error) {
      dispatch(authFail(error));
    }
  };
};

export const signOut = () => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    await firebase.auth().signOut();
  };
};