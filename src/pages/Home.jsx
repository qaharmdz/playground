import React from 'react';
import { useNavigate, Link } from "react-router-dom";

import { useGetData } from '../utils/dataHelper';
import { getAllCategories, getAllTags } from '../utils/dbContent';

const Home = () => {
  const navigate = useNavigate();

  const { data: categories, loading: catsLoading, error: catsError } = useGetData(getAllCategories);
  const { data: tags, loading: tagsLoading, error: tagsError } = useGetData(getAllTags);

  return (
    <>
      <div className="backdrop-top"></div>

      <div className="ui-flex-column ui-gap-md">
        <h1 className="ui-text-center ui-color-inverse ui-arabic">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</h1>

        <div className="ui-card">
          <p className="ui-arabic">خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ</p>
          <p className="ui-terjemah">"Sebaik-baik orang di antara kalian adalah yang belajar Al-Qur'an dan mengajarkannya." (HR. Bukhari)</p>
        </div>

        <div className="ui-flex-column">
          <h2>Kategori</h2>
          <div className="ui-grid ui-grid-col-2">
            {categories && categories.map((category, index) => (
              <div key={index} className="ui-card ui-clickable" onClick={() => { navigate(`/category/${category.id}`) }}>
                <h4>{category.title} </h4>
                {category.teaser && <p>{category.teaser}</p>}
              </div>
            ))}
          </div>
        </div>

        <div className="ui-flex-column">
          <h2>Tags</h2>
          <div className="ui-flex-row ui-gap-sm">
            {tags && tags.map((tag, index) => (
              <Link key={index} to={`/tag/${tag.id}`} className="ui-label">{tag.title}</Link>
            ))}
          </div>
        </div>

        <div className="ui-flex-column">
          <h2>Example</h2>

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

      </div>

      <div className="backdrop-top bd-bottom"></div>
    </>
  );
};

export default Home;
