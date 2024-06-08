import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import updateIndexedDB from './utils/dataFetch';

import './App.css'

const CONFIG = process.env.CONFIG;

function App() {
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const [splashMessage, setSplashMessage] = useState('Checking for updates...');

  const hideSplashScreen = () => {
    setTimeout(() => {
      console.log('hideSplashScreen');
      setShowSplashScreen(false);
    }, CONFIG.settings.splashScreenDelay);
  };

  useEffect(() => {
    if (!showSplashScreen) return;

    console.log('App.js useEffect');
    if (!navigator.onLine) {
      setSplashMessage('No internet connection. Using offline data.');
      hideSplashScreen();
      return;
    }

    const initializeData = async () => {
      await updateIndexedDB();
    };

    try {
      initializeData();
      setSplashMessage('Update successful!');
    } catch (error) {
      setSplashMessage('Error updating data.');
    } finally {
      hideSplashScreen();
    }
  }, []);

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
