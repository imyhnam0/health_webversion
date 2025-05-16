// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfJbLDJTCzbP155rUcHu5WCVzP27sZaiY",
  authDomain: "summer-eebb6.firebaseapp.com",
  projectId: "summer-eebb6",
  storageBucket: "summer-eebb6.appspot.com",
  messagingSenderId: "697245684494",
  appId: "1:697245684494:web:92ea4bd106aadbd98bbd5f",
  measurementId: "G-50RWGH3FCE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);