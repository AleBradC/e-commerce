import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Product } from '../Types'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }),
  tagTypes: ['Products'],
  endpoints: builder => ({
    getProducts: builder.query<Product[], void>({
      query: () => '/api/products',
    }),
  }),
})

export const { useGetProductsQuery } = api
