import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { type RootState } from "../store"

const initialState = {
  isModalOpen: false,
  isRestartMessageShown: false,
  isEndRoundMessageShown: false,
}

export const configSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    setIsModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload
    },
    setIsRestartMessageShown: (state, action: PayloadAction<boolean>) => {
      state.isRestartMessageShown = action.payload
    },
    setIsEndRoundMessageShown: (state, action: PayloadAction<boolean>) => {
      state.isEndRoundMessageShown = action.payload
    },
  },
})

export const isModalOpenSelector = (state: RootState) =>
  state.dialog.isModalOpen
export const isRestartMessageShownSelector = (state: RootState) =>
  state.dialog.isRestartMessageShown
export const isEndRoundMessageShownSelector = (state: RootState) =>
  state.dialog.isEndRoundMessageShown

// Export the generated action creators for use in components
export const {
  setIsModalOpen,
  setIsRestartMessageShown,
  setIsEndRoundMessageShown,
} = configSlice.actions

// Export the slice reducer for use in the store configuration
export default configSlice.reducer
