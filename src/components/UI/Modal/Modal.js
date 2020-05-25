import React from 'react';
import * as SC from './Modal.sc';
import Button from '../Button/Button';
import Heading from '../Heading/Heading';

const Modal = (props) => {
  const { headingText, captionText, isVisible, deleted, canceled } = props;

  return (
    <>
      <SC.Backdrop
        visible={isVisible}
        onClick={canceled}
        onKeyDown={canceled}
        tabIndex="0"
        role="button"
        aria-label="Close modal"
      />
      <SC.Popup visible={isVisible}>
        <Heading variant="h4" color="black">
          {headingText}
        </Heading>
        <span className="caption">
          <span className="note">Note: </span>
          {captionText}
        </span>
        <div className="buttons">
          <Button size="small" fill="filled" color="green" clicked={canceled}>
            Cancel
          </Button>
          <Button size="small" fill="filled" color="red" clicked={deleted}>
            Delete
          </Button>
        </div>
      </SC.Popup>
    </>
  );
};
export default Modal;
