import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import * as actions from '../../../store/actions/indexActions';
import Button from '../../UI/Button/Button';

const SC = {};
SC.Wrapper = styled.nav`
  & > *:not(:last-child) {
    margin-right: 2.4rem;
  }
`;

const SignedOutLinks = () => {
  const dispatch = useDispatch();
  const onSetAutoRedirectPath = (path) => dispatch(actions.setAutoRedirectPath(path));

  const linkClickedHandler = () => {
    onSetAutoRedirectPath(`/`);
  };

  return (
    <SC.Wrapper>
      <Link to="/signin" onClick={linkClickedHandler}>
        <Button size="small" fill="empty" color="green">
          Login
        </Button>
      </Link>
      <Link to="/signup" onClick={linkClickedHandler}>
        <Button size="small" fill="filled" color="green">
          Sign up
        </Button>
      </Link>
    </SC.Wrapper>
  );
};

export default SignedOutLinks;
