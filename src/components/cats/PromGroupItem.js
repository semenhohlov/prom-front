import React from 'react';
import {useDispatch} from 'react-redux';

const PromGroupItem = ({ item, select }) => {
  const dispatch = useDispatch();
  const style = item.prom_group_id ? 'group_item saved' : 'group_item';

  const clickHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(select(item));
  }
  return (
    <li>
      <div className={style}
        onClick={clickHandler}
      >{item.group_name}
        <div className="hint">
          {item.prom_cat_1} <br />
          {item.prom_cat_2} <br />
          {item.prom_cat_3} <br />
          {item.prom_cat_4}
        </div>
      </div>
      {(item.subCats) && (item.subCats.length > 0) && (
        <ul>
        {item.subCats.map(i => {
          return <PromGroupItem key={i.id} item={i} select={select}/>
        })}
        </ul>)
      }
    </li>
  );
}

export default PromGroupItem;
