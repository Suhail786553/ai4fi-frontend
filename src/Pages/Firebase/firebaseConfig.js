import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXLrmyr9gwpzlwQUjJEATDbFBNw1KxuwU",
  authDomain: "ocr-web-ff69c.firebaseapp.com",
  projectId: "ocr-web-ff69c",
  storageBucket: "ocr-web-ff69c.firebasestorage.app",
  messagingSenderId: "148047470145",
  appId: "1:148047470145:web:dc1ce03519bfdc5849f0c0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase modules
export const auth = getAuth(app);