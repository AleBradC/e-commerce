import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ProductCartType, ProductInfoType, ProductType } from '../helpers/types'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }),
  tagTypes: [
    'Products',
    'CartProducts',
    'BrowsProduct',
    'MascaraProducts',
    'LipGlossesProducts',
    'LipSticksProducts',
    'CleansersProducts',
    'MoisturizersProducts',
    'FaceOilsProducts',
    'FaceSerumsProducts',
    'NewArrivalProducts',
    'Product',
  ],
  endpoints: builder => ({
    getProducts: builder.query<ProductType[], void>({
      query: () => '/api/products',
      providesTags: ['Products'],
    }),
    getBrowsProducts: builder.query<ProductType[], void>({
      query: () => '/api/products/brows-products',
      providesTags: ['BrowsProduct'],
    }),
    getMascaraProducts: builder.query<ProductType[], void>({
      query: () => '/api/products/mascara-products',
      providesTags: ['MascaraProducts'],
    }),
    getLipGlossesProducts: builder.query<ProductType[], void>({
      query: () => '/api/products/lip-glosses-products',
      providesTags: ['LipGlossesProducts'],
    }),
    getLipSticksProducts: builder.query<ProductType[], void>({
      query: () => '/api/products/lip-sticks-products',
      providesTags: ['LipSticksProducts'],
    }),
    getCleansersProducts: builder.query<ProductType[], void>({
      query: () => '/api/products/cleansers-products',
      providesTags: ['CleansersProducts'],
    }),
    getMoisturizersProducts: builder.query<ProductType[], void>({
      query: () => '/api/products/moisturizers-products',
      providesTags: ['MoisturizersProducts'],
    }),
    getFaceOilsProducts: builder.query<ProductType[], void>({
      query: () => '/api/products/face-oils-products',
      providesTags: ['FaceOilsProducts'],
    }),
    getFaceSerumsProducts: builder.query<ProductType[], void>({
      query: () => '/api/products/face-serums-products',
      providesTags: ['FaceSerumsProducts'],
    }),

    getNewArrivalsProducts: builder.query<ProductType[], void>({
      query: () => '/api/products/new-arrival-products',
      providesTags: ['NewArrivalProducts'],
    }),

    getProductsCart: builder.query<ProductCartType[], void>({
      query: () => '/api/cart',
      providesTags: ['CartProducts'],
    }),
    addProductToCard: builder.mutation<ProductType[], ProductCartType>({
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
    deleteAllProductsFromCart: builder.mutation<ProductCartType, void>({
      query: () => ({
        url: '/api/cart/delete',
        method: 'DELETE',
      }),
      invalidatesTags: ['CartProducts'],
    }),
    getProductById: builder.query<ProductInfoType, { productID: string | undefined }>({
      query: ({ productID }) => `/api/productInfo/product/${productID}`,
      providesTags: ['Product'],
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
  useGetBrowsProductsQuery,
  useGetMascaraProductsQuery,
  useGetLipGlossesProductsQuery,
  useGetLipSticksProductsQuery,
  useGetCleansersProductsQuery,
  useGetMoisturizersProductsQuery,
  useGetFaceOilsProductsQuery,
  useGetFaceSerumsProductsQuery,
  useGetNewArrivalsProductsQuery,
  useGetProductByIdQuery,
} = api
