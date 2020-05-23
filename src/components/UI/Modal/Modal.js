import React from 'react';
import Button from '../Button/Button';
import classes from './Modal.module.scss';
import Heading from '../Heading/Heading';

const Modal = (props) => {
  const { headingText, captionText, isVisible, deleted, canceled } = props;

  const backdropClasses = [classes.Backdrop];
  const popupClasses = [classes.Popup];
  if (isVisible) {
    backdropClasses.push(classes.Visible);
    popupClasses.push(classes.Visible);
  }

  return (
    <>
      <div
        className={backdropClasses.join(' ')}
        onClick={canceled}
        onKeyDown={canceled}
        tabIndex="0"
        role="button"
        aria-label="Close modal"
      />
      <div className={popupClasses.join(' ')}>
        <Heading variant="H4" color="Black">
          {headingText}
        </Heading>
        <span className={classes.Caption}>
          <span className={classes.Note}>Note: </span>
          {captionText}
        </span>
        <div className={classes.Buttons}>
          <Button size="Small" fill="Filled" color="Green" clicked={canceled}>
            Cancel
          </Button>
          <Button size="Small" fill="Filled" color="Red" clicked={deleted}>
            Delete
          </Button>
        </div>
      </div>
    </>
  );
};
export default Modal;
