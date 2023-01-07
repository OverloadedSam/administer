import { useState } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Header from '../../components/Header';
import OverviewChart from '../../components/OverviewChart';

const Overview = () => {
  const [view, setView] = useState('units');

  return (
    <Box m='1.5rem 2.5rem'>
      <Header
        title='OVERVIEW'
        subtitle='Overview of general revenue and profit'
      />

      <Box height='75vh'>
        <FormControl sx={{ mt: '1rem' }}>
          <InputLabel>View</InputLabel>
          <Select
            value={view}
            label='View'
            onChange={(e) => setView(e.target.value)}
          >
            <MenuItem value='sales'>Sales</MenuItem>
            <MenuItem value='units'>Units</MenuItem>
          </Select>
        </FormControl>
        <OverviewChart view={view} />
        <Box mb={2} />
      </Box>
    </Box>
  );
};

export default Overview;
