import firebase from "firebase";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASB1G-ptiAflJ0tf1ts7zSpP79hk5s-sY",
  authDomain: "lemonsocialmedia-5f835.firebaseapp.com",
  projectId: "lemonsocialmedia-5f835",
  storageBucket: "lemonsocialmedia-5f835.appspot.com",
  messagingSenderId: "556896670463",
  appId: "1:556896670463:web:205ce9d667fa1b8161f2ca",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
