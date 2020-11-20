import firebase from "firebase";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyCcsTyVWGzLStcbQi9nY4_GOrxeyClPfEA",
  authDomain: "app-cumple.firebaseapp.com",
  databaseURL: "https://app-cumple.firebaseio.com",
  projectId: "app-cumple",
  storageBucket: "app-cumple.appspot.com",
  messagingSenderId: "838180199749",
  appId: "1:838180199749:web:2798ef6783919e0e78b22c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default {
  firebase,
  db
};
