const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.onUserDelete = functions.auth.user().onDelete(async (user) => {
  try {
    return await admin.firestore().collection('users').doc(user.uid).delete();
  } catch (err) {
    throw new functions.https.HttpsError('unknown', 'There is a problem to delete your name and posts from database');
  }
});