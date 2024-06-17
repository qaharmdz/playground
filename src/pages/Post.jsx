import React from 'react';
import { useParams, Link } from 'react-router-dom';

const Post = () => {
  const { compositeId } = useParams();

  return (
    <div className="ui-flex-column">
      <p>Posts #{compositeId}</p>
      <p>Go back to the <Link to="/">home page</Link>.</p>
    </div >
  )
};

export default Post;
