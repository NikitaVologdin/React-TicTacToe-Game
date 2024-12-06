import { TGameMode, TMark } from "../Types/configTypes"
import { type IMap } from "../Types/mapTypes"
import { type IPlayersMoves } from "../utils/checkIsWinner"

export interface IPreviousGame {
  map: IMap
  takenMoves: number
  currentPlayer: TMark
  gameMode: TGameMode
  playersMoves: IPlayersMoves
}

export function saveToLocalStorage({
  map,
  takenMoves,
  currentPlayer,
  gameMode,
  playersMoves,
}: IPreviousGame) {
  const object = { map, takenMoves, currentPlayer, gameMode, playersMoves }
  const json = JSON.stringify(object)
  window.localStorage.setItem("game", json)
}

export function checkLocalStorage() {
  let game
  if (window.localStorage.length) {
    game = window.localStorage.getItem("game")
  }
  if (game) {
    return JSON.parse(game)
  }

  return false
}

export function deleteFromLocalStorage() {
  return window.localStorage.clear()
}
