import { random } from 'lodash-es';

function getRandomElements(arr, num) {
  const shuffled = arr.slice(0);
  let i = arr.length;
  const min = i - num;
  let temp;
  let index;

  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }

  return shuffled.slice(min);
}

const initialPosts = Array.from({ length: 75 }, (_, i) => {
  const randomCategories = getRandomElements([1, 2, 3, 4, 5], Math.floor(Math.random() * 2) + 2);
  const randomTags = getRandomElements([1, 2, 3, 4, 5, 6, 7], Math.floor(Math.random() * 2) + 2);

  return {
    id: i + 1,
    title: `Post ${i + 1}`,
    url_alias: `post-${i + 1}`,
    content: `Content of Post ${i + 1}`,
    categories: randomCategories,
    tags: randomTags,
  };
});


const initialCategories = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  name: `Category ${i + 1}`,
  url_alias: `category-${i + 1}`,
  content: `Description of Category ${i + 1}`,
}));

const initialTags = Array.from({ length: 7 }, (_, i) => ({
  id: i + 1,
  name: `Tags ${i + 1}`,
  url_alias: `tag-${i + 1}`,
  content: `Teaser of Tag ${i + 1}`,
}));

export { initialPosts, initialCategories, initialTags };
