import { type TGameMode } from "../Types/configTypes"
import {
  firstPlayersMarkSelector,
  gameModeSelector,
} from "../app/features/configSlice"
import { useAppSelector } from "../app/hooks"

interface ScoreProps {
  firstPlayerWon: number
  secondPlayerWon: number
  ties: number
  gameMode: TGameMode
}

export default function Score({
  firstPlayerWon,
  ties,
  secondPlayerWon,
}: ScoreProps) {
  const firstPlayersMark = useAppSelector(firstPlayersMarkSelector)
  const gameMode = useAppSelector(gameModeSelector)

  let playerMode = gameMode === "player"
  let cpuMode = gameMode === "cpu"
  let isFirstPlayerX = firstPlayersMark === "x"
  let isFirstPlayerO = firstPlayersMark === "o"
  let xDescription = ""
  let oDescription = ""

  if (playerMode && isFirstPlayerX) {
    xDescription = "P1"
    oDescription = "P2"
  }

  if (playerMode && isFirstPlayerO) {
    xDescription = "P2"
    oDescription = "P1"
  }

  if (cpuMode && isFirstPlayerX) {
    xDescription = "You"
    oDescription = "CPU"
  }

  if (cpuMode && isFirstPlayerO) {
    xDescription = "CPU"
    oDescription = "You"
  }

  return (
    <div className="game__result result">
      <div className="result__display result__x">
        <span className="result__description">X ({xDescription})</span>
        <span className="result__counter">{firstPlayerWon}</span>
      </div>
      <div className="result__display result__ties">
        <span className="result__description">TIES</span>
        <span className="result__counter">{ties}</span>
      </div>
      <div className="result__display result__o">
        <span className="result__description">O ({oDescription})</span>
        <span className="result__counter">{secondPlayerWon}</span>
      </div>
    </div>
  )
}
