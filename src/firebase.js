import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyCh8XSnsE8m81H8fY5fcFUKsWnlsKTn2js",
  authDomain: "react-firebase-first-fli-82e0d.firebaseapp.com",
  projectId: "react-firebase-first-fli-82e0d",
  storageBucket: "react-firebase-first-fli-82e0d.appspot.com",
  messagingSenderId: "239269595104",
  appId: "1:239269595104:web:aa535d5635a22afa2a0d85",
  measurementId: "G-BQLPFQ9J68",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const auth = firebase.auth();

export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();

// firebase.analytics();
// just to playaround with it
window.firebase = firebase;

export default firebase;
