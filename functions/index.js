const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.onDeleteUser = functions.auth.user().onDelete(async (user) => {
  try {
    return await admin.firestore().collection('users').doc(user.uid).delete();
  } catch (err) {
    throw new functions.https.HttpsError('unknown', 'There is a problem to delete your name and posts from database');
  }
});

exports.onUpdatePost = functions.firestore.document('posts/{postID}').onCreate(async (doc, context) => {
  try {
    console.log(doc, context);
    return await admin.firestore().collection('posts').doc(context.params.postID).update({
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  } catch (err) {
    throw new functions.https.HttpsError('unknown', 'There is a problem to delete your name and posts from database');
  }
});