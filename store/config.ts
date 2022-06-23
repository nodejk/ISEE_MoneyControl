// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import * as firebase from "firebase/app";
import { getAuth } from "firebase/auth"; // New import
import { getFirestore } from "firebase/firestore";
import { collection } from "firebase/firestore";
import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFhj-FBK6szQMM97W3N6dXjy_il9mvHZI",
  authDomain: "moneyio-46285.firebaseapp.com",
  projectId: "moneyio-46285",
  storageBucket: "moneyio-46285.appspot.com",
  messagingSenderId: "752955149794",
  appId: "1:752955149794:web:85d89d8138bc3f73847dbb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };
