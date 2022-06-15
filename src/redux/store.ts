import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { api } from './api'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// export const reducer = combineReducers({
//   reducer: {
//     [api.reducerPath]: api.reducer,
//
//     // other reducers
//     // [navigationSlice.name]: navigationSlice.reducer
//   },
// })
//
// export const store = configureStore({
//   reducer,
//   middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware),
// })
