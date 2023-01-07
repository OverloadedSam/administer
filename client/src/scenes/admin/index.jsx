import { DataGrid } from '@mui/x-data-grid';
import useTheme from '@mui/material/styles/useTheme';
import Box from '@mui/material/Box';
import Loader from '../../components/Loader';
import Alert from '../../components/Alert';
import Header from '../../components/Header';
import CustomColumnMenu from '../../components/DataGridCustomColumnMenu';
import { useGetAdminsQuery } from '../../state/apiSlice';

const columns = [
  {
    field: '_id',
    headerName: 'ID',
    flex: 1,
  },
  {
    field: 'name',
    headerName: 'Name',
    flex: 0.5,
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 1,
  },
  {
    field: 'phoneNumber',
    headerName: 'Phone Number',
    flex: 0.5,
    renderCell: (params) => {
      return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    },
  },
  {
    field: 'country',
    headerName: 'Country',
    align: 'center',
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

const Admin = () => {
  const theme = useTheme();
  const { data, isLoading, isError } = useGetAdminsQuery();

  return (
    <Box m='1.5rem 2.5rem'>
      <Header
        title='ADMINS'
        subtitle='Manage list of Admins and Super-Admins'
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
            rows={data?.data || []}
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

export default Admin;
