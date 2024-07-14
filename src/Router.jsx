import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import ErrorBoundary from './ErrorBoundary';

import Home from './pages/Home';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    ),
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      // { path: 'setting', element: <Setting /> },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
