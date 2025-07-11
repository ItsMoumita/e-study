// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4_9-mNlvXb7ceDIh2VzQQF_SIBKh8SE0",
  authDomain: "e-study-efba6.firebaseapp.com",
  projectId: "e-study-efba6",
  storageBucket: "e-study-efba6.firebasestorage.app",
  messagingSenderId: "592990356355",
  appId: "1:592990356355:web:b24f539764bc9b7e346cb6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);