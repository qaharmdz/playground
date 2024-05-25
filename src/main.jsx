import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './services/Router';
import loadInitialData from './services/loadInitialData';

// Load initial indexedDb data
loadInitialData();

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
