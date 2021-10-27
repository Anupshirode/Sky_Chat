import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp( {
  apiKey: "AIzaSyA-OeqsE_avtOf9D_8C18-VE1pyfVwOp2g",
  authDomain: "skychat-82806.firebaseapp.com",
  projectId: "skychat-82806",
  storageBucket: "skychat-82806.appspot.com",
  messagingSenderId: "725804923643",
  appId: "1:725804923643:web:ab09863ed87ab7f89f4e5e"
}).auth();