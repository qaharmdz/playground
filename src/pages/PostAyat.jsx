import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { useGetData, toHtmlStructure } from '../utils/dataHelper';
import { getPostByCompositeId } from '../utils/dbContent';

const Post = () => {
  const { compositeId } = useParams();
  const [showTerjemah, setShowTerjemah] = useState(null);

  const { data, loading: dataLoading, error: dataError } = useGetData(getPostByCompositeId, [compositeId]);
  console.log('Post', data, dataLoading, dataError);

  if (dataLoading) {
    return <p>Loading..</p>
  }

  return (
    <div className="ui-flex-column">
      <p>
        <Link to="/">Home</Link>
        {' / '}
        {data.categories.map((category, index) => (
          <>{' '}<Link to={`/category/${category.id}`}>{category.title}</Link></>
        ))}
        {' / '}
        {data.post.title}
      </p>


      <h1>{data.post.title}</h1>

      <div>
        <label>
          <input
            type="checkbox"
            value='1'
            onChange={(e) => setShowTerjemah(e.target.checked)}
          />
          Terjemah
        </label>
      </div>

      <div className={`ui-card ${!showTerjemah ? 'ui-terjemah-hide' : ''}`}>
        <div className="ui-flex-column">
          {toHtmlStructure(data.post.description)}
        </div>
      </div>

      <p>
        {data.tags.map((tag, index) => (
          <>{' '}<Link to={`/tag/${tag.id}`}>{tag.title}</Link></>
        ))}
      </p>
    </div >
  )
};

export default Post;
