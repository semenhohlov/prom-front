import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {updateCategory} from '../../redux/actions';
import './cats.css';

import PromGroup from './PromGroup';
import PromCategories from './PromCategories';

const Cats = () => {
  const dispatch = useDispatch();
  const promCat = useSelector(state => state.fileCat);
  const promGroup = useSelector(state => state.promCat);

  function saveHandler(){
    dispatch(updateCategory(promGroup, promCat));
  }

  return (
    <div className="container">
      <div className="row flex">
        <div className="col-70">
          <div className="card">
            <PromCategories />
          </div>
        </div>
        <div className="col-30">
        <div className="card">
          <PromGroup />
        </div>
        </div>
      </div>
      <div className="save">
        <div className="row">
          <div className="col-50">
            Категория прома: {promCat && promCat.category_1},&nbsp;&nbsp;
            {promCat && promCat.category_2},&nbsp;&nbsp;
            {promCat && promCat.category_3},&nbsp;&nbsp;
            {promCat && promCat.category_4}
          </div>
          <div className="col-50">
            Группа прома: {promGroup && promGroup.group_name}
          </div>
        </div>
        <button
          disabled={((!promCat.id) || (!promGroup.id))}
          onClick={saveHandler}
        >Сохранить</button>
      </div>
    </div>
  );
}

export default Cats;
