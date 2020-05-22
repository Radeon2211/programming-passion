import React from 'react';
import classes from './Home.module.scss';
import { Link } from 'react-router-dom';
import * as actions from '../../store/actions/indexActions';
import { useDispatch } from 'react-redux';
import Button from '../../components/UI/Button/Button';
import Heading from '../../components/UI/Heading/Heading';

const Home = () => {
  const dispatch = useDispatch();
  const onSetAutoRedirectPath = (path) => dispatch(actions.setAutoRedirectPath(path));

  return (
    <div className={classes.Home}>
      <Heading variant="H1" align="Center">
        <span>Get smarter about programming</span>
        <span>and share the knowledge</span>
      </Heading>
      <div className={classes.ButtonBox}>
        <Link to="/signup" onClick={onSetAutoRedirectPath.bind(this, '/')}>
          <Button size="Big" fill="Filled" color="Green">Join for free</Button>
        </Link>
        <span className={classes.LoginCaption}>
          Already have an account?
          <Link
            to="/signin"
            className={classes.LoginLink}
            onClick={onSetAutoRedirectPath.bind(this, '/')}>Login</Link>
        </span>
      </div>
      <div className={classes.IncentiveBox}>
        <span className={classes.IncentiveCaption}>You can also</span>
        <Link to="/posts" onClick={onSetAutoRedirectPath.bind(this, '/')}>
          <Button size="Small" fill="Filled" color="Green">See our latest posts</Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;