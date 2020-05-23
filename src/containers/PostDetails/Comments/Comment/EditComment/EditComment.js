import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Form from '../../../../../components/UI/Form/Form';
import Input from '../../../../../components/UI/Input/Input';
import * as actions from '../../../../../store/actions/indexActions';

const validationSchema = Yup.object({
  content: Yup.string().max(500).trim().required(),
});

const EditComment = (props) => {
  const { currentContent, commentID, cancelled } = props;

  const canEditComment = useSelector((state) => state.post.canWriteComment);

  const dispatch = useDispatch();
  const onEditComment = (content, commentIDProp, canEditCommentProp, closed) =>
    dispatch(actions.editComment(content, commentIDProp, canEditCommentProp, closed));
  const onDeleteError = useCallback(() => dispatch(actions.deleteError()), [dispatch]);

  useEffect(() => {
    onDeleteError();
  }, [onDeleteError]);

  return (
    <Formik
      initialValues={{
        content: currentContent,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onEditComment(values.content, commentID, canEditComment, cancelled);
      }}
    >
      {({ errors, touched, isValid, dirty, setFieldTouched }) => {
        return (
          <Form btnText="Edit" isValid={isValid && dirty} isPostForm cancelled={cancelled}>
            <Input
              kind="textarea"
              config={{
                name: 'content',
                id: 'content',
                placeholder: 'What do you think about this post...',
                onInput: setFieldTouched.bind(this, 'content', true, true),
              }}
              label="Content"
              isValid={!errors.content}
              isTouched={touched.content}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default EditComment;
