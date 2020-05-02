import * as actionTypes from './actionTypes';
import { createCustomError, isValidFileType, isValidFileSize } from '../../shared/utility';
import axios from 'axios';
import { storage } from '../../config/fbConfig';

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

export const authFail = (error) => {
  const customError = createCustomError(error);
  return {
    type: actionTypes.AUTH_FAIL,
    error: customError,
  }
}

export const deleteError = () => ({
  type: actionTypes.DELETE_AUTH_ERROR,
});

export const deleteSuccess = () => ({
  type: actionTypes.DELETE_AUTH_SUCCESS,
});

export const onUserAdmin = () => ({
  type: actionTypes.ON_USER_ADMIN,
});

export const offUserAdmin = () => ({
  type: actionTypes.OFF_USER_ADMIN,
});

export const setAutoRedirectPath = (path) => ({
  type: actionTypes.SET_AUTO_REDIRECT_PATH,
  path,
});

export const signUp = ({ email, password, firstName, lastName }, history, redirectPath) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(authStart());
    const firebase = getFirebase();
    const firestore = getFirestore();
    try {
      if (!isNameValid(firstName, lastName)) {
        throw new Error('First and last name should be from 1 to 50 characters long');
      }
      const { user: { uid } } = await firebase.auth().createUserWithEmailAndPassword(email, password);
      await firestore.collection('users').doc(uid).set({
        firstName: `${firstName.slice(0, 1).toUpperCase()}${firstName.slice(1)}`,
        lastName: `${lastName.slice(0, 1).toUpperCase()}${lastName.slice(1)}`,
        photoURL: '',
      });
      await firestore.collection('users').doc(uid).collection('likedPosts').doc('likedPosts').set({
        likedPosts: [],
      });
      dispatch(authSuccess(null));
      history.push(redirectPath);
    } catch (error) {
      dispatch(authFail(error));
    }
  };
};

export const signIn = ({ email, password }, history, redirectPath) => {
  return async (dispatch, getState, { getFirebase }) => {
    dispatch(authStart());
    const firebase = getFirebase();
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      dispatch(authSuccess(null));
      history.push(redirectPath);
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

export const updateAuthorData = async (firestore, getState, updatedProps) => {
  const userUID = getState().firebase.auth.uid;
  const posts = await firestore.collection('posts').where('authorUID', '==', userUID).get();
  const comments = await firestore.collection('comments').where('authorUID', '==', userUID).get();
  const batch = firestore.batch();
  posts.forEach(({ ref }) => batch.update(ref, {
    ...updatedProps,
  }));
  comments.forEach(({ ref }) => batch.update(ref, {
    ...updatedProps,
  }));
  await batch.commit();
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
      const userUID = firebase.auth().currentUser.uid;
      const firstName = `${newFirstName.slice(0, 1).toUpperCase()}${newFirstName.slice(1)}`;
      const lastName = `${newLastName.slice(0, 1).toUpperCase()}${newLastName.slice(1)}`;
      await firestore.collection('users').doc(userUID).update({
        firstName,
        lastName,
      });
      const propsToUpdate = {
        authorFirstName: firstName,
        authorLastName: lastName,
      };
      await updateAuthorData(firestore, getState, propsToUpdate);
      dispatch(authSuccess('Name has been changed successfully!'));
      history.goBack();
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
      window.location.reload();
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
      history.goBack();
    } catch (error) {
      dispatch(authFail(error));
    }
  };
};

export const changePhoto = (photo, history) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(authStart());
    const firebase = getFirebase();
    const firestore = getFirestore();
    try {
      if (!isValidFileType(photo.type) || !isValidFileSize(photo.size)) {
        throw new Error('Type is not valid or size is greater than 1MB');
      }
      let reload = true;
      const userUID = firebase.auth().currentUser.uid;
      const storeSnapshot = await storage.child(`photos/${userUID}`).put(photo);
      if (!getState().firebase.profile.photoURL) {
        const photoURL = await storeSnapshot.ref.getDownloadURL();
        await firestore.collection('users').doc(userUID).update({
          photoURL,
        });
        const propsToUpdate = {
          authorPhotoURL: photoURL,
        };
        await updateAuthorData(firestore, getState, propsToUpdate);
        reload = false;
      }
      dispatch(authSuccess('Photo has been changed successfully!'));
      history.push('/settings');
      if (reload) window.location.reload();
    } catch (error) {
      dispatch(authFail(error));
    }
  };
};

export const deletePhoto = (history) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(authStart());
    const firebase = getFirebase();
    const firestore = getFirestore();
    try {
      const userUID = firebase.auth().currentUser.uid;
      if (getState().firebase.profile.photoURL) {
        await firestore.collection('users').doc(userUID).update({
          photoURL: '',
        });
        const propsToUpdate = {
          authorPhotoURL: '',
        };
        await updateAuthorData(firestore, getState, propsToUpdate);
      }
      dispatch(authSuccess('Photo has been deleted successfully!'));
      history.goBack();
    } catch (error) {
      dispatch(authFail(error));
    }
  };
};

export const deleteAccount = ({ email, password }, history) => {
  return async (dispatch, getState, { getFirebase }) => {
    dispatch(authStart());
    const firebase = getFirebase();
    try {
      const user = firebase.auth().currentUser;
      await reauthenticateUser(email, password, firebase);
      await user.delete();
      dispatch(authSuccess('Your account has been deleted successfully!'));
      history.push('/');
    } catch (error) {
      dispatch(authFail(error));
    }
  };
};

export const addAdmin = (email) => {
  return async (dispatch, getState, { getFirebase }) => {
    dispatch(authStart());
    const firebase = getFirebase();
    try {
      const userUID = firebase.auth().currentUser.uid;
      const authToken = await firebase.auth().currentUser.getIdToken();
      const { data } = await axios.post('https://us-central1-programming-passion.cloudfunctions.net/onAddAdmin',
        { email, userUID },
        { headers: { 'Authorization': `Bearer ${authToken}` } }
      );
      if (data.error) {
        throw new Error(data.error);
      }
      dispatch(authSuccess('Admin has been added successfully'));
    } catch (error) {
      dispatch(authFail(error));
    }
  };
};

export const removeAdmin = (email) => {
  return async (dispatch, getState, { getFirebase }) => {
    dispatch(authStart());
    const firebase = getFirebase();
    try {
      const userUID = firebase.auth().currentUser.uid;
      const authToken = await firebase.auth().currentUser.getIdToken();
      const { data } = await axios.post('https://us-central1-programming-passion.cloudfunctions.net/onRemoveAdmin',
        { email, userUID },
        { headers: { 'Authorization': `Bearer ${authToken}` } }
      );
      if (data.error) {
        throw new Error(data.error);
      }
      dispatch(authSuccess('Admin has been removed successfully'));
    } catch (error) {
      dispatch(authFail(error));
    }
  };
};

export const updateAdminState = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        dispatch(offUserAdmin());
        return;
      }
      const tokenResult = await user.getIdTokenResult();
      if (!tokenResult.claims.admin) {
        dispatch(offUserAdmin());
        return;
      }
      dispatch(onUserAdmin());
    });
  };
};