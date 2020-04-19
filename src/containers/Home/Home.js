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
        <Button
          size="Big"
          fill="Filled"
        >
          Join for free
        </Button>
      </Link>
      <span className={classes.LoginCaption}>
        Already have an account?
        <Link to="/signin" className={classes.LoginLink}>Login</Link>
      </span>
    </div>
  </div>
);

export default Home;