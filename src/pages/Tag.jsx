import React from 'react';
import { useParams, Link } from 'react-router-dom';

import { useGetData } from '../utils/dataHelper';
import { getTagById, getAllPostsByTag } from '../utils/dbContent';

const Tag = () => {
  const { tagId } = useParams();

  const { data: tag, loading: tagLoading, error: tagError } = useGetData(getTagById, [tagId]);
  // console.log('tag', tag, tagLoading, tagError);

  const { data: posts, loading: postsLoading, error: postsError } = useGetData(getAllPostsByTag, [tagId]);
  console.log('Posts', posts, postsLoading, postsError);

  if (tagLoading) {
    return <p>Loading..</p>
  }

  return (
    <div className="ui-flex-column">
      <p>Tag #{tagId}</p>

      <h1>{tag.title}</h1>

      <div className="ui-card">
        {posts && (
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <Link to={`/post/ayat/${post.compositeId}`}>{post.title}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
};

export default Tag;
