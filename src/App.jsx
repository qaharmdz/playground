import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import './App.css'

function App() {
  return (
    <div className="app-wrapper">
      <div className={`app-content`}>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default App
