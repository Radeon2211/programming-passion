import React, { useState, useEffect, useCallback } from 'react';
import classes from './ChangePhoto.module.scss';
import Form from '../../components/UI/Form/Form';
import { isValidFileType, calculateFileSize, isValidFileSize } from '../../shared/utility';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions/indexActions';
import Button from '../../components/UI/Button/Button';

const ChangePhoto = (props) => {
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoName, setPhotoName] = useState(null);
  const [photoSize, setPhotoSize] = useState(null);
  const [error, setError] = useState(null);

  const currentPhotoURL = useSelector((state) => state.firebase.profile.photoURL);

  const dispatch = useDispatch();
  const onDeleteError = useCallback(() => dispatch(actions.deleteError()), [dispatch]);
  const onChangePhoto = (data, history) => dispatch(actions.changePhoto(data, history));
  const onDeletePhoto = (currentPhotoURL, history) => dispatch(actions.deletePhoto(currentPhotoURL, history));

  useEffect(() => {
    onDeleteError();
  }, [onDeleteError]);

  const inputChangedHandler = async (e) => {
    const files = e.target.files;
    if (!files.length > 0) {
      setPhoto(null);
      setPhotoPreview(null);
      setPhotoName(null);
      setPhotoSize(null);
      return;
    }

    const file = files[0];
    let fileName = file.name;
    if (fileName.length > 25) {
      fileName = `${fileName.slice(0, 20)}...${file.type.split('/')[1]}`;
    }
    setPhotoName(fileName);
    setPhotoSize(calculateFileSize(file.size));

    if (!isValidFileType(file.type)) {
      setPhoto(null);
      setPhotoPreview(null);
      setError('File extension is not valid');
      return;
    } else {
      setError(null);
    }

    if (!isValidFileSize(file.size)) {
      setError('Maximum available size is 1MB');
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPhoto(file);
      setPhotoPreview(reader.result);
    };
  };

  const formSubmittedHandler = (e) => {
    e.preventDefault();
    if (!photo) return;
    if (!isValidFileType(photo.type) || !isValidFileSize(photo.size)) return;
    onChangePhoto(photo, props.history);
  };

  let preview = <div className={classes.Preview}>No file currently selected for upload. Max size is 1MB.</div>;
  let errorEl = null;
  let photoEl = null;
  let deletePhotoButton = null;

  if (error) {
    errorEl = <span className={classes.Error}>{error}</span>;
  }

  if (photoPreview) {
    photoEl = (
      <div className={classes.PhotoBox}>
        <img src={photoPreview} alt="Preview" className={classes.Photo} />
      </div>
    )
  }

  if (photo || error) {
    preview = (
      <div className={classes.Preview}>
        <div className={classes.FileData}>
          <span className={classes.FileDataRow}>
            <span className={classes.FileDataCaption}>Name:</span> {photoName}
          </span>
          <span className={classes.FileDataRow}>
            <span className={classes.FileDataCaption}>Size:</span> {photoSize}
          </span>
        </div>
        {photoEl}
      </div>
    );
  }

  if (currentPhotoURL) {
    deletePhotoButton = (
      <Button
        size="Small"
        fill="Empty"
        color="Red"
        type="button"
        clicked={onDeletePhoto.bind(this, currentPhotoURL, props.history)}
      >
        Delete your photo
      </Button>
    );
  }

  return (
    <div className={classes.ChangePhoto}>
      <Form
        headingText="Change Photo"
        btnText="Change"
        isValid={photo && !error}
        submitted={formSubmittedHandler}
      >
        <div className={classes.Content}>
          <label htmlFor="photo" className={classes.Label}>
            <Button size="Small" fill="Empty" color="Green" type="button">Choose photo</Button>
          </label>
          {preview}
          {errorEl}
          <input
            type="file"
            id="photo"
            className={classes.Input}
            onChange={inputChangedHandler}
          />
        </div>
      </Form>
      {deletePhotoButton}
    </div>
  );
};

export default ChangePhoto;