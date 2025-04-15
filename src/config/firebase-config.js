// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtV_5nHxEOJBZzFlMcTcTNm2kBHZG0qWk",
  authDomain: "notes-and-quotes-205f7.firebaseapp.com",
  projectId: "notes-and-quotes-205f7",
  storageBucket: "notes-and-quotes-205f7.firebasestorage.app",
  messagingSenderId: "350017549639",
  appId: "1:350017549639:web:08dc457108cc7c19cb8862",
  measurementId: "G-GDK7K0N2G9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);