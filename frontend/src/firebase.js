// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtMM87zBMk8oQl1YHRgMslLGchvQ0cFms",
  authDomain: "linggo-a057a.firebaseapp.com",
  projectId: "linggo-a057a",
  storageBucket: "linggo-a057a.firebasestorage.app",
  messagingSenderId: "627768700367",
  appId: "1:627768700367:web:674c804bf756aac88836ba",
  measurementId: "G-BGNPTEMRPC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
