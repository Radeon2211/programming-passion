import React, { Fragment } from 'react';
import Button from '../Button/Button';
import classes from './Modal.module.scss';

const Modal = ({ headingText, captionText, isVisible, deleted, canceled }) => {
  const backdropClasses = [classes.Backdrop];
  const popupClasses = [classes.Popup];
  if (isVisible) {
    backdropClasses.push(classes.Visible);
    popupClasses.push(classes.Visible);
  }

  return (
    <Fragment>
      <div className={backdropClasses.join(' ')} onClick={canceled} id="backdrop"></div>
      <div className={popupClasses.join(' ')}>
        <h4 className={classes.Heading}>{headingText}</h4>
        <span className={classes.Caption}><span className={classes.Note}>Note:</span> {captionText}</span>
        <div className={classes.Buttons}>
          <Button size="Small" fill="Filled" color="Green" clicked={canceled}>Cancel</Button>
          <Button size="Small" fill="Filled" color="Red" clicked={deleted}>Delete</Button>
        </div>
      </div>
    </Fragment>
  );
}
export default Modal;