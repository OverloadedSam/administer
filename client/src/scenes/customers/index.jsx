import useTheme from '@mui/material/styles/useTheme';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Loader from '../../components/Loader';
import Alert from '../../components/Alert';
import Header from '../../components/Header';
import { useGetCustomersQuery } from '../../state/apiSlice';

const columns = [
  { field: '_id', headerName: 'ID', flex: 1 },
  { field: 'name', headerName: 'Name', flex: 0.5 },
  { field: 'email', headerName: 'E-mail', flex: 1 },
  {
    field: 'phoneNumber',
    headerName: 'Phone Number',
    renderCell: (params) =>
      params.value.replace(/^(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'),
    flex: 1,
  },
  {
    field: 'country',
    headerName: 'Country',
    flex: 0.4,
  },
  {
    field: 'occupation',
    headerName: 'Occupation',
    flex: 1,
  },
  {
    field: 'role',
    headerName: 'Role',
    flex: 0.5,
  },
];

const Customers = () => {
  const theme = useTheme();
  const { data, isLoading, isError } = useGetCustomersQuery();

  return (
    <Box m='1.5rem 2.5rem'>
      <Header title='Customers' subtitle='List of customers' />
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
            loading={isLoading || !data}
            columns={columns}
            rows={data.data || []}
            getRowId={(row) => row._id}
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

export default Customers;
