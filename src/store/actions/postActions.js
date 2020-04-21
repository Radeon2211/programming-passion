import * as actionTypes from './actionTypes';

// export const authStart = () => ({
//   type: actionTypes.AUTH_START,
// });

// export const authSuccess = () => ({
//   type: actionTypes.AUTH_SUCCESS,
// });

// export const authFail = (error) => ({
//   type: actionTypes.AUTH_FAIL,
//   error,
// });

export const createPost = () => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    // dispatch(authStart());
    // const firebase = getFirebase();
    // const firestore = getFirestore();
    // try {
    //   const { user: { uid } } = await firebase.auth().createUserWithEmailAndPassword(email, password);
    //   await firestore.collection('users').doc(uid).set({
    //     firstName: `${firstName.slice(0, 1).toUpperCase()}${firstName.slice(1)}`,
    //     lastName: `${lastName.slice(0, 1).toUpperCase()}${lastName.slice(1)}`,
    //     likedPosts: [],
    //   });
    //   dispatch(authSuccess());
    // } catch (error) {
    //   dispatch(authFail(error));
    // }
  };
};