import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import {useSelector, useDispatch} from 'react-redux';
import {loadPromCats, selectProm} from '../redux/actions';
import CatItem from './CatItem';
import {searchFilter, makeCategories} from '../utils';


function PromCats() {
  const isLoading = useSelector(state => state.isLoading);
  const prom = useSelector(state => state.promCats);
  const error = useSelector(state => state.error);
  const [cats, setCats] = useState([]);
  const dispatch = useDispatch();
  const [searchString, setSearchString] = useState('');
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    if (prom.length) {
      return;
    }
    dispatch(loadPromCats());
  });

  useEffect(() => {
    setCats(makeCategories(prom));
  }, [prom]);

  function searchHandler(event) {
    const str = event.target.value
    setSearchString(str);
    if (str.length > 4) {
      const filtered = prom.filter(item => searchFilter(item, str));
      setCats(filtered)
      setIsFiltered(true);
    }
  }

  function clearFilter() {
    setIsFiltered(false);
    setSearchString('');
    setCats(prom);
  }

  return (
    <div>
      <Box sx={{display: 'flex',
        justifyContent: 'space-between',
        textAlign: 'center'
      }}>
        <Typography variant="h6">Группы Прома:</Typography>
        {isFiltered ? <Chip label={searchString} onDelete={clearFilter} /> : ''}
        <TextField label="Поиск" variant="standard" size="small"
        value={searchString} onChange={searchHandler}/>
      </Box>
      {error && error}
      {isLoading ? <Skeleton width={600} height={380}/> : (
        <List sx={{ width: '100%',
          maxWidth: 600,
          bgcolor: 'background.paper',
          maxHeight: 380,
          overflow: 'auto'}}
        >
          {cats.map(item => (<CatItem key={item.group_id + item.group_name} item={item} clickhandler={selectProm} />))}
        </List>)}
    </div>
  );
}

export default PromCats;
