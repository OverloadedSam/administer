import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  reducerPath: 'adminApi',
  tagTypes: ['User', 'Products', 'Customers', 'Transactions'],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ['User'],
    }),
    getProducts: build.query({
      query: () => `client/products`,
      providesTags: ['Products'],
    }),
    getCustomers: build.query({
      query: () => `client/customers`,
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
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
} = apiSlice;
