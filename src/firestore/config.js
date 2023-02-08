// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from 'firebase/database'
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAA-Fde-gpKjb41Jiqj-Zr6GGYWKOOHUWc",
  authDomain: "librarynew-854bd.firebaseapp.com",
  projectId: "librarynew-854bd",
  storageBucket: "librarynew-854bd.appspot.com",
  messagingSenderId: "671201317094",
  appId: "1:671201317094:web:51c31aaf32c70d00e6eb27",
  measurementId: "G-56ZKM9BCDK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getDatabase(app)