import React, {useRef} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AddCircle from '@mui/icons-material/AddCircle';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {loading, setSupplier, loadFileCats} from '../../redux/actions';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <FileUplader />
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

function FileUplader() {
  const file = useRef(null);
  const isLoading = useSelector(state => state.isLoading);
  const dispatch = useDispatch();

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
    dispatch(loading(true));
    const response = await axios.post('http://localhost/php/laravel/prom/public/api/categories', form)
    dispatch(loading(false));
    const supplier = response.data.supplier;
    const loaded = response.data.loaded;
    dispatch(setSupplier(supplier));
    dispatch(loadFileCats(loaded));
    console.log(response.data.message);
  };

  return (
    <form>
      <input type="file" ref={file} style={{'display': 'none'}} onChange={changeHandler}/>
      {isLoading ? <CircularProgress color="success" /> : <AddCircle onClick={clickHandler}/>}
    </form>
  );
}
