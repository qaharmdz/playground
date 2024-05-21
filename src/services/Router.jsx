import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Filter from '../pages/Filter';
import About from '../pages/About';
import Error from '../pages/Error';
import ErrorBoundary from './ErrorBoundary';

const routes = [
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    ),
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: 'filter', element: <Filter /> },
      { path: 'about', element: <About /> },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
