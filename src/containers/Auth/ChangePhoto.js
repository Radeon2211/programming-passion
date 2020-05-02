import React, { Component } from 'react';
import classes from './ChangePhoto.module.scss';
import Form from '../../components/UI/Form/Form';
import { isValidFileType, calculateFileSize, isValidFileSize } from '../../shared/utility';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/indexActions';
import Button from '../../components/UI/Button/Button';

class ChangePhoto extends Component {
  state = {
    photo: null,
    photoPreview: null,
    photoName: null,
    photoSize: null,
    error: null,
  };

  componentDidMount() {
    this.props.onDeleteError();
  }

  inputChangedHandler = async (e) => {
    const files = e.target.files;
    if (!files.length > 0) {
      await this.setState({
        photo: null,
        photoPreview: null,
        photoName: null,
        photoSize: null,
      });
      return;
    }

    const file = files[0];
    let fileName = file.name;
    if (fileName.length > 25) {
      fileName = `${fileName.slice(0, 20)}...${file.type.split('/')[1]}`;
    }
    await this.setState({
      photoName: fileName,
      photoSize: calculateFileSize(file.size),
    });

    if (!isValidFileType(file.type)) {
      await this.setState({
        photo: null,
        photoPreview: null,
        error: 'File extension is not valid',
      });
      return;
    } else {
      await this.setState({
        error: null,
      });
    }

    if (!isValidFileSize(file.size)) {
      await this.setState({
        error: 'Maximum available size is 1MB',
      });
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.setState({
        photo: file,
        photoPreview: reader.result,
      });
    };
  };

  formSubmittedHandler = (e) => {
    e.preventDefault();
    if (!this.state.photo) return;
    if (!isValidFileType(this.state.photo.type) || !isValidFileSize(this.state.photo.size)) return;
    this.props.onChangePhoto(this.state.photo, this.props.history);
  };

  render () {
    let preview = <div className={classes.Preview}>No file currently selected for upload. Max size is 1MB.</div>;
    let error = null;
    let photo = null;

    if (this.state.error) {
      error = <span className={classes.Error}>{this.state.error}</span>;
    }

    if (this.state.photoPreview) {
      photo = (
        <div className={classes.PhotoBox}>
          <img src={this.state.photoPreview} alt="Preview" className={classes.Photo} />
        </div>
      )
    }

    if (this.state.photo || this.state.error) {
      preview = (
        <div className={classes.Preview}>
          <div className={classes.FileData}>
            <span className={classes.FileDataRow}>
              <span className={classes.FileDataCaption}>Name:</span> {this.state.photoName}
            </span>
            <span className={classes.FileDataRow}>
              <span className={classes.FileDataCaption}>Size:</span> {this.state.photoSize}
            </span>
          </div>
          {photo}
        </div>
      );
    }

    return (
      <div className={classes.ChangePhoto}>
        <Form
          headingText="Change Photo"
          btnText="Change"
          isValid={this.state.photo && !this.state.error}
          submitted={this.formSubmittedHandler}
        >
          <div className={classes.Content}>
            <label htmlFor="photo" className={classes.Label}>
              <Button size="Small" fill="Empty" color="Green" type="button">Choose photo</Button>
            </label>
            {preview}
            {error}
            <input
              type="file"
              id="photo"
              className={classes.Input}
              onChange={this.inputChangedHandler}
            />
          </div>
        </Form>
        <Button
          size="Small"
          fill="Empty"
          color="Red"
          type="button"
          clicked={this.props.onDeletePhoto.bind(this, this.props.history)}
        >
          Delete your photo
        </Button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onChangePhoto: (data, history) => dispatch(actions.changePhoto(data, history)),
  onDeletePhoto: (history) => dispatch(actions.deletePhoto(history)),
  onDeleteError: () => dispatch(actions.deleteError()),
});

export default connect(null, mapDispatchToProps)(ChangePhoto);