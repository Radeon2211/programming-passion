import React from 'react';
import classes from './Home.module.scss';
import { Link } from 'react-router-dom';
import Button from '../../components/UI/Button/Button';

const Home = () => (
  <div className={classes.Home}>
    <h1 className={classes.Heading}>
      <span>Get smarter about programming</span>
      <span>and share the knowledge</span>
    </h1>
    <div className={classes.ButtonBox}>
      <Link to="/signup">
        <Button size="Big" fill="Filled" color="Green">Join for free</Button>
      </Link>
      <span className={classes.LoginCaption}>
        Already have an account?
        <Link to="/signin" className={classes.LoginLink}>Login</Link>
      </span>
    </div>
    <div className={classes.IncentiveBox}>
      <span className={classes.IncentiveCaption}>You can also</span>
      <Link to="/posts">
        <Button size="Small" fill="Filled" color="Green">See our latest posts</Button>
      </Link>
    </div>
  </div>
);

export default Home;