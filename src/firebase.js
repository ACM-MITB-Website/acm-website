import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAejD9rf4wNSxfp2NSH6KfHVHdxmf6cSp8",
  authDomain: "acm-web-a6457.firebaseapp.com",
  projectId: "acm-web-a6457",
  storageBucket: "acm-web-a6457.firebasestorage.app",
  messagingSenderId: "409440610402",
  appId: "1:409440610402:web:2068ec918d0905c320c93b",
  measurementId: "G-2ZJF01Y7KJ"
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
