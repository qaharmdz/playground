import React from 'react';
import {
  // ## Example 1
  // Show all categories with each category showing 5 posts in descending order by priority
  getAllCategories, getAllPostsByCategory,

  // ## Example 2
  // Category page with posts paginated (10 per page) in descending order by priority
  // getAllCategories,
  getPostsByCategoryForPage,

  // ## Example 3
  getPostByCompositeId
} from '../utils/dbContent';

// ## Example 1
const showAllCategoriesWithPosts = async () => {
  try {
    const categories = await getAllCategories();
    for (const category of categories) {
      console.log(`#1 Category: ${category.title}`);
      let posts = await getAllPostsByCategory(category.id);

      // Show top 5 posts
      posts.slice(0, 5).forEach((post, index) => {
        console.log(`  #1 Post ${index + 1}: ${post.title}`);
      });
    }
  } catch (error) {
    console.error('#1 Error fetching categories and posts:', error);
  }
};

// ## Example 2
const showCategoryPage = async (categoryId, page) => {
  try {
    const categories = await getAllCategories();
    const category = categories.find(cat => cat.id === categoryId);
    if (!category) {
      console.log('#2 Category not found');
      return;
    }
    console.log(`#2 Category: ${category.title}`);

    const posts = await getPostsByCategoryForPage(categoryId, page);
    posts.forEach((post, index) => {
      console.log(`  #2 Post ${index + 1}: ${post.title}`);
    });
  } catch (error) {
    console.error('#2 Error fetching paginated posts:', error);
  }
};

// ## Example 3
const showPostPage = async (compositeId) => {
  try {
    const postWithDetails = await getPostByCompositeId(compositeId);
    if (!postWithDetails) {
      console.log('#3 Post not found');
      return;
    }
    const { post, categories, tags } = postWithDetails;

    console.log(`#3 Post: ${post.title}`);

    categories.forEach(category => {
      console.log(`  - #3 Category: ${category.title}`);
    });

    console.log('#3 Tags:');
    tags.forEach(tag => {
      console.log(`  - #3  ${tag.title}`);
    });
  } catch (error) {
    console.error('#3 Error fetching post details:', error);
  }
};

const Home = () => {
  console.log('');

  // Example 1
  showAllCategoriesWithPosts();

  // Example 2 -- usage for category with ID '1' and showing page 1
  showCategoryPage(1, 1);

  // Example usage for a post with compositeId 'ayat-imam_1'
  showPostPage('ayat-imam_1');

  return (
    <div>
      <h1>Allama</h1>
    </div>
  );
};

export default Home;
