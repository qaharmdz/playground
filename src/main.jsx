import React from 'react'
import ReactDOM from 'react-dom/client'

import { ConfigProvider } from './contexts/ConfigContext';
import { DataProvider } from './contexts/DataContext';
import Router from './Router.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ConfigProvider>
    <DataProvider>
      <Router />
    </DataProvider>
  </ConfigProvider>
)
