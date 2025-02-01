// Import Firebase SDK modules
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXLrmyr9gwpzlwQUjJEATDbFBNw1KxuwU",
  authDomain: "ocr-web-ff69c.firebaseapp.com",
  projectId: "ocr-web-ff69c",
  storageBucket: "ocr-web-ff69c.appspot.com",
  messagingSenderId: "148047470145",
  appId: "1:148047470145:web:dc1ce03519bfdc5849f0c0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Correctly initialize auth
const db = getFirestore(app); // Correctly initialize Firestore

// ✅ Correctly export named variables
export { auth, db };
