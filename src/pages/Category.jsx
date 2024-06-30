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
      <div className="ui-breadcrumb">
        <Link to="/">Home</Link>
        {' / '}
        {category.title}
      </div>

      <h1>{category.title}</h1>

      {category.description && (
        <div>
          {category.description}
        </div>
      )}

      <div className="ui-card ui-card-full">
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

      {categoryId == 2 && (
        <pre><code>
          Diluar surat 87 - 114 al A'la - al-Dhuha
          1. Al-Baqarah 2: 183 – 186<br />
          2. Al-Baqarah 2: 254 -257<br />
          3. Al-Baqarah 2: 261 – 265<br />
          4. Al-Baqarah 283 -286<br />
          5. Ali Imran 18 – 20<br />
          6. Ali Imran 102 – 108<br />
          7. Ali Imran 110 – 115<br />
          8. Ali Imran 133 – 136<br />
          9. Ali Imran 190 – 194<br />
          10. An-Nisa 1 – 6<br />
          11. Al-Maidah 6 -9<br />
          12. Al-An’am 159 – 165<br />
          13. At-Taubah 128 -129<br />
          14. Yusuf 1- 6<br />
          15. Ibrahim 5 – 8<br />
          16. An-nahl 125 -128<br />
          17. Al-Isra’ 1 -10<br />
          18. Al-Isra’ 78 – 85<br />
          19. Al-Kahfi 1 – 13<br />
          20. Al-Kahfi102 – 110<br />
          21. Al-Mu’minun 1 – 16<br />
          22. An-Nur 35 -38<br />
          23. Al- Furqan 72 – 77<br />
          24. Ar-Ruum 1 – 11<br />
          25. Luqman 12 – 19<br />
          26. Al-Ahzab 21 – 24<br />
          27. Al-Ahzab 40 -48<br />
          28. Al-Ahzab 70 – 73<br />
          29. Yaasin 77 -83<br />
          30. Saad 71 – 88<br />
          31. Az-Zumar  71 – 74<br />
          32. Fusilat30 – 35<br />
          33. Al- Fath 1- 6<br />
          34. Al-fath27 -29<br />
          35. Al-hujurat 1 – 6<br />
          36. Al-mujadalah 9 – 11<br />
          37. Al-hasyr 18 – 24<br />
          38. Al-Saff 10 – 14<br />
          39. Al-Jumu’ah 9 – 11<br />
          40. Al-Munafiqun 9 – 11<br />
          41. At-taghabun 11 – 18<br />
          42. Attahrim 8-12
        </code></pre>
      )}
    </div>
  )
};

export default Category;
