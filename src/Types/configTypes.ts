import { type IMap } from "./mapTypes"

export type TMark = "x" | "o"
export type TGameMode = "player" | "cpu" | undefined
export type TRoundResult = {
  winnerMark: TMark | undefined
  isTie: boolean
  winningCombination: number[]
}

export interface IConfig {
  firstPlayersMark: TMark
  secondPlayersMark: TMark
  gameMode: TGameMode
  startGame: boolean
  currentPlayer: TMark
  map: IMap
  roundResult: TRoundResult
}
