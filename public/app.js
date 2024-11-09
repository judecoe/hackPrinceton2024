document.addEventListener('DOMContentLoaded', function() {
    // Initialize Firebase
    try {
      const app = firebase.app();
      console.log('Firebase initialized successfully');
    } catch (e) {
      console.error('Error initializing Firebase:', e);
    }
  });