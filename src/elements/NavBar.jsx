import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/filter">Filter</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/posts">Posts</Link></li>
        <li><Link to="/tags">Tags</Link></li>
        <li><Link to="/categories">Categories</Link></li>
        <li><Link to="/na">No-route -- Error page</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
