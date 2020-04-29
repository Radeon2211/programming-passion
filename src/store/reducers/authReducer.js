import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  loading: false,
  success: null,
  error: null,
  isUserAdmin: false,
  autoRedirectPath: '/',
};

const authStart = (state) => {
  return updateObject(state, { loading: true });
};

const authSuccess = (state, action) => {
  return updateObject(state, { loading: false, error: null, success: action.success });
};

const authFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error.message, success: null });
};

const deleteError = (state) => {
  return updateObject(state, { error: null });
};

const deleteSuccess = (state) => {
  return updateObject(state, { success: null });
};

const onUserAdmin = (state) => {
  return updateObject(state, { isUserAdmin: true });
};

const offUserAdmin = (state) => {
  return updateObject(state, { isUserAdmin: false });
};

const setAutoRedirectPath = (state, action) => {
  return updateObject(state, { autoRedirectPath: action.path });
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case (actionTypes.AUTH_START): return authStart(state, action);
    case (actionTypes.AUTH_SUCCESS): return authSuccess(state, action);
    case (actionTypes.AUTH_FAIL): return authFail(state, action);
    case (actionTypes.DELETE_AUTH_ERROR): return deleteError(state, action);
    case (actionTypes.DELETE_AUTH_SUCCESS): return deleteSuccess(state, action);
    case (actionTypes.ON_USER_ADMIN): return onUserAdmin(state, action);
    case (actionTypes.OFF_USER_ADMIN): return offUserAdmin(state, action);
    case (actionTypes.SET_AUTO_REDIRECT_PATH): return setAutoRedirectPath(state, action);
    default: return state;
  }
};

export default authReducer;