import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  reducerPath: 'adminApi',
  tagTypes: [
    'User',
    'Products',
    'Customers',
    'Transactions',
    'Geography',
    'Sales',
    'Admins',
    'Performance',
    'Dashboard',
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ['User'],
    }),

    getProducts: build.query({
      query: () => 'client/products',
      providesTags: ['Products'],
    }),

    getCustomers: build.query({
      query: () => 'client/customers',
      providesTags: ['Customers'],
    }),

    getTransactions: build.query({
      query: (urlParams) => ({
        url: 'client/transactions',
        method: 'GET',
        params: { ...urlParams },
      }),
      providesTags: ['Transactions'],
    }),

    getGeography: build.query({
      query: () => 'client/geography',
      providesTags: ['Geography'],
    }),

    getSales: build.query({
      query: () => 'sales/sales',
      providesTags: ['Sales'],
    }),

    getAdmins: build.query({
      query: () => 'management/admins',
      providesTags: ['Admins'],
    }),

    getUserPerformance: build.query({
      query: (userId) => `management/performance/${userId}`,
      providesTags: ['Performance'],
    }),

    getDashboardData: build.query({
      query: () => 'general/dashboard',
      providesTags: ['Dashboard'],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
  useGetDashboardDataQuery,
} = apiSlice;
