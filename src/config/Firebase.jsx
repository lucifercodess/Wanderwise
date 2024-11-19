// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDBovb1OJsOxYc6XOk9ow3XaXsItVek0Co",
  authDomain: "aitravel-a766d.firebaseapp.com",
  projectId: "aitravel-a766d",
  storageBucket: "aitravel-a766d.firebasestorage.app",
  messagingSenderId: "853617929835",
  appId: "1:853617929835:web:c18f6ff766f1a3c0254b2e",
  measurementId: "G-ZHTTMME6ZQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
