import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { type RootState } from "../store"
import {
  type TGameMode,
  type IConfig,
  type TMark,
  type TRoundResult,
} from "../../Types/configTypes"
import { type IMap } from "../../Types/mapTypes"

const initialState: IConfig = {
  firstPlayersMark: "x",
  secondPlayersMark: "o",
  gameMode: undefined,
  startGame: false,
  currentPlayer: "x",
  map: [],
  roundResult: {
    winnerMark: undefined,
    isTie: false,
    winningCombination: [],
  },
}

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setFirstPlayersMark: (state, action: PayloadAction<TMark>) => {
      state.firstPlayersMark = action.payload
    },
    setSecondPlayersMark: (state, action: PayloadAction<TMark>) => {
      state.secondPlayersMark = action.payload
    },
    setGameMode: (state, action: PayloadAction<TGameMode>) => {
      state.gameMode = action.payload
    },
    setStartGame: (state, action: PayloadAction<boolean>) => {
      state.startGame = action.payload
    },
    setCurrentPlayer: (state, action: PayloadAction<TMark>) => {
      state.currentPlayer = action.payload
    },
    setMap: (state, action: PayloadAction<IMap>) => {
      state.map = [...action.payload]
    },
    setRoundResult: (state, action: PayloadAction<TRoundResult>) => {
      state.roundResult = { ...action.payload }
    },
  },
})

export const firstPlayersMarkSelector = (state: RootState) =>
  state.config.firstPlayersMark
export const secondPlayersMarkSelector = (state: RootState) =>
  state.config.secondPlayersMark
export const gameModeSelector = (state: RootState) => state.config.gameMode
export const startGameSelector = (state: RootState) => state.config.startGame
export const currentPlayerSelector = (state: RootState) =>
  state.config.currentPlayer
export const mapSelector = (state: RootState) => state.config.map
export const roundResultSelector = (state: RootState) =>
  state.config.roundResult

// Export the generated action creators for use in components
export const {
  setFirstPlayersMark,
  setSecondPlayersMark,
  setGameMode,
  setStartGame,
  setCurrentPlayer,
  setMap,
  setRoundResult,
} = configSlice.actions

// Export the slice reducer for use in the store configuration
export default configSlice.reducer
