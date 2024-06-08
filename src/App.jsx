import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import CONFIG from './config';
import updateIndexedDB from './utils/dataFetch';

import './App.css'

function App() {
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const [splashMessage, setSplashMessage] = useState('Checking for updates...');

  const hideSplashScreen = () => {
    setTimeout(() => {
      setShowSplashScreen(false);
    }, CONFIG.settings.splashScreenDelay);
  };

  useEffect(() => {
    if (!showSplashScreen) return;

    const initializeData = async () => {
      try {
        if (!navigator.onLine) {
          setSplashMessage('No internet connection. Using offline data.');
          hideSplashScreen();
          return;
        }

        setSplashMessage('Updating data...');
        await updateIndexedDB();
        setSplashMessage('Update successful!');
      } catch (error) {
        setSplashMessage('Error updating data.');
        console.error('Error updating IndexedDB:', error);
      } finally {
        hideSplashScreen();
      }
    };

    setTimeout(() => {
      initializeData();
    }, CONFIG.settings.splashScreenDelay * .5);
  }, [showSplashScreen]);

  if (showSplashScreen) {
    return (
      <div className="splash-screen">
        <div className="splash-content">
          <h1>Processing..</h1>
          <p>{splashMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-wrapper">
      <div className="app-container">
        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default App
