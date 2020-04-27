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
    throw new functions.https.HttpsError('unknown', 'There is a problem to delete name or posts or comments under posts');
  }
});

exports.onCreatePost = functions.firestore.document('posts/{postID}').onCreate(async (doc, context) => {
  try {
    return await admin.firestore().collection('posts').doc(context.params.postID).update({
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  } catch (error) {
    throw new functions.https.HttpsError('unknown', `There is a problem to update post's creation time`);
  }
});

exports.onDeletePost = functions.firestore.document('posts/{postID}').onDelete(async (doc, context) => {
  try {
    const batch = admin.firestore().batch();
    const commentsToDelete = await admin.firestore().collection('comments').where('postID', '==', context.params.postID).get();
    commentsToDelete.docs.forEach(({ ref }) => batch.delete(ref));
    return batch.commit();
  } catch (error) {
    throw new functions.https.HttpsError('unknown', `There is a problem to delete post's comments`);
  }
});

exports.onAddComment = functions.firestore.document('comments/{commentID}').onCreate(async (doc, context) => {
  try {
    await admin.firestore().collection('posts').doc(doc.data().postID).update({
      commentsCount: admin.firestore.FieldValue.increment(1),
    });
    return await admin.firestore().collection('comments').doc(context.params.commentID).update({
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  } catch (error) {
    throw new functions.https.HttpsError('unknown', `There is a problem to increment post's comment count or update your comment's creation time`);
  }
});

exports.onDeleteComment = functions.firestore.document('comments/{commentID}').onDelete(async (doc) => {
  try {
    const post = await admin.firestore().collection('posts').doc(doc.data().postID).get();
    if (post.exists) {
      return await post.ref.update({
        commentsCount: admin.firestore.FieldValue.increment(-1),
      });
    } else {
      return null;
    }
  } catch (error) {
    throw new functions.https.HttpsError('unknown', `There is a problem to decrement post's comment count`);
  }
});

exports.onUpdateLikedPosts = functions.firestore.document('users/{userID}/likedPosts/{likedPostsId}').onUpdate(async (change) => {
  try {
    const beforePosts = change.before.data().likedPosts;
    const afterPosts = change.after.data().likedPosts;
    const addedPostID = afterPosts.find((postID) => !beforePosts.includes(postID));
    const deletedPostID = beforePosts.find((postID) => !afterPosts.includes(postID));
    await admin.firestore().collection('posts').doc(addedPostID || deletedPostID).update({
      likesCount: admin.firestore.FieldValue.increment(addedPostID ? 1 : -1),
    });
  } catch (error) {
    throw new functions.https.HttpsError('unknown', `There is a problem to update post's likes count`);
  }
});