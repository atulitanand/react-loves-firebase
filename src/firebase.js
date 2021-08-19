import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

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
export const storage = firebase.storage();

export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();

// firebase.analytics();
// just to playaround with it
window.firebase = firebase;

export const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    return firestore.collection('users').doc(uid);
  } catch (error) {
    console.error('Error in fetching the user', error.message);
  }
}

export const createUserProfileDocument = async (user, additionalData) => {
  // if there is no user do nothing
  if (!user) return;
  // check if document exists : get a reference to the place in the database where a user profile might be
  const userRef = firestore.doc(`users/${user.uid}`);
  // go and fetch document from that location
  const snapshot = await userRef.get();
  // snapshot have  a property called snapshot
  /**
   * querySnapshot : exist
   * documentSnapshot: exists
   */
  if (!snapshot.exists) {
    const createdAt = new Date().toDateString();
    const { displayName, email, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.error('Error in creating user', error);
    };
  }
  return getUserDocument(user.uid);
}

export default firebase;
