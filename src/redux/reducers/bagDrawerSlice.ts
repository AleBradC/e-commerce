import { createSlice } from '@reduxjs/toolkit'

interface initStateProps {
  open: boolean
  close: boolean
}

const initialState: initStateProps = {
  open: false,
  close: true,
}

export const bagDrawerSlice = createSlice({
  name: 'bagDrawer',
  initialState,
  reducers: {
    openBagDrawer: state => {
      state.open = true
      state.close = false
    },
    closeBagDrawer: state => {
      state.open = false
      state.close = true
    },
  },
})

export const { openBagDrawer, closeBagDrawer } = bagDrawerSlice.actions

export default bagDrawerSlice.reducer
