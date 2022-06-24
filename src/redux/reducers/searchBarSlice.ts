import { createSlice } from '@reduxjs/toolkit'

interface initStateProps {
  open: boolean
  close: boolean
}

const initialState: initStateProps = {
  open: false,
  close: true,
}

const searchBar = createSlice({
  name: 'searchBar',
  initialState,
  reducers: {
    showSearchBar: state => {
      state.open = true
      state.close = false
    },
    closeSearchBar: state => {
      state.open = false
      state.close = true
    },
  },
})

export const { showSearchBar, closeSearchBar } = searchBar.actions

export default reducer
