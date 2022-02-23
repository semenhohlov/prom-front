import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {useDispatch} from 'react-redux';

function CatItem({ item, clickhandler }) {
  const dispatch = useDispatch();

  function clickHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    dispatch(clickhandler(item));
  }

  return (
    <ListItem key={item.id}
      sx={{borderBottom: 1}}
      onClick={clickHandler}
    >
      <ListItemText primary={item.group_name}
      sx={{cursor: 'pointer',
      '&hover': {backgroundColor: 'grey'}}} />
      {(item.subCats.length > 0) && (
        <List>
          {item.subCats.map(i => (<CatItem key={i.id} item={i}
            clickhandler={clickhandler}/>))}
        </List>
      )}
    </ListItem>
  );
}

export default CatItem;
