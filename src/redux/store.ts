import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { api } from './api'
import { searchBarSlice } from './reducers/searchBarSlice'
import { bagDrawerSlice } from './reducers/bagDrawerSlice'

export const reducer = combineReducers({
  [api.reducerPath]: api.reducer,

  // OTHERS REDUCERS
  [searchBarSlice.name]: searchBarSlice.reducer,
  [bagDrawerSlice.name]: bagDrawerSlice.reducer,
})

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
