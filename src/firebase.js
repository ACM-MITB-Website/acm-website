// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// PASTE YOUR KEYS HERE
const firebaseConfig = {
    apiKey: "AIzaSyCebz1_TmT-Jf_d62K81itED2lSLjw8fLU",
  authDomain: "acm-website-dev.firebaseapp.com",
  projectId: "acm-website-dev",
  storageBucket: "acm-website-dev.firebasestorage.app",
  messagingSenderId: "228430752836",
  appId: "1:228430752836:web:97ba5da1e67964cc5de011"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();