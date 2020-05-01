import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

var firebaseConfig = {
  apiKey: "AIzaSyAQbLCUuLuZPobLEPnWKjFUKd_owxQ1SPA",
  authDomain: "programming-passion.firebaseapp.com",
  databaseURL: "https://programming-passion.firebaseio.com",
  projectId: "programming-passion",
  storageBucket: "programming-passion.appspot.com",
  messagingSenderId: "30593414768",
  appId: "1:30593414768:web:3d8e313ed9aa2d7768e6b5",
  measurementId: "G-RGNY6VBHS1",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage().ref();

firebase.firestore().enablePersistence();

export { firebase as default, storage };