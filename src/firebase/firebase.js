import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyABSCAFULJFCfEOjgJt0YG-lXbAdruRxIw",
  authDomain: "react-app-2ce1f.firebaseapp.com",
  databaseURL: "https://react-app-2ce1f-default-rtdb.firebaseio.com",
  projectId: "react-app-2ce1f",
  storageBucket: "react-app-2ce1f.appspot.com",
  messagingSenderId: "674356346845",
  appId: "1:674356346845:web:15cb640bb7585a52064034",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
