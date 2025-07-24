// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Replace with your actual config
const firebaseConfig = {
  apiKey: "AIzaSyDStVAdkz-ivN7JCfQvyEymiL0UyXCPzOk",
  authDomain: "amb-teens.firebaseapp.com",
  projectId: "amb-teens",
  storageBucket: "amb-teens.firebasestorage.app",
  messagingSenderId: "648871415744",
  appId: "1:648871415744:web:72406f30317c78bdab4225",
  measurementId: "G-MZFWG9MYEL"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
