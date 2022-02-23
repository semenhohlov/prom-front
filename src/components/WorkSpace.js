import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import PromCats from './PromCats';
import FileUploader from './FileUploader';
import SaveCategory from './SaveCategory';

const Item = styled(Paper)(({ theme }) =>({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function WorkSpace() {
  return (
    <Grid container spacing={2} sx={{justifyContent: 'center', mt: 2}}>
      <Item sx={{width: '45%', textAlign: 'left'}}>
        <PromCats />
      </Item>
      <Item sx={{width: '45%'}}>
        <FileUploader />
      </Item>
      <Item sx={{width: '80%', mt: 2}}>
        <SaveCategory />
      </Item>
    </Grid>
  );
}

export default WorkSpace;
