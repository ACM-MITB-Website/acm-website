import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};


let app;
let auth;
let googleProvider;
let db;
let analytics;
let storage;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();
  db = getFirestore(app);
  analytics = getAnalytics(app);
  storage = getStorage(app);

} catch (error) {
  console.error("Firebase initialization failed:", error);
  // Fallback to prevent app crash on White Screen
  auth = {
    currentUser: null,
    onAuthStateChanged: (cb) => { cb(null); return () => { }; },
    signInWithPopup: () => Promise.reject("Firebase not initialized"),
    signOut: () => Promise.resolve()
  };
  googleProvider = {};
  db = {};
  analytics = null;
}

export { auth, googleProvider, db, analytics, storage };
