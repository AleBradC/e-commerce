import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface initStateProps {
  isOpenBagDrawer: boolean
}

const initialState: initStateProps = {
  isOpenBagDrawer: false,
}

export const bagDrawerSlice = createSlice({
  name: 'bagDrawer',
  initialState,
  reducers: {
    toggleBagDrawer: (state, action: PayloadAction<boolean>) => {
      state.isOpenBagDrawer = action.payload
    },
  },
})

export const { toggleBagDrawer } = bagDrawerSlice.actions

export default bagDrawerSlice.reducer
