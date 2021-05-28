import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyDTCLoxOYCQbx7MYjUjAuxFlHmofT2pOfg",
  authDomain: "lawfirm-b016c.firebaseapp.com",
  projectId: "lawfirm-b016c",
  storageBucket: "lawfirm-b016c.appspot.com",
  messagingSenderId: "431758515339",
  appId: "1:431758515339:web:17fb0d9423aa4253a9088e",
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

export { firebase, FieldValue };
