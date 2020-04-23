import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  loading: false,
  error: null,
};

const postStart = (state) => {
  return updateObject(state, { loading: true });
};

const postSuccess = (state) => {
  return updateObject(state, { loading: false, error: null });
};

const postFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error.message });
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case (actionTypes.POST_START): return postStart(state, action);
    case (actionTypes.POST_SUCCESS): return postSuccess(state, action);
    case (actionTypes.POST_FAIL): return postFail(state, action);
    default: return state;
  }
};

export default postReducer;