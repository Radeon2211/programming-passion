import * as actionTypes from './actionTypes';

export const isNameValid = (firstName, lastName) => {
  if (firstName.length < 1 || firstName.length > 50
    || lastName.length < 1 || lastName.length > 50) {
      return false;
    }
  return true;
}

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});

export const authSuccess = (success) => ({
  type: actionTypes.AUTH_SUCCESS,
  success,
});

export const authFail = (error) => ({
  type: actionTypes.AUTH_FAIL,
  error,
});

export const deleteError = () => ({
  type: actionTypes.DELETE_AUTH_ERROR,
});

export const deleteSuccess = () => ({
  type: actionTypes.DELETE_AUTH_SUCCESS,
});

export const signUp = ({ email, password, firstName, lastName }) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(authStart());
    const firebase = getFirebase();
    const firestore = getFirestore();
    try {
      if (!isNameValid(firstName, lastName)) {
        throw new Error({ message: 'First and last name should be from 1 to 50 characters long' });
      }
      const { user: { uid } } = await firebase.auth().createUserWithEmailAndPassword(email, password);
      await firestore.collection('users').doc(uid).set({
        firstName: `${firstName.slice(0, 1).toUpperCase()}${firstName.slice(1)}`,
        lastName: `${lastName.slice(0, 1).toUpperCase()}${lastName.slice(1)}`,
        likedPosts: [],
      });
      dispatch(authSuccess(null));
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
      dispatch(authSuccess(null));
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

export const reauthenticateUser = async (email, password, firebase) => {
  const user = firebase.auth().currentUser;
  const credentials = await firebase.auth.EmailAuthProvider.credential(email, password);
  await user.reauthenticateWithCredential(credentials);
};

export const changeName = ({ newFirstName, newLastName }, history) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(authStart());
    const firebase = getFirebase();
    const firestore = getFirestore();
    try {
      if (!isNameValid(newFirstName, newLastName)) {
        throw new Error('First and last name should have from 1 to 50 characters');
      }
      const authUID = firebase.auth().currentUser.uid;
      await firestore.collection('users').doc(authUID).update({
        firstName: `${newFirstName.slice(0, 1).toUpperCase()}${newFirstName.slice(1)}`,
        lastName: `${newLastName.slice(0, 1).toUpperCase()}${newLastName.slice(1)}`,
      });
      dispatch(authSuccess('Name has been changed successfully!'));
      history.push('/settings');
    } catch (error) {
      dispatch(authFail(error));
    }
  };
};

export const changeEmail = ({ oldEmail, newEmail, password }, history) => {
  return async (dispatch, getState, { getFirebase }) => {
    dispatch(authStart());
    const firebase = getFirebase();
    try {
      const user = firebase.auth().currentUser;
      await reauthenticateUser(oldEmail, password, firebase);
      await user.updateEmail(newEmail);
      dispatch(authSuccess('Email has been changed successfully!'));
      history.push('/settings');
    } catch (error) {
      dispatch(authFail(error));
    }
  };
};

export const changePassword = ({ email, oldPassword, newPassword }, history) => {
  return async (dispatch, getState, { getFirebase }) => {
    dispatch(authStart());
    const firebase = getFirebase();
    try {
      const user = firebase.auth().currentUser;
      await reauthenticateUser(email, oldPassword, firebase);
      await user.updatePassword(newPassword);
      dispatch(authSuccess('Password has been changed successfully!'));
      history.push('/settings');
    } catch (error) {
      dispatch(authFail(error));
    }
  };
};
