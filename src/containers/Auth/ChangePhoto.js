import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as SC from './ChangePhoto.sc';
import Form from '../../components/UI/Form/Form';
import { isValidFileType, calculateFileSize, isValidFileSize } from '../../shared/utility';
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
  const onDeletePhoto = (curPhotoURL, history) =>
    dispatch(actions.deletePhoto(curPhotoURL, history));

  useEffect(() => {
    onDeleteError();
  }, [onDeleteError]);

  const inputChangedHandler = async (e) => {
    const { files } = e.target;
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
    }
    setError(null);

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

  const deletedPhotoHandler = () => {
    onDeletePhoto(currentPhotoURL, props.history);
  };

  let preview = <SC.Preview>No file currently selected for upload. Max size is 1MB.</SC.Preview>;
  let errorEl = null;
  let photoEl = null;
  let deletePhotoButton = null;

  if (error) {
    errorEl = <span className="error">{error}</span>;
  }

  if (photoPreview) {
    photoEl = (
      <div className="photo-box">
        <img src={photoPreview} alt="Preview" className="photo" />
      </div>
    );
  }

  if (photo || error) {
    preview = (
      <SC.Preview>
        <div className="file-data">
          <span className="file-data-row">
            <span className="file-data-caption">Name: </span>
            {photoName}
          </span>
          <span className="file-data-row">
            <span className="file-data-caption">Size: </span>
            {photoSize}
          </span>
        </div>
        {photoEl}
      </SC.Preview>
    );
  }

  if (currentPhotoURL) {
    deletePhotoButton = (
      <Button size="small" fill="empty" color="red" type="button" clicked={deletedPhotoHandler}>
        Delete your photo
      </Button>
    );
  }

  return (
    <SC.Wrapper>
      <Form
        headingText="Change Photo"
        btnText="Change"
        isValid={photo && !error}
        submitted={formSubmittedHandler}
      >
        <div className="content">
          {/* eslint-disable-next-line */}
          <label htmlFor="photo" className="label">
            <Button size="small" fill="empty" color="green" type="button">
              Choose photo
            </Button>
          </label>
          {preview}
          {errorEl}
          <input type="file" id="photo" className="input" onChange={inputChangedHandler} />
        </div>
      </Form>
      {deletePhotoButton}
    </SC.Wrapper>
  );
};

export default ChangePhoto;
