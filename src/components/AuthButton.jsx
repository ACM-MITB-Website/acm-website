// src/components/AuthButton.jsx (Final Styled Code)
import React, { useState, useEffect } from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

function AuthButton({ className = "" }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogin = async () => {
    if (!auth || !auth.app) {
      alert("Authentication not configured. (Check .env keys)");
      return;
    }
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login Failed:", error.message);
      alert("Login Failed: " + error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout Failed:", error.message);
      alert("Logout Failed: " + error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) { return <div className="text-white text-sm">Checking status...</div>; }

  return (
    <div className="flex items-center justify-center">
      {user ? (
        // IF LOGGED IN (Final Styled View)
        <div className="flex items-center space-x-2 bg-gray-800 p-1 rounded-full shadow-md border border-white/10">
          <img src={user.photoURL} alt="Profile" className="w-6 h-6 rounded-full border border-blue-400" />
          <span className="text-white text-xs font-medium hidden lg:inline whitespace-nowrap">
            Hello, {user.displayName ? user.displayName.split(' ')[0] : 'User'}
          </span>
          <button onClick={handleLogout} className="px-2 py-0.5 bg-red-600/80 text-white text-[10px] uppercase font-bold rounded-full hover:bg-red-700 transition duration-200">Logout</button>
        </div>
      ) : (
        // IF LOGGED OUT (Final Styled Button)
        <button
          onClick={handleLogin}
          className={className || "px-3 py-1.5 bg-white text-black text-xs font-bold rounded-full shadow-lg hover:bg-acm-teal hover:scale-105 transition duration-200 whitespace-nowrap"}
        >
          LOGIN
        </button>
      )}
    </div>
  );
}
export default AuthButton;