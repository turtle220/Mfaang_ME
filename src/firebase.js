import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyBTgR7a4-Yzbc5v5kmp9qV3nAHNT4d5AGE',
  authDomain: 'lmypet.firebaseapp.com',
  databaseURL: 'https://mfaang-2dfeb.firebaseio.com',
  projectId: 'mfaang-2dfeb',
  storageBucket: 'mfaang-2dfeb.appspot.com',
  messagingSenderId: '188452943792',
  appId: '1:188452943792:web:7d175404f3f2bd36538875',
  measurementId: 'G-WSVGYFL1EE',
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const authProvider = firebase.auth.EmailAuthProvider;
const storage = firebase.storage();

export { authProvider, db, auth, storage };
