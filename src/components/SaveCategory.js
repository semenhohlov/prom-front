import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {useSelector, useDispatch} from 'react-redux';

function SaveCategory() {
  const dispatch = useDispatch();
  const promCat = useSelector(state => state.promCat);
  const fileCat = useSelector(state => state.fileCat);
  const supplier = useSelector(state => state.supplier);

  return (
    <Box sx={{display: 'flex',
      justifyContent: 'space-evenly'}}>
      <Box sx={{fontWeight: 'bold',
        fontSize: '1.2rem'}}>
        Пром: {promCat && promCat.group_name}
      </Box>
      <Box sx={{fontWeight: 'bold',
        fontSize: '1.2rem'}}>
        {supplier ? supplier : 'Поставщик'}:  {fileCat && fileCat.group_name}
      </Box>
      <Box>
        <Button variant="contained"
        disabled={((!promCat) || (!fileCat))}
        > Сохранить </Button>
      </Box>
    </Box>

  );
}

export default SaveCategory;
