import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions/indexActions';

const SignOut = (props) => {
  const { history } = props;

  const dispatch = useDispatch();
  const onSignOut = useCallback(() => dispatch(actions.signOut()), [dispatch]);

  useEffect(() => {
    onSignOut();
    history.goBack();
  }, [onSignOut, history]);

  return <></>;
};

export default SignOut;
