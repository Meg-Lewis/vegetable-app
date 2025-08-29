// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmdtnuNna9B7O-y74DkzfAdS5eLrtsnG0",
  authDomain: "vegable-9cf09.firebaseapp.com",
  projectId: "vegable-9cf09",
  storageBucket: "vegable-9cf09.firebasestorage.app",
  messagingSenderId: "365062306982",
  appId: "1:365062306982:web:ff5725cf5f917072678867",
  measurementId: "G-8TPEWVLNF5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);