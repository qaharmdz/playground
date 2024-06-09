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

import { userGetAllSettings, userGetSetting } from '../utils/dbUser'

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

  (async () => {
    const settings = await userGetAllSettings();
    console.log('userSettings', settings);

    const foo = await userGetSetting('foo', 'bar');
    console.log('userGetSetting', foo);
  })();

  return (
    <>
      <div className="backdrop-top"></div>
      <div>
        <div className="ui-flex-column ui-flex-gap-md">
          <h1 className="ui-text-center ui-color-inverse ui-arabic">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</h1>

          <div className="ui-flex-column">
            <div className="ui-card">
              <p className="ui-arabic">خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ</p>
              <p className="ui-terjemah">"Sebaik-baik orang di antara kalian adalah yang belajar Al-Qur’an dan mengajarkannya." (HR. Bukhari)</p>
            </div>
            <div className="ui-card">
              <p>Lorem ipsum dolor sit amet, <b>consectetur adipisicing elit</b>. <i>Saepe repellat iste explicabo quas.</i> Reiciendis modi rem obcaecati accusamus magni accusantium excepturi sequi. Tempore voluptate natus ab quisquam, autem minus esse?</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe repellat iste explicabo quas. Reiciendis modi rem obcaecati accusamus magni accusantium excepturi sequi. Tempore voluptate natus ab quisquam, autem minus esse?</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe repellat iste explicabo quas. Reiciendis modi rem obcaecati accusamus magni accusantium excepturi sequi. Tempore voluptate natus ab quisquam, autem minus esse?</p>
            </div>
            <div className="ui-card">
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe repellat iste explicabo quas. Reiciendis modi rem obcaecati accusamus magni accusantium excepturi sequi. Tempore voluptate natus ab quisquam, autem minus esse?</p>
            </div>
            <div className="ui-card">
              <p>Lorem ipsum dolor sit amet, <b>consectetur adipisicing elit</b>. <i>Saepe repellat iste explicabo quas.</i> Reiciendis modi rem obcaecati accusamus magni accusantium excepturi sequi. Tempore voluptate natus ab quisquam, autem minus esse?</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe repellat iste explicabo quas. Reiciendis modi rem obcaecati accusamus magni accusantium excepturi sequi. Tempore voluptate natus ab quisquam, autem minus esse?</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe repellat iste explicabo quas. Reiciendis modi rem obcaecati accusamus magni accusantium excepturi sequi. Tempore voluptate natus ab quisquam, autem minus esse?</p>
            </div>
            <div className="ui-card">
              <p>Lorem ipsum dolor sit amet, <b>consectetur adipisicing elit</b>. <i>Saepe repellat iste explicabo quas.</i> Reiciendis modi rem obcaecati accusamus magni accusantium excepturi sequi. Tempore voluptate natus ab quisquam, autem minus esse?</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe repellat iste explicabo quas. Reiciendis modi rem obcaecati accusamus magni accusantium excepturi sequi. Tempore voluptate natus ab quisquam, autem minus esse?</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe repellat iste explicabo quas. Reiciendis modi rem obcaecati accusamus magni accusantium excepturi sequi. Tempore voluptate natus ab quisquam, autem minus esse?</p>
            </div>
          </div>
        </div >

      </div >
    </>
  );
};

export default Home;
