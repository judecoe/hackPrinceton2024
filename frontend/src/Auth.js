// src/Auth.js
import React, { useState } from 'react';
import { auth } from './firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import './Auth.css';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);

  const handleAuthAction = async () => {
    if (!email.endsWith('.edu')) {
      alert('Please use a .edu email address');
      return;
    }

    try {
      if (isSignup) {
        // Sign up the user
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Send verification email
        await sendEmailVerification(user);
        alert('Sign up successful! A verification email has been sent to your email address. Please verify before logging in.');
        
        // Sign the user out after sign-up to ensure they verify first
        await auth.signOut();
      } else {
        // Log in the user
        await signInWithEmailAndPassword(auth, email, password);

        if (!auth.currentUser.emailVerified) {
          alert('Please verify your email address before logging in.');
          await auth.signOut(); // Ensure unverified users are logged out
          return;
        }
        
        alert('Login successful!');
      }
    } catch (error) {
      console.error(error);
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isSignup ? 'Sign Up' : 'Log In'}</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleAuthAction} className="auth-button">
          {isSignup ? 'Sign Up' : 'Log In'}
        </button>
        <button onClick={() => setIsSignup(!isSignup)} className="toggle-button">
          {isSignup ? 'Already have an account? Log In' : 'Need an account? Sign Up'}
        </button>
      </div>
    </div>
  );
};

export default Auth;
