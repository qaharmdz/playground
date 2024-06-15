import React, { useEffect, useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';

import CONFIG from './config';
import updateIndexedDB from './utils/dataFetch';

import './App.css'

const App = () => {
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const [splashMessage, setSplashMessage] = useState('Checking for updates..');

  const hideSplashScreen = () => {
    setTimeout(() => {
      setSplashMessage('Initializing app..');
    }, CONFIG.settings.splashScreenDelay * .7);
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
        const status = await updateIndexedDB();
        console.log('updateIndexedDb', status);

        if (status === 'no-update') {
          setSplashMessage('You\'re up to date!');
        } else {
          setSplashMessage('Update successful!');
        }
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
        <main className="app-outlet">

          <div className="app-nav-main">
            {/* <div className="app-sidebar">#</div> */}
            <div className="app-name">
              Allama{' '}
              <span className="app-version">v1.0-b.1</span>
            </div>
            {/* <div className="app-links">[?]</div> */}
          </div>

          <div className="app-content">
            <Outlet />
          </div>

          <div className="app-floatbar">
            <div className="app-floatbar-content">
              <NavLink to="/">Home</NavLink>
              <div>Search</div>
              {/* <div>Bookmarks</div> */}
              <NavLink to="/settings">Settings</NavLink>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
