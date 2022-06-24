import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { api } from './api'
import searchBarSlice from './reducers/searchBarSlice'

export const reducer = combineReducers({
  reducer: {
    [api.reducerPath]: api.reducer,

    // other reducers
    [searchBarSlice.name]: searchBarSlice.reducer,
  },
})

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
