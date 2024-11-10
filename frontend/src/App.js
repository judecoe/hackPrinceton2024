import React, { useState, useEffect } from 'react';
import Map from './Map';
import Auth from './Auth';
import { auth } from './firebaseConfig';
import { db } from './firebase';

const App = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Add a loading state to handle initial state change

    useEffect(() => {
        // Sign out the user initially to clear any previous sessions
        auth.signOut();

        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
            setLoading(false); // Set loading to false after we have the authentication state
        });

        return () => unsubscribe(); // Cleanup the subscription
    }, []);

    // Show loading message while Firebase checks auth state
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="App">
            {user ? <Map /> : <Auth />}
        </div>
    );
};

export default App;