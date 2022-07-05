import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Product, ProductCart } from '../types'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }),
  tagTypes: ['Products', 'CartProducts'],
  endpoints: builder => ({
    getProducts: builder.query<Product[], void>({
      query: () => '/api/products',
      providesTags: ['Products'],
    }),

    getProductsCart: builder.query<ProductCart[], void>({
      query: () => '/api/cart',
      providesTags: ['CartProducts'],
    }),
    addProductToCard: builder.mutation<Product[], ProductCart>({
      query: ({ id, brand, name, imageURL, price, quantity }) => ({
        url: `/api/cart/${id}/add`,
        method: 'PUT',
        body: { id, brand, name, imageURL, price, quantity },
      }),
      invalidatesTags: ['CartProducts'],
    }),
    increaseQuantity: builder.mutation<number, { id: number }>({
      query: ({ id }) => ({
        url: `/api/cart/${id}/increaseQuantity`,
        method: 'PUT',
      }),
      invalidatesTags: ['CartProducts'],
    }),
    decreaseQuantity: builder.mutation<number, { id: number }>({
      query: ({ id }) => ({
        url: `/api/cart/${id}/decreaseQuantity`,
        method: 'PUT',
      }),
      invalidatesTags: ['CartProducts'],
    }),
    deleteProductsFromCart: builder.mutation<number, { id: number }>({
      query: ({ id }) => ({
        url: `/api/cart/${id}/delete`,
        method: 'DELETE',
      }),
      invalidatesTags: ['CartProducts'],
    }),
    // TO DO
    deleteAllProductsFromCart: builder.mutation<ProductCart, void>({
      query: () => ({
        url: 'api/delete',
        method: 'DELETE',
      }),
      invalidatesTags: ['CartProducts'],
    }),
  }),
})

export const {
  useGetProductsQuery,
  useAddProductToCardMutation,
  useGetProductsCartQuery,
  useDeleteProductsFromCartMutation,
  useDeleteAllProductsFromCartMutation,
  useIncreaseQuantityMutation,
  useDecreaseQuantityMutation,
} = api
