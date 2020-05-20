import React, { useEffect, useCallback, useRef } from 'react';
import Form from '../../components/UI/Form/Form';
import Input from '../../components/UI/Input/Input';
import { useSelector, useDispatch } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { actionTypes as firestoreActionTypes } from 'redux-firestore';
import * as actions from '../../store/actions/indexActions';
import Heading from '../../components/UI/Heading/Heading';
import Loader from '../../components/UI/Loader/Loader';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  title: Yup.string().max(200).trim().required(),
  content: Yup.string().max(1200).trim().required(),
});

const EditPost = (props) => {
  const oldData = useRef({
    title: null,
    content: null,
  });

  const canEditPost = useSelector((state) => state.post.canWritePost);
  const post = useSelector((state) => state.firestore.data.post === undefined ? undefined : state.firestore.data.post);

  const dispatch = useDispatch();
  const onDeleteError = useCallback(() => dispatch(actions.deleteError()), [dispatch]);
  const onEditPost = (data, postID, history, canEditPost) => dispatch(actions.editPost(data, postID, history, canEditPost));

  useEffect(() => {
    onDeleteError();
  }, [onDeleteError]);

  const updateStateValues = useCallback(() => {
    oldData.current = {
      title: post.title,
      content: post.content,
    };
  }, [post]);

  useEffect(() => {
    if (post && !oldData.current.title) {
      updateStateValues();
    }
  }, [updateStateValues, post]);

  const { dispatch: firestoreDispatch } = props;

  useEffect(() => {
    return () => {
      firestoreDispatch({
        type: firestoreActionTypes.CLEAR_DATA,
        preserve: { ordered: true, data: ['allPosts', 'comments', 'userPosts'] },
      });
    };
  }, [firestoreDispatch]);

  const editingCancelledHandler = () => {
    props.history.goBack();
  };

  let form = null;
  if (post === null) {
    form = <Heading variant="H6">This post does not exists</Heading>;
  } else if (post === undefined) {
    form = <Loader size="Small" />;
  } else {
    form = (
      <Formik
        initialValues={{
          title: post.title,
          content: post.content,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          if (values.title === oldData.current.title && values.content === oldData.current.content) {
            props.history.push(`/posts/${props.match.params.id}`);
            return;
          }
          onEditPost(values, props.match.params.id, props.history, canEditPost);
        }}
      >
        {({ errors, touched, isValid, dirty, setFieldTouched }) => {
          return (
            <Form
              headingText={`Edit Post${post ? `: ${post.title}` : ''}`}
              btnText="Edit"
              isValid={isValid && dirty}
              isPostForm
              cancelled={editingCancelledHandler}
            >
              <Input
                kind="input"
                config={{ type: 'text', name: 'title', id: 'title', placeholder: 'Post title...', autoComplete: 'off', onInput: setFieldTouched.bind(this, 'title', true, true) }}
                label="Title"
                isValid={!!!errors.title}
                isTouched={touched.title}
              />
              <Input
                kind="textarea"
                config={{ name: 'content', id: 'content', placeholder: 'Share your thoughts...', onInput: setFieldTouched.bind(this, 'content', true, true) }}
                label="Content"
                isValid={!!!errors.content}
                isTouched={touched.content}
              />
            </Form>
          );
        }}
      </Formik>
    );
  }

  return form;
};

export default firestoreConnect((state) => [
  { collection: 'posts', doc: state.match.params.id, storeAs: 'post' },
])(EditPost);