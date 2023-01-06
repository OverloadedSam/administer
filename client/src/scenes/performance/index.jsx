import { useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import useTheme from '@mui/material/styles/useTheme';
import Box from '@mui/material/Box';
import Loader from '../../components/Loader';
import Alert from '../../components/Alert';
import Header from '../../components/Header';
import CustomColumnMenu from '../../components/DataGridCustomColumnMenu';
import { useGetUserPerformanceQuery } from '../../state/apiSlice';

const columns = [
  {
    field: '_id',
    headerName: 'ID',
    flex: 1,
  },
  {
    field: 'userId',
    headerName: 'User ID',
    flex: 0.5,
  },
  {
    field: 'createdAt',
    headerName: 'Created At',
    flex: 1,
  },
  {
    field: 'products',
    headerName: '# of Products',
    align: 'center',
    flex: 0.5,
    sortable: false,
    renderCell: (params) => params.value.length,
  },
  {
    field: 'cost',
    headerName: 'Cost',
    flex: 1,
    renderCell: (params) => `$${params.value}`,
  },
];

const Performance = () => {
  const theme = useTheme();
  const { userId } = useSelector((state) => state.global);
  const { data, isLoading, isError } = useGetUserPerformanceQuery(userId);
  console.log(data);
  return (
    <Box m='1.5rem 2.5rem'>
      <Header
        title='Performance'
        subtitle='Track your affiliate sales performance'
      />
      {data ? (
        <Box
          mt={3}
          height='75vh'
          sx={{
            '& .MuiDataGrid-root': {
              border: 'none',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: 'none',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: 'none',
            },
            '& .MuiDataGrid-virtualScroller': {
              backgroundColor: theme.palette.primary.light,
            },
            '& .MuiDataGrid-footerContainer': {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: 'none',
            },
            '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <DataGrid
            loading={isLoading}
            getRowId={(row) => row._id}
            rows={(data.data && data.data.sales) || []}
            columns={columns}
            components={{
              ColumnMenu: CustomColumnMenu,
            }}
          />
        </Box>
      ) : isLoading ? (
        <Loader mt={5} />
      ) : isError ? (
        <Alert
          variant='outlined'
          mt={4}
          message={'An error ocurred. Please try again later.'}
        />
      ) : null}
    </Box>
  );
};

export default Performance;
