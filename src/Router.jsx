import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import ErrorBoundary from './ErrorBoundary';

import Home from './pages/Home';
import Categories from './pages/Categories';
import Category from './pages/Category';
import Tags from './pages/Tags';
import Tag from './pages/Tag';
import Post from './pages/Post';
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
      { path: 'categories', element: <Categories /> },
      { path: 'category/:slug', element: <Category /> },
      { path: 'tags', element: <Tags /> },
      { path: 'tag/:slug', element: <Tag /> },
      { path: 'post/:slug', element: <Post /> },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
