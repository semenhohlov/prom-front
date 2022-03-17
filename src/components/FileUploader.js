import React, {useRef, useState} from 'react';
import AddCircle from '@mui/icons-material/AddCircle';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Checkbox from '@mui/material/Checkbox';
import {useDispatch, useSelector} from 'react-redux';
import {loadFileCats, selectFile} from '../redux/actions';
import CatItem from './CatItem';
import {makeCategories} from '../utils';

function FileUploader() {
  const file = useRef(null);
  const cats = useSelector(state => state.fileCats);
  const supplier = useSelector(state => state.supplier);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [grouped, setGrouped] = useState(false);
  let sorted = cats.map(item => {
    return {...item};
  });
  sorted = makeCategories(sorted);
  const loaded = grouped ? sorted : cats;

  const clickHandler = () => {
    file.current.click();
  };

  const changeHandler = async (event) => {
    if (!event.target.files.length) {
      return;
    }
    const file = event.target.files[0];
    const form = new FormData();
    form.append('filename', file);
    setLoading(true);
    dispatch(loadFileCats(file));
    // setLoading(true);
  };

  const groupHandler = () => {
    setGrouped(!grouped);
  };

  return (
    <>
      {loaded.length > 0 ?
        (<><Typography variant="h6">{supplier}</Typography>
          Группы: <Checkbox checked={grouped}
            onChange={groupHandler}
          />
          <List sx={{ width: '100%',
          maxWidth: 600,
          bgcolor: 'background.paper',
          maxHeight: 380,
          overflow: 'auto'}}
        >
          {loaded.map(item => (<CatItem key={item.group_id + item.group_name} item={item} clickhandler={selectFile}/>))}
        </List> </>)
        :
      (<form>
        <Typography variant="h6">Загрузите файл:</Typography>
        <input type="file" ref={file} style={{'display': 'none'}} onChange={changeHandler}/>
        {loading ? <CircularProgress color="success" /> :
          <AddCircle sx={{cursor: 'pointer'}}
          onClick={clickHandler}/>}
      </form>)}
    </>
  );
}

export default FileUploader;
