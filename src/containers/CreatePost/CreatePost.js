import React, { useEffect, useCallback } from 'react';
import Form from '../../components/UI/Form/Form';
import Input from '../../components/UI/Input/Input';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions/indexActions';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  title: Yup.string().max(200).trim().required(),
  content: Yup.string().max(1200).trim().required(),
});

const CreatePost = (props) => {
  const canWritePost = useSelector((state) => state.post.canWritePost);

  const dispatch = useDispatch();
  const onDeleteError = useCallback(() => dispatch(actions.deleteError()), [dispatch]);
  const onCreatePost = (data, history, canWritePost) => dispatch(actions.createPost(data, history, canWritePost));

  useEffect(() => {
    onDeleteError();
  }, [onDeleteError]);

  return (
    <Formik
      initialValues={{
        title: '',
        content: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onCreatePost(values, props.history, canWritePost);
      }}
    >
      {({ errors, touched, isValid, dirty, setFieldTouched }) => {
        return (
          <Form
            headingText="Create Post"
            btnText="Create"
            isValid={isValid && dirty}
            isPostForm
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
};

export default CreatePost;