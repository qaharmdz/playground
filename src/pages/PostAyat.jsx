import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { useGetData, tagFromArrObject } from '../utils/dataHelper';
import { getPostByCompositeId } from '../utils/dbContent';

const Post = () => {
  const { compositeId } = useParams();
  const [showTerjemah, setShowTerjemah] = useState(false);

  const { data, loading: dataLoading, error: dataError } = useGetData(getPostByCompositeId, [compositeId]);
  console.log('Post', data, dataLoading, dataError);

  if (dataLoading) {
    return <p>Loading..</p>
  }

  return (
    <div className="ui-flex-column">
      <div className="ui-breadcrumb">
        <Link to="/">Home</Link>
        {' / '}
        {data.categories.map((category, index) => (
          <>{' '}<Link key={index} to={`/category/${category.id}`}>{category.title}</Link></>
        ))}
        {' / '}
        {data.post.title}
      </div>

      <h1>{data.post.title}</h1>

      <div className={`
        ui-flex-column
        ${showTerjemah ? 'ui-terjemah-show' : ''}
      `}>
        <div className={`ui-card`}>
          <div className="ui-flex-column">
            {tagFromArrObject(data.post.description)}
          </div>
        </div>

        {data.post.setting?.optTerjemah && <div>
          <label>
            <input
              type="checkbox"
              value='1'
              onChange={(e) => setShowTerjemah(e.target.checked)}
            />
            Terjemah
          </label>
        </div>}

        {data.post.content.map((wrapper, index) => (
          <div key={index} className={`ui-card ${wrapper.class}`}>
            <div className="ui-flex-column">
              {tagFromArrObject(wrapper.content)}
            </div>
          </div>
        ))}
      </div>

      {data.tags.length > 0 && (
        <p>
          {data.tags.map((tag, index) => (
            <>{' '}<Link key={index} to={`/tag/${tag.id}`} className="ui-label">{tag.title}</Link></>
          ))}
        </p>
      )}
    </div >
  )
};

export default Post;
