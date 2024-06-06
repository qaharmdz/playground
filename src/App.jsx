import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import updateIndexedDB from './utils/dataFetch';

import './App.css'

const CONFIG = process.env.CONFIG;

function App() {
  useEffect(() => {
    const initializeData = async () => {
      await updateIndexedDB();
    };
    initializeData();
  }, []);

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
