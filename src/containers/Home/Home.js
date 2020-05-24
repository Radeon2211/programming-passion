import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as SC from './Home.sc';
import * as actions from '../../store/actions/indexActions';
import Button from '../../components/UI/Button/Button';
import Heading from '../../components/UI/Heading/Heading';

const Home = () => {
  const dispatch = useDispatch();
  const onSetAutoRedirectPath = (path) => dispatch(actions.setAutoRedirectPath(path));

  const linkClickedHandler = () => {
    onSetAutoRedirectPath('/');
  };

  return (
    <SC.Wrapper>
      <Heading variant="H1" align="Center">
        <span>Get smarter about programming</span>
        <span>and share the knowledge</span>
      </Heading>
      <div className="button-box">
        <Link to="/signup" onClick={linkClickedHandler}>
          <Button size="big" fill="filled" color="green">
            Join for free
          </Button>
        </Link>
        <span className="login-caption">
          Already have an account?
          <Link to="/signin" className="login-link" onClick={linkClickedHandler}>
            Login
          </Link>
        </span>
      </div>
      <div className="incentive-box">
        <span className="incentive-caption">You can also</span>
        <Link to="/posts" onClick={linkClickedHandler}>
          <Button size="small" fill="filled" color="green">
            See our latest posts
          </Button>
        </Link>
      </div>
    </SC.Wrapper>
  );
};

export default Home;
