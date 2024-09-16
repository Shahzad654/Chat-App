// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6xhPkMC7IfpDjnHd1bMdkeeIM6ZJFKeY",
  authDomain: "auth-app-79612.firebaseapp.com",
  databaseURL: "https://auth-app-79612-default-rtdb.firebaseio.com",
  projectId: "auth-app-79612",
  storageBucket: "auth-app-79612.appspot.com",
  messagingSenderId: "861456550345",
  appId: "1:861456550345:web:d63eb9b144793b06ebc018",
  measurementId: "G-RTW6F7HTXC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {
  app,
  db,
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  auth,
};
