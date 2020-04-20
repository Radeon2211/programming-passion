import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  loading: false,
  error: null,
};

const authStart = (state) => {
  return updateObject(state, { loading: true });
};

const authSuccess = (state) => {
  return updateObject(state, { loading: false, error: null });
};

const authFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case (actionTypes.AUTH_START): return authStart(state, action);
    case (actionTypes.AUTH_SUCCESS): return authSuccess(state, action);
    case (actionTypes.AUTH_FAIL): return authFail(state, action);
    default: return state;
  }
};

export default authReducer;