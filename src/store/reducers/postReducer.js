import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  loading: false,
  error: null,
  canWriteComment: true,
  canWritePost: true,
  autoRedirectPath: '/',
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

const switchCanWritePost = (state, action) => {
  return updateObject(state, { loading: false, canWritePost: action.canWritePost });
};

const switchCanWriteComment = (state, action) => {
  return updateObject(state, { loading: false, canWriteComment: action.canWriteComment });
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case (actionTypes.POST_START): return postStart(state, action);
    case (actionTypes.POST_SUCCESS): return postSuccess(state, action);
    case (actionTypes.POST_FAIL): return postFail(state, action);
    case (actionTypes.SWITCH_CAN_WRITE_POST): return switchCanWritePost(state, action);
    case (actionTypes.SWITCH_CAN_WRITE_COMMENT): return switchCanWriteComment(state, action);
    default: return state;
  }
};

export default postReducer;