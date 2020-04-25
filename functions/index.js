const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.onDeleteUser = functions.auth.user().onDelete(async (user) => {
  try {
    const batch = admin.firestore().batch();
    const postsToDelete = await admin.firestore().collection('posts').where('authorUID', '==', user.uid).get();
    postsToDelete.docs.forEach(({ ref }) => batch.delete(ref));
    const commentsToUpdate = await admin.firestore().collection('comments').where('authorUID', '==', user.uid).get();
    commentsToUpdate.forEach(({ ref }) => batch.update(ref, {
      authorFirstName: 'Account has been deleted',
      authorLastName: '',
      authorPhotoURL: '',
      authorUID: null,
    }));
    await admin.firestore().collection('users').doc(user.uid).delete();
    await admin.firestore().collection('users').doc(user.uid).collection('likedPosts').doc('likedPosts').delete();
    return batch.commit();
  } catch (error) {
    throw new functions.https.HttpsError('unknown', 'There is a problem to delete your name or your posts or comments under your posts');
  }
});

exports.onCreatePost = functions.firestore.document('posts/{postID}').onCreate(async (doc, context) => {
  try {
    return await admin.firestore().collection('posts').doc(context.params.postID).update({
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  } catch (error) {
    throw new functions.https.HttpsError('unknown', `There is a problem to update your post's creation time`);
  }
});

exports.onDeletePost = functions.firestore.document('posts/{postID}').onDelete(async (doc, context) => {
  try {
    const batch = admin.firestore().batch();
    const commentsToDelete = await admin.firestore().collection('comments').where('postID', '==', context.params.postID).get();
    commentsToDelete.docs.forEach(({ ref }) => batch.delete(ref));
    return batch.commit();
  } catch (error) {
    throw new functions.https.HttpsError('unknown', `There is a problem to your post's commetns`);
  }
});

exports.onAddComment = functions.firestore.document('comments/{commentID}').onCreate(async (doc, context) => {
  try {
    return await admin.firestore().collection('comments').doc(context.params.commentID).update({
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  } catch (error) {
    throw new functions.https.HttpsError('unknown', `There is a problem to update your comment's creation time`);
  }
});