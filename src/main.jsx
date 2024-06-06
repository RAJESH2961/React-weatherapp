import React from 'react';
import ReactDOM from 'react-dom/client';

import './Weather.css'; // Ensure this path is correct
import Weather from './Weather.jsx'; // Ensure this path is correct

// Ensure there is an element with id="root" in your index.html file
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Weather />
  </React.StrictMode>
);
