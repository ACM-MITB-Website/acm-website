// src/components/AuthButton.jsx (Final Styled Code)
import React, { useState, useEffect } from 'react';
import { auth, googleProvider } from '../firebase'; 
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

function AuthButton() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try { await signInWithPopup(auth, googleProvider); } catch (error) { console.error("Login Failed:", error.message); }
  };

  const handleLogout = async () => {
    try { await signOut(auth); } catch (error) { console.error("Logout Failed:", error.message); }
  };

  if (loading) { return <div className="text-white text-sm">Checking status...</div>; }

  return (
    <div className="flex items-center justify-center p-4">
      {user ? (
        // IF LOGGED IN (Final Styled View)
        <div className="flex items-center space-x-3 bg-gray-800 p-2 rounded-lg shadow-md">
          <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full border border-blue-400" />
          <span className="text-white text-sm font-medium hidden sm:inline">Hello, {user.displayName.split(' ')[0]}</span>
          <button onClick={handleLogout} className="px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded-md hover:bg-red-700 transition duration-200">Logout</button>
        </div>
      ) : (
        // IF LOGGED OUT (Final Styled Button)
        <button onClick={handleLogin} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-200">
          Sign in with Google
        </button>
      )}
    </div>
  );
}
export default AuthButton;