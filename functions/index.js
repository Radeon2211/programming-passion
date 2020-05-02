const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

const serviceAccount = require('./programming-passion-firebase-adminsdk-wgric-ea11a220d5.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gs://programming-passion.appspot.com',
    databaseURL: 'https://programming-passion.firebaseio.com',
}, 'storage');

admin.initializeApp(functions.config().firebase, 'functions');

admin.initializeApp();

const bucket = admin.storage().bucket();

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
    await bucket.deleteFiles({
      prefix: `photos/${user.uid}`,
    });
    return batch.commit();
  } catch (error) {
    throw new functions.https.HttpsError('unknown', 'There is a problem to delete name or posts or comments under posts or photo');
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

exports.onAddAdmin = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const userValidation = await isUserAdmin(req);
      if (userValidation.error) {
        return res.status(200).send(userValidation.error);
      }
      const newAdmin = await admin.auth().getUserByEmail(req.body.email);
      await admin.auth().setCustomUserClaims(newAdmin.uid, { admin: true });
      return res.status(200).send(`${req.body.email} has been made an admin`);
    } catch (error) {
      return res.status(200).send({ error });
    }
  })
});

exports.onRemoveAdmin = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const userValidation = await isUserAdmin(req);
      if (userValidation.error) {
        return res.status(200).send(userValidation.error);
      }
      const adminToRemove = await admin.auth().getUserByEmail(req.body.email);
      await admin.auth().setCustomUserClaims(adminToRemove.uid, { admin: false });
      return res.status(200).send(`${req.body.email} is not an admin now`);
    } catch (error) {
      return res.status(200).send({ error });
    }
  })
});

const isUserAdmin = async (req) => {
  const requestedUID = req.body.userUID;
  const authToken = validateHeader(req);
  if (!authToken) {
    return { error: 'You are not an admin and even not authenticated' };
  }
  const decodedUID = await decodeAuthToken(authToken);
  const currentUser = await admin.auth().getUser(decodedUID);
  if (!currentUser.customClaims) {
    return { error: 'You are not an admin' };
  }
  if (!currentUser.customClaims.admin || decodedUID !== requestedUID) {
    return { error: 'You are not an admin' };
  }
  return { success: 'User is admin' };
};

const validateHeader = (req) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    return req.headers.authorization.split('Bearer ')[1];
  }
};

const decodeAuthToken = async (authToken) => {
  const decodedToken = await admin.auth().verifyIdToken(authToken);
  return decodedToken.uid;
};
