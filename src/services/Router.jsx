import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import Home from '../pages/Home';
import Filter from '../pages/Filter';
import About from '../pages/About';
import Posts from '../pages/Posts';
import Post from '../pages/Post';
import Categories from '../pages/Categories';
import PostsByCategory from '../pages/PostsByCategory';
import Tags from '../pages/Tags';
import PostsByTag from '../pages/PostsByTag';
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
      { path: 'posts', element: <Posts /> },
      { path: 'categories', element: <Categories /> },
      { path: 'tags', element: <Tags /> },
      { path: 'posts/:postId', element: <Post /> },
      { path: 'posts/url/:urlAlias', element: <Post /> },
      { path: 'categories/:categoryAlias/posts/:urlAlias', element: <Post /> },
      { path: 'categories/:categoryAlias', element: <PostsByCategory /> },
      { path: 'tags/:tagAlias', element: <PostsByTag /> },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
