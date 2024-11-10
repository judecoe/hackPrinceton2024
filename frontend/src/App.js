import React from 'react';
import Map from './Map';
import Auth from './Auth';  // Import the authentication component

const App = () => {
    return (
        <div className="App">
            <h1>Welcome to HackPrinceton App</h1>
            <Auth />  {/* Add the login/signup component */}
            <Map />   {/* Keep the map component */}
        </div>
    );
};

export default App;
