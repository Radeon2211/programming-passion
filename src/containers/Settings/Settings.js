import React from 'react';
import classes from './Settings.module.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../store/actions/indexActions';
import Button from '../../components/UI/Button/Button';
import UserPhoto from '../../images/no-user.jpg';
import Line from '../../components/UI/Line/Line';
import Loader from '../../components/UI/Loader/Loader';

const Settings = ({ success, firstName, lastName, photoURL, onDeleteSuccess }) => {
  let name = <Loader size="Mini" />;
  if (firstName && lastName) {
    name = `${firstName} ${lastName}`;
  }

  if (success) {
    setTimeout(onDeleteSuccess, 5000);
  }

  return (
    <div className={classes.Settings}>
      <div className={classes.User}>
        <Link to="/change-photo">
          <img src={photoURL || UserPhoto} alt="You" className={classes.UserPhoto} />
        </Link>
        <Link to="/change-name" className={classes.UserName}>{name}</Link>
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
  photoURL: state.firebase.auth.photoURL,
});

const mapDispatchToProps = (dispatch) => ({
  onDeleteSuccess: () => dispatch(actions.deleteSuccess()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);