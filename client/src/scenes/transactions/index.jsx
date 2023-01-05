import { DataGrid } from '@mui/x-data-grid';
import useTheme from '@mui/material/styles/useTheme';
import Box from '@mui/material/Box';
import Loader from '../../components/Loader';
import Alert from '../../components/Alert';
import Header from '../../components/Header';
import DataGridCustomToolbar from '../../components/DataGridCustomToolbar';
import { useGetTransactionsQuery } from '../../state/apiSlice';
import { useState } from 'react';

const columns = [
  {
    field: '_id',
    headerName: 'Transaction ID',
    flex: 1,
  },
  {
    field: 'userId',
    headerName: 'User ID',
    flex: 1,
  },
  {
    field: 'createdAt',
    headerName: 'Created At',
    flex: 1,
    renderCell: (params) => new Date(params.value).toLocaleString(),
  },
  {
    field: 'products',
    headerName: '# of Products',
    flex: 0.5,
    sortable: false,
    align: 'center',
    renderCell: (params) => params.value.length,
  },
  {
    field: 'cost',
    headerName: 'Cost',
    flex: 1,
    renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
  },
];

const Transactions = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const { data, isLoading, isError } = useGetTransactionsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });

  return (
    <Box m='1.5rem 2.5rem'>
      <Header title='Transactions' subtitle='Entire list of transactions' />
      {data ? (
        <Box
          mt={2}
          height='80vh'
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
            rows={data.data.transactions}
            columns={columns}
            rowCount={data.data.total}
            pagination
            page={page}
            pageSize={pageSize}
            rowsPerPageOptions={[20, 30, 50, 100]}
            paginationMode='server'
            sortingMode='server'
            onPageChange={(newPage) => setPage(newPage)}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            onSortModelChange={(newSortModel) => setSort(...newSortModel)}
            components={{
              Toolbar: DataGridCustomToolbar,
            }}
            componentsProps={{
              toolbar: { searchInput, setSearchInput, setSearch },
            }}
          />
        </Box>
      ) : isLoading ? (
        <Loader mt={5} />
      ) : isError ? (
        <Alert
          mt={4}
          variant='outlined'
          message={'An error ocurred. Please try again later.!'}
        />
      ) : null}
    </Box>
  );
};

export default Transactions;
