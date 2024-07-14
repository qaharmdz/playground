import React from 'react'
import ReactDOM from 'react-dom/client'

import { DataProvider } from './contexts/DataContext';
import { ConfigProvider } from './contexts/ConfigContext';
import Router from './Router.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ConfigProvider>
    <DataProvider>
      <Router />
    </DataProvider>
  </ConfigProvider>
)
