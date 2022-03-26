import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {loadPromCats, selectProm} from '../../redux/actions';
import PromGroupItem from './PromGroupItem';
import {makeCategories} from '../../utils';

const PromGroup = () => {
  const prom = makeCategories(useSelector(state => state.promCats));
  const dispatch = useDispatch();

  useEffect(() => {
    if (prom.length) {
      return;
    }
    dispatch(loadPromCats());
  });

  return (
    <>
      <h4 className="center">Группы прома</h4>
      <div className="overflow groups">
        <ul>
          {prom.map(item => {
            return (<PromGroupItem key={item.id} item={item} select={selectProm}/>)
          })}
        </ul>
      </div>
    </>
  );
}

export default PromGroup;
