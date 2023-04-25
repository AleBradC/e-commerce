import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface initStateProps {
  isSearchBarOpen: boolean
  value: string
}

const initialState: initStateProps = {
  isSearchBarOpen: false,
  value: '',
}

export const searchBarSlice = createSlice({
  name: 'searchBar',
  initialState,
  reducers: {
    toggleSearchBar: (state, action: PayloadAction<boolean>) => {
      state.isSearchBarOpen = action.payload
    },
    changeSearchBarValue: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { changeSearchBarValue, toggleSearchBar } = searchBarSlice.actions

export default searchBarSlice.reducer
