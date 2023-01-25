import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC46glXUz0pd0OhjRjk3sStbRplral2XcM',
  databaseURL: 'https://testproject-eb717.firebaseio.com',
  storageBucket: "testproject-eb717.appspot.com",
  projectId: 'testproject-eb717',
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export {db, auth};
