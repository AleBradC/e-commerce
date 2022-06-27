import { createSlice } from '@reduxjs/toolkit'

interface initStateProps {
  open: boolean
  close: boolean
  value: string
}

const initialState: initStateProps = {
  open: false,
  close: true,
  value: '',
}

export const searchBarSlice = createSlice({
  name: 'searchBar',
  initialState,
  reducers: {
    openSearchBar: state => {
      state.open = true
      state.close = false
    },
    closeSearchBar: state => {
      state.open = false
      state.close = true
    },
    changeSearchBarValue: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { changeSearchBarValue, openSearchBar, closeSearchBar } = searchBarSlice.actions

export default searchBarSlice.reducer
