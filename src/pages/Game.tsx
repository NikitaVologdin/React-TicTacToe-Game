import { useState, useEffect, useRef, useCallback } from "react"
import Logo from "../components/Logo"

import {
  gameModeSelector,
  startGameSelector,
  setStartGame,
  firstPlayersMarkSelector,
  secondPlayersMarkSelector,
  currentPlayerSelector,
  setCurrentPlayer,
  mapSelector,
  setMap,
  setRoundResult,
  roundResultSelector,
} from "../app/features/configSlice"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import Dialog from "../components/Dialog"
import GameResultMessage from "../components/GameResultMessage"
import {
  setIsModalOpen,
  isRestartMessageShownSelector,
  isEndRoundMessageShownSelector,
  setIsRestartMessageShown,
  setIsEndRoundMessageShown,
} from "../app/features/dialogSlice"
import RestartGameMessage from "../components/RestartGameMessage"
import { AnimatePresence } from "motion/react"
import RestartButton from "../components/ui/buttons/Restart"
import CurrentPlayerDisplay from "../components/ui/CurrentPlayerDisplay"
import { type IMap } from "../Types/mapTypes"
import { type TMark } from "../Types/configTypes"
import Pitch from "../components/Pitch"
import Score from "../components/Score"
import checkIsWinner from "../utils/checkIsWinner"
import createNewMap from "../utils/createNewMap"

export default function Game() {
  const [takenMoves, setTakenMoves] = useState(0)

  const currentPlayer = useAppSelector(currentPlayerSelector)
  const gameMode = useAppSelector(gameModeSelector)
  const startNewGame = useAppSelector(startGameSelector)
  const isEndRoundMessageShown = useAppSelector(isEndRoundMessageShownSelector)
  const isRestartMessageShown = useAppSelector(isRestartMessageShownSelector)
  const map = useAppSelector(mapSelector)
  const roundResult = useAppSelector(roundResultSelector)

  const firstPlayersMark = useAppSelector(firstPlayersMarkSelector)
  const secondPlayersMark = useAppSelector(secondPlayersMarkSelector)

  const dispatch = useAppDispatch()

  const firstPlayerWon = useRef(0)
  const secondPlayerWon = useRef(0)
  const ties = useRef(0)

  interface IPlayersMoves {
    x: number[]
    o: number[]
  }
  const { current: playersMoves } = useRef<IPlayersMoves>({ x: [], o: [] })

  const nextPlayer = useCallback(
    function () {
      const nextPlayer = currentPlayer === "x" ? "o" : "x"
      dispatch(setCurrentPlayer(nextPlayer))
    },
    [currentPlayer, dispatch],
  )

  const makeMove = useCallback(
    function (index: number) {
      const clickedTile = map[index]
      if (clickedTile.disabled) return

      playersMoves[currentPlayer].push(index)

      const newMap = createNewMap(map, index, currentPlayer)

      const winner = checkIsWinner(currentPlayer, playersMoves)
      if (winner) {
        dispatch(
          setRoundResult({
            winnerMark: winner.mark,
            isTie: false,
            winningCombination: winner.winningCombination,
          }),
        )
      }

      dispatch(setMap(newMap))

      setTakenMoves(prevAmount => prevAmount + 1)
      nextPlayer()
    },
    [currentPlayer, dispatch, map, nextPlayer],
  )

  const CPUDecision = useCallback(
    function (map: IMap) {
      function getPlayerIndexes(playersMark: TMark, map: IMap) {
        return map
          .filter(tile => tile.mark === playersMark)
          .map(tile => tile.index)
      }
      function getAvailableIndexes(map: IMap) {
        return map.filter(tile => !tile.disabled).map(tile => tile.index)
      }
      function getRandomIndex(array: number[]) {
        return array[Math.floor(Math.random() * array.length)]
      }

      const availableTiles = getAvailableIndexes(map)
      const firstPlayerIndexes = getPlayerIndexes(firstPlayersMark, map)
      const cpuIndexes = getPlayerIndexes(secondPlayersMark, map)

      const random = getRandomIndex(availableTiles)
      return random
    },
    [firstPlayersMark, secondPlayersMark],
  )

  const checkAvailableMoves = useCallback(
    function () {
      return takenMoves !== map.length
    },
    [map.length, takenMoves],
  )

  useEffect(() => {
    function createMap(tiles: string[]) {
      const map = tiles.map((location, index) => {
        return {
          location: location,
          mark: undefined,
          index: index,
          disabled: false,
        }
      })
      return map
    }
    const tiles = [
      "top-left",
      "top-center",
      "top-right",
      "center-left",
      "center-center",
      "center-right",
      "bottom-left",
      "bottom-center",
      "bottom-right",
    ]

    if (startNewGame) {
      const newMap = createMap(tiles)
      dispatch(setMap(newMap))
      dispatch(setStartGame(false))
    }
  }, [startNewGame, dispatch])

  useEffect(() => {
    if (roundResult.winnerMark || roundResult.isTie) return
    if (map.length && roundResult.winnerMark === undefined) {
      const isAvailableMove = checkAvailableMoves()
      if (!isAvailableMove) {
        dispatch(
          setRoundResult({
            winnerMark: undefined,
            isTie: true,
            winningCombination: [],
          }),
        )
      }
    }
  }, [
    takenMoves,
    map.length,
    checkAvailableMoves,
    roundResult,
    isEndRoundMessageShown,
    dispatch,
  ])

  useEffect(() => {
    if (roundResult.winnerMark || roundResult.isTie) {
      dispatch(setIsModalOpen(true))
      dispatch(setIsEndRoundMessageShown(true))
    }
    if (roundResult.winnerMark === "x") {
      firstPlayerWon.current += 1
    }
    if (roundResult.winnerMark === "o") {
      secondPlayerWon.current += 1
    }
    if (roundResult.isTie) {
      ties.current += 1
    }
  }, [roundResult, dispatch])

  useEffect(() => {
    if (gameMode !== "cpu") return
    if (startNewGame) return
    if (roundResult.winnerMark || roundResult.isTie) return
    if (!checkAvailableMoves()) return
    if (currentPlayer === secondPlayersMark) {
      const index = CPUDecision(map)
      makeMove(index)
    }
  }, [
    gameMode,
    currentPlayer,
    secondPlayersMark,
    startNewGame,
    CPUDecision,
    map,
    makeMove,
    roundResult,
    checkAvailableMoves,
  ])

  function restartGame() {
    setTakenMoves(0)
    dispatch(setStartGame(true))
    dispatch(setCurrentPlayer("x"))
    dispatch(
      setRoundResult({
        winnerMark: undefined,
        isTie: false,
        winningCombination: [],
      }),
    )
    playersMoves.x = []
    playersMoves.o = []
  }

  function showRestartMessageHandler() {
    dispatch(setIsModalOpen(true))
    dispatch(setIsRestartMessageShown(true))
  }

  return (
    <>
      <header className="game__header">
        <Logo />
        <CurrentPlayerDisplay currentPlayer={currentPlayer} />
        <RestartButton onShowRestartMessage={showRestartMessageHandler} />
      </header>
      <main className="game__main">
        <Pitch map={map} makeMove={makeMove} />
        <Score
          firstPlayerWon={firstPlayerWon.current}
          ties={ties.current}
          secondPlayerWon={secondPlayerWon.current}
          gameMode={gameMode}
        />
      </main>
      <Dialog>
        <AnimatePresence>
          {isEndRoundMessageShown && (
            <GameResultMessage
              winnerMark={roundResult?.winnerMark}
              isTie={roundResult.isTie}
              restartGame={restartGame}
            />
          )}
          {isRestartMessageShown && (
            <RestartGameMessage
              restartGame={restartGame}
              key="game result message"
            />
          )}
        </AnimatePresence>
      </Dialog>
    </>
  )
}
