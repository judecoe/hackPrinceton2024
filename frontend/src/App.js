import React from 'react';
import Map from './Map';
import { db } from './firebase';

const App = () => {
    return (
        <div className="App">
            <Map />
        </div>
    );
};

export default App;