import React, { Component } from 'react';
import classes from './Comment.module.scss';
import AuthorData from '../../../../components/UI/AuthorData/AuthorData';
import sprite from '../../../../images/sprite.svg';
import RenderIfIsAdmin from '../../../../components/RenderIfsAdmin/RenderIfIsAdmin';
import EditComment from './EditComment/EditComment';

class Comment extends Component {
  state = {
    isEditingFormVisible: false,
  };

  editingToggledHandler = () => {
    this.setState((prevState) => ({
      isEditingFormVisible: !prevState.isEditingFormVisible,
    }));
  };

  editingCancelledHandler = () => {
    this.setState({ isEditingFormVisible: false });
  };

  render () {
    const { comment: { id: commentID, authorFirstName, authorLastName, authorPhotoURL, authorUID, createdAt, content },
      commentHandlingData: { authUID, postAuthorUID, deleteStarted } } = this.props;

    let editIcon = null;
    if (authUID === authorUID) {
        editIcon = (
          <svg className={classes.EditIcon} onClick={this.editingToggledHandler}>
          <use href={`${sprite}#icon-pencil`}></use>
        </svg>
      );
    }

    let deleteIcon = null;
    if (authUID === authorUID || authUID === postAuthorUID) {
      deleteIcon = (
        <svg className={classes.DeleteIcon} onClick={deleteStarted.bind(this, commentID)}>
          <use href={`${sprite}#icon-bin`}></use>
        </svg>
      );
    } else {
      deleteIcon = (
        <RenderIfIsAdmin>
          <svg className={classes.DeleteIcon} onClick={deleteStarted.bind(this, commentID)}>
            <use href={`${sprite}#icon-bin`}></use>
          </svg>
        </RenderIfIsAdmin>
      );
    }

    let editCommentForm = null;
    if (this.state.isEditingFormVisible) {
      editCommentForm = (
        <EditComment
          currentContent={content}
          commentID={commentID}
          cancelled={this.editingCancelledHandler}
        />
      )
    }

    return (
      <div className={classes.Comment}>
        <div className={classes.AuthorDataAndIcons}>
          <AuthorData
            size="Small"
            firstName={authorFirstName}
            lastName={authorLastName}
            photoURL={authorPhotoURL}
            createdAt={createdAt}
          />
          <div className={classes.Icons}>
            {editIcon}
            {deleteIcon}
          </div>
        </div>
        <p className={classes.Content}>{content}</p>
        {editCommentForm}
      </div>
    );
  }
}

export default Comment;