import React from 'react';
import { Link } from 'react-router-dom';

const Setting = () => {
  return (
    <div>
      <h1>Settings</h1>
      <p>Go back to the <Link to="/">home page</Link>.</p>
    </div>
  )
};

export default Setting;
