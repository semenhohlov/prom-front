import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {loadPromCats, selectProm} from '../../redux/actions';
import PromGroupItem from './PromGroupItem';
import {makeCategories, searchFilterCats} from '../../utils';

const PromGroup = () => {
  const prom = useSelector(state => state.promCats);
  const dispatch = useDispatch();
  const [searchString, setSearchString] = useState('');
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    if (prom.length) {
      return;
    }
    dispatch(loadPromCats());
  });

  useEffect(() => {
    setGroups(makeCategories(prom));
  }, [prom]);

  const inputHandler = (event) => {
    event.preventDefault();
    setSearchString(event.target.value);
  };

  const clickHandler = () => {
    const filtered = prom.filter(item => searchFilterCats(item, searchString));
    setGroups(filtered);
  };

  const clearHandler = () => {
    setGroups(makeCategories(prom));
    setSearchString('');
  };

  return (
    <>
      <h4 className="center">Группы прома</h4>
      <input type="text" value={searchString}
        onChange={inputHandler}
        placeholder="Строка для поиска" />
        <button onClick={clickHandler}>Найти</button>
        <button onClick={clearHandler}>&times;</button>
      <div className="overflow groups">
        <ul>
          {groups.map(item => {
            return (<PromGroupItem key={item.id} item={item} select={selectProm}/>)
          })}
        </ul>
      </div>
    </>
  );
}

export default PromGroup;
