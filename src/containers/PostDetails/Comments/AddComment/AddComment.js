import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Form from '../../../../components/UI/Form/Form';
import Input from '../../../../components/UI/Input/Input';
import * as actions from '../../../../store/actions/indexActions';

const validationSchema = Yup.object({
  content: Yup.string().max(500).trim().required(),
});

const AddComment = (props) => {
  const { postID, postAuthorUID } = props;

  const canWriteComment = useSelector((state) => state.post.canWriteComment);

  const dispatch = useDispatch();
  const onAddComment = (content, postIDProp, postAuthorUIDProp, canWriteCommentProp, resetForm) =>
    dispatch(
      actions.addComment(content, postIDProp, postAuthorUIDProp, canWriteCommentProp, resetForm),
    );
  const onDeleteError = useCallback(() => dispatch(actions.deleteError()), [dispatch]);

  useEffect(() => {
    onDeleteError();
  }, [onDeleteError]);

  return (
    <Formik
      initialValues={{
        content: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        onAddComment(values.content, postID, postAuthorUID, canWriteComment, resetForm);
      }}
    >
      {({ errors, touched, isValid, dirty, setFieldTouched }) => {
        return (
          <Form btnText="Add" isValid={isValid && dirty} isPostForm>
            <Input
              kind="textarea"
              config={{
                name: 'content',
                id: 'content',
                placeholder: 'What do you think about this post...',
                onInput: setFieldTouched.bind(this, 'content', true, true),
              }}
              label="Add comment"
              isValid={!errors.content}
              isTouched={touched.content}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddComment;
