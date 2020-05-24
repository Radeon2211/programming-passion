import React, { useState } from 'react';
import * as SC from './Comment.sc';
import AuthorData from '../../../../components/UI/AuthorData/AuthorData';
import sprite from '../../../../images/sprite.svg';
import RenderIfIsAdmin from '../../../../components/RenderIfsAdmin/RenderIfIsAdmin';
import EditComment from './EditComment/EditComment';

const Comment = (props) => {
  const [isEditingFormVisible, setIsEditingFormVisible] = useState(false);

  const {
    comment: {
      id: commentID,
      authorFirstName,
      authorLastName,
      authorPhotoURL,
      authorUID,
      createdAt,
      content,
    },
    commentHandlingData: { authUID, postAuthorUID, deleteStarted },
  } = props;

  const editingToggledHandler = () => {
    setIsEditingFormVisible((prevState) => !prevState);
  };

  const editingCancelledHandler = () => {
    setIsEditingFormVisible(false);
  };

  let editIcon = null;
  if (authUID === authorUID) {
    editIcon = (
      <svg className="edit-icon" onClick={editingToggledHandler}>
        <use href={`${sprite}#icon-pencil`} />
      </svg>
    );
  }

  let deleteIcon = null;
  if (authUID === authorUID || authUID === postAuthorUID) {
    deleteIcon = (
      <svg className="delete-icon" onClick={deleteStarted.bind(this, commentID)}>
        <use href={`${sprite}#icon-bin`} />
      </svg>
    );
  } else {
    deleteIcon = (
      <RenderIfIsAdmin>
        <svg className="delete-icon" onClick={deleteStarted.bind(this, commentID)}>
          <use href={`${sprite}#icon-bin`} />
        </svg>
      </RenderIfIsAdmin>
    );
  }

  let editCommentForm = null;
  if (isEditingFormVisible) {
    editCommentForm = (
      <EditComment
        currentContent={content}
        commentID={commentID}
        cancelled={editingCancelledHandler}
      />
    );
  }

  return (
    <SC.Wrapper>
      <div className="author-data-and-icons">
        <AuthorData
          size="small"
          firstName={authorFirstName}
          lastName={authorLastName}
          photoURL={authorPhotoURL}
          createdAt={createdAt}
        />
        <div className="icons">
          {editIcon}
          {deleteIcon}
        </div>
      </div>
      <p className="content">{content}</p>
      {editCommentForm}
    </SC.Wrapper>
  );
};

export default Comment;
