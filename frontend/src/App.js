import React, { useState, useEffect } from 'react';
import Map from './Map';
import Auth from './Auth';
import { auth } from './firebaseConfig';
=======
import { db } from './firebase';

const App = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Initial sign out to clear any previous sessions
        auth.signOut();

        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (currentUser && currentUser.emailVerified) {
                setUser(currentUser);
            } else {
                setUser(null); // Only set user if email is verified
            }
            setLoading(false); // Set loading to false after determining auth state
        });

        return () => unsubscribe(); // Cleanup the subscription
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="App">
            <h1>Welcome to HackPrinceton App</h1>
            {user ? <Map /> : <Auth />}
        </div>
    );
};

export default App;