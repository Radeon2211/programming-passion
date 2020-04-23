import React, { Fragment } from 'react';
import classes from './Settings.module.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../store/actions/indexActions';
import Button from '../../components/UI/Button/Button';
import UserPhoto from '../../images/no-user.jpg';
import Line from '../../components/UI/Line/Line';
import Loader from '../../components/UI/Loader/Loader';

const Settings = ({ success, firstName, lastName, email, photoURL, onDeleteSuccess }) => {
  let userCreds = <Loader size="Small" />;
  if (firstName && lastName && email) {
    userCreds = (
      <Fragment>
        <Link to="/change-name" className={classes.UserLink}>{`${firstName} ${lastName}`}</Link>
        <Link to="/change-email" className={classes.UserLink}>{email}</Link>
      </Fragment>
    );
  }

  if (success) {
    setTimeout(onDeleteSuccess, 5000);
  }

  return (
    <div className={classes.Settings}>
      <div className={classes.User}>
        <Link to="/change-photo" className={classes.UserPhotoLink}>
          <img src={photoURL || UserPhoto} alt="You" className={classes.UserPhoto} />
        </Link>
        {userCreds}
      </div>
      <Line type="Middle" />
      <h3 className={classes.Heading}>What would you like to do?</h3>
      <div className={classes.Buttons}>
        <Link to={`/change-name`} className={classes.ButtonLink}>
          <Button size="Small" fill="Empty">Change name</Button>
        </Link>
        <Link to="/change-email" className={classes.ButtonLink}>
          <Button size="Small" fill="Empty">Change email</Button>
        </Link>
        <Link to="/change-password" className={classes.ButtonLink}>
          <Button size="Small" fill="Empty">Change password</Button>
        </Link>
        <Link to="/change-photo" className={classes.ButtonLink}>
          <Button size="Small" fill="Empty">Change photo</Button>
        </Link>
        <Link to="/delete-account" className={classes.ButtonLink}>
          <Button size="Small" fill="Empty">Delete account</Button>
        </Link>
      </div>
      <span className={classes.Success}>{success}</span>
    </div>
  );
};

const mapStateToProps = (state) => ({
  success: state.auth.success,
  firstName: state.firebase.profile.firstName,
  lastName: state.firebase.profile.lastName,
  email: state.firebase.auth.email,
  photoURL: state.firebase.profile.photoURL,
});

const mapDispatchToProps = (dispatch) => ({
  onDeleteSuccess: () => dispatch(actions.deleteSuccess()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);