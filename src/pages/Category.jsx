import React from 'react';
import { useParams, Link } from 'react-router-dom';

import { useGetData } from '../utils/dataHelper';
import { getCategoryById, getAllPostsByCategory } from '../utils/dbContent';

const Category = () => {
  const { categoryId } = useParams();
  console.log('');
  console.log('categoryId', categoryId);

  const { data: category, loading: catLoading, error: catError } = useGetData(getCategoryById, [categoryId]);
  console.log('Category', category, catLoading, catError);

  const { data: posts, loading: postsLoading, error: postsError } = useGetData(getAllPostsByCategory, [categoryId]);
  console.log('Posts', posts, postsLoading, postsError);

  return (
    <div>
      <p>Category Page #{categoryId}</p>
      {category && (
        <>
          <h1>{category.title}</h1>

          {posts && (
            <ul>
              {posts.map((post) => (
                <li key={post.id}>{post.title}</li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  )
};

export default Category;
