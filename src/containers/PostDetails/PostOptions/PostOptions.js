import React from 'react';
import { Link } from 'react-router-dom';
import * as SC from './PostOptions.sc';
import RenderIfIsAdmin from '../../../components/RenderIfsAdmin/RenderIfIsAdmin';
import Line from '../../../components/UI/Line/Line';
import sprite from '../../../images/sprite.svg';

const PostOptions = (props) => {
  const { editable, postID, deleteStarted } = props;

  let postOptions = (
    <RenderIfIsAdmin>
      <SC.Wrapper>
        <Line type="begin" size="2" />
        <div className="post-options-icons">
          <svg className="delete-post-icon" onClick={deleteStarted}>
            <use href={`${sprite}#icon-bin`} />
          </svg>
        </div>
      </SC.Wrapper>
    </RenderIfIsAdmin>
  );
  if (editable) {
    postOptions = (
      <SC.Wrapper>
        <Line type="begin" size="2" />
        <div className="post-options-icons">
          <Link to={`/edit-post/${postID}`}>
            <svg className="edit-post-icon">
              <use href={`${sprite}#icon-pencil`} />
            </svg>
          </Link>
          <svg className="delete-post-icon" onClick={deleteStarted}>
            <use href={`${sprite}#icon-bin`} />
          </svg>
        </div>
      </SC.Wrapper>
    );
  }

  return postOptions;
};

export default PostOptions;
