import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDataByPage, getAllData, STORE_NAMES } from '../services/indexedDB';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 10;

  useEffect(() => {
    async function fetchData() {
      try {
        const paginatedPosts = await getDataByPage(STORE_NAMES.posts, currentPage, postsPerPage);
        const allPosts = await getAllData(STORE_NAMES.posts);
        setPosts(paginatedPosts);
        setTotalPages(Math.ceil(allPosts.length / postsPerPage));
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }

    fetchData();
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link to={`/posts/url/${post.url_alias}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
        <span>{currentPage} / {totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default Posts;
