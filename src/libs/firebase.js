import firebase from "firebase";
require("firebase/firestore");

var firebaseConfig = {
  apiKey: "AIzaSyBmeqajxK3mEgmOqfkNRi9wNRcLLKT8d2Y",
  authDomain: "to50-3cf9e.firebaseapp.com",
  databaseURL: "https://to50-3cf9e.firebaseio.com",
  projectId: "to50-3cf9e",
  storageBucket: "to50-3cf9e.appspot.com",
  messagingSenderId: "234857612156",
  appId: "1:234857612156:web:8badd774a6b9850f8bdaf9",
  measurementId: "G-D65NCPT2W1",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();

export { firebase, db };
