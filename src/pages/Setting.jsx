import React from 'react';
import { Link } from 'react-router-dom';

import { useGetData } from '../utils/dataHelper';
import { userGetAllSettings, userSetSetting } from '../utils/dbUser';

const Setting = () => {

  const { data: setting, loading: loading, error: error } = useGetData(userGetAllSettings);
  console.log('sertting', setting, loading, error);

  if (loading) {
    return <p>Loading..</p>
  }

  return (
    <div className="ui-flex-column">
      <div className="ui-breadcrumb">
        <Link to="/">Home</Link>
        {' / '}
        Setting
      </div>

      <h1>Setting</h1>

      <div className={`ui-card`}>
        <div className="ui-flex-column">
          <div className="ui-form-field">
            <div>Latin font size</div>
            <div>input</div>
          </div>
          <div className="ui-form-field">
            <div>Arabic font size</div>
            <div>input</div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Setting;
