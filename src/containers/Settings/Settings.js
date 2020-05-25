import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as SC from './Settings.sc';
import * as actions from '../../store/actions/indexActions';
import Button from '../../components/UI/Button/Button';
import UserPhoto from '../../images/no-user.jpg';
import Line from '../../components/UI/Line/Line';
import Loader from '../../components/UI/Loader/Loader';
import RenderIfIsAdmin from '../../components/RenderIfsAdmin/RenderIfIsAdmin';
import Heading from '../../components/UI/Heading/Heading';

const Settings = () => {
  const success = useSelector((state) => state.auth.success);
  const firstName = useSelector((state) => state.firebase.profile.firstName);
  const lastName = useSelector((state) => state.firebase.profile.lastName);
  const email = useSelector((state) => state.firebase.auth.email);
  const photoURL = useSelector((state) => state.firebase.profile.photoURL);

  const dispatch = useDispatch();
  const onDeleteSuccess = () => dispatch(actions.deleteSuccess());

  let userCreds = <Loader size="small" />;
  if (firstName && lastName && email) {
    userCreds = (
      <>
        <Link to="/change-name" className="user-link">{`${firstName} ${lastName}`}</Link>
        <Link to="/change-email" className="user-link">
          {email}
        </Link>
      </>
    );
  }

  if (success) {
    setTimeout(onDeleteSuccess, 5000);
  }

  return (
    <SC.Wrapper>
      <div className="user">
        <Link to="/change-photo" className="user-photo-link">
          <img src={photoURL || UserPhoto} alt="You" className="user-photo" />
        </Link>
        {userCreds}
      </div>
      <Line type="middle" size="2" />
      <Heading variant="h6" align="Center">
        What would you like to do?
      </Heading>
      <div className="buttons">
        <Link to="/change-name" className="button-link">
          <Button size="small" fill="empty" color="green">
            Change name
          </Button>
        </Link>
        <Link to="/change-email" className="button-link">
          <Button size="small" fill="empty" color="green">
            Change email
          </Button>
        </Link>
        <Link to="/change-password" className="button-link">
          <Button size="small" fill="empty" color="green">
            Change password
          </Button>
        </Link>
        <Link to="/change-photo" className="button-link">
          <Button size="small" fill="empty" color="green">
            Change photo
          </Button>
        </Link>
        <Link to="/delete-account" className="button-link">
          <Button size="small" fill="empty" color="red">
            Delete account
          </Button>
        </Link>
      </div>
      <Link to="/my-posts">
        <Button size="small" fill="filled" color="green">
          View your posts
        </Button>
      </Link>
      <RenderIfIsAdmin>
        <div className="admin-section">
          <Link to="/add-admin">
            <Button size="small" fill="filled" color="green">
              Add admin
            </Button>
          </Link>
          <Link to="/remove-admin">
            <Button size="small" fill="filled" color="red">
              Remove admin
            </Button>
          </Link>
        </div>
      </RenderIfIsAdmin>
      <span className="success">{success}</span>
    </SC.Wrapper>
  );
};

export default Settings;
