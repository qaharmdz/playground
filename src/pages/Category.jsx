import React from 'react';
import { useParams, Link } from 'react-router-dom';

import { useGetData } from '../utils/dataHelper';
import { getCategoryById, getAllPostsByCategory } from '../utils/dbContent';

const Category = () => {
  const { categoryId } = useParams();

  const { data: category, loading: catLoading, error: catError } = useGetData(getCategoryById, [categoryId]);
  // console.log('Category', category, catLoading, catError);

  const { data: posts, loading: postsLoading, error: postsError } = useGetData(getAllPostsByCategory, [categoryId]);
  // console.log('Posts', posts, postsLoading, postsError);

  if (catLoading || postsLoading) {
    return <p>Loading..</p>
  }

  return (
    <div className="ui-flex-column">
      <p>Category #{categoryId}</p>

      <h1>{category.title}</h1>

      {category.description && (
        <div className="ui-card">
          {category.description}
        </div>
      )}

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

export default Category;
