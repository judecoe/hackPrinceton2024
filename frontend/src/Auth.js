import React, { useState } from 'react';
import { auth } from './firebase';
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
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await sendEmailVerification(user);
        alert('Sign up successful! A verification email has been sent to your email address. Please verify before logging in.');
        
        await auth.signOut();
      } else {
        await signInWithEmailAndPassword(auth, email, password);

        if (!auth.currentUser.emailVerified) {
          alert('Please verify your email address before logging in.');
          await auth.signOut(); 
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
