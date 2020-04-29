import React, { Fragment } from 'react';
import classes from './Settings.module.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../store/actions/indexActions';
import Button from '../../components/UI/Button/Button';
import UserPhoto from '../../images/no-user.jpg';
import Line from '../../components/UI/Line/Line';
import Loader from '../../components/UI/Loader/Loader';
import RenderIfIsAdmin from '../../components/RenderIfsAdmin/RenderIfIsAdmin';
import Heading from '../../components/UI/Heading/Heading';

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
      <Line type="Middle" size="Size-2" />
      <Heading variant="H6" align="Center">What would you like to do?</Heading>
      <div className={classes.Buttons}>
        <Link to={"/change-name"} className={classes.ButtonLink}>
          <Button size="Small" fill="Empty" color="Green">Change name</Button>
        </Link>
        <Link to="/change-email" className={classes.ButtonLink}>
          <Button size="Small" fill="Empty" color="Green">Change email</Button>
        </Link>
        <Link to="/change-password" className={classes.ButtonLink}>
          <Button size="Small" fill="Empty" color="Green">Change password</Button>
        </Link>
        <Link to="/change-photo" className={classes.ButtonLink}>
          <Button size="Small" fill="Empty" color="Green">Change photo</Button>
        </Link>
        <Link to="/delete-account" className={classes.ButtonLink}>
          <Button size="Small" fill="Empty" color="Red">Delete account</Button>
        </Link>
      </div>
      <Link to="/my-posts">
        <Button size="Small" fill="Filled" color="Green">View your posts</Button>
      </Link>
      <RenderIfIsAdmin>
        <div className={classes.AdminSection}>
          <Link to="/add-admin">
            <Button size="Small" fill="Filled" color="Green">Add admin</Button>
          </Link>
          <Link to="/remove-admin">
            <Button size="Small" fill="Filled" color="Red">Remove admin</Button>
          </Link>
        </div>
      </RenderIfIsAdmin>
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