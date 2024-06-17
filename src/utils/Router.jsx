import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from '../App';
import ErrorBoundary from './ErrorBoundary';

import Home from '../pages/Home';
import Category from '../pages/Category';
import Tag from '../pages/Tag';
import Post from '../pages/Post';
import PostAyat from '../pages/PostAyat';
import Setting from '../pages/Setting';
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
      { path: 'category/:categoryId', element: <Category /> },
      { path: 'tag/:tagId', element: <Tag /> },
      { path: 'post/:compositeId', element: <Post /> },
      { path: 'post/ayat/:compositeId', element: <PostAyat /> },
      { path: 'setting', element: <Setting /> },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
