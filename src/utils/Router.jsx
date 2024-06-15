import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from '../App';
import ErrorBoundary from './ErrorBoundary';

import Home from '../pages/Home';
// import Category from '../pages/Category';
// import Post from '../pages/Post';
// import About from '../pages/About';
import Category from '../pages/Category';
import NotFound from '../pages/NotFound';

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
      // {path: 'post/:id', element: <Post /> },
      // {path: 'about', element: <About /> },
      { path: 'category/:categoryId', element: <Category /> },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
