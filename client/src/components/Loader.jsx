import React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loader({ ...rest }) {
  return (
    <Box display='flex' alignItems='center' justifyContent='center' {...rest}>
      <CircularProgress />
    </Box>
  );
}
