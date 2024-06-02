import React from 'react'
import { Outlet } from 'react-router-dom';

import './App.css'

function App() {
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
