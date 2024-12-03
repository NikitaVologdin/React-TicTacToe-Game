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

  const nextPlayer = useCallback(
    function () {
      const nextPlayer = currentPlayer === "x" ? "o" : "x"
      dispatch(setCurrentPlayer(nextPlayer))
    },
    [currentPlayer, dispatch],
  )

  const makeMove = useCallback(
    function (index: number) {
      function createNewMap(map: IMap, index: number) {
        const newMap = structuredClone(map)
        const tileData = newMap[index]
        tileData.mark = currentPlayer
        tileData.disabled = true
        return newMap
      }

      function checkIsWinner<T>(currentPlayer: T, map: IMap) {
        const winningCombinations = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ]
        function getAllTiles<T>(mark: T, map: IMap) {
          const filteredMap = map.filter(tile => {
            return tile.mark === mark
          })
          const tilesIndexes = filteredMap.map(tileData => tileData.index)
          return tilesIndexes
        }

        function isWinningCombination<T>(
          tilesWithMark: number[],
          combinations: Array<number[]>,
          mark: T,
        ) {
          function checkCombination<T>(
            combination: number[],
            tilesWithMark: number[],
            mark: T,
          ) {
            for (let i = 0; i < tilesWithMark.length; i++) {
              const first = tilesWithMark[0 + i]
              const second = tilesWithMark[1 + i]
              const third = tilesWithMark[2 + i]

              if (third === undefined) {
                break
              }

              if (
                combination[0] === first &&
                combination[1] === second &&
                combination[2] === third
              ) {
                return { mark, winningCombination: [first, second, third] }
              }
            }
          }
          for (let combination of combinations) {
            const result = checkCombination(combination, tilesWithMark, mark)
            if (result?.winningCombination) {
              return result
            }
          }
        }
        const tilesWithMark = getAllTiles(currentPlayer, map)
        if (tilesWithMark.length < 3) return

        const winner = isWinningCombination(
          tilesWithMark,
          winningCombinations,
          currentPlayer,
        )
        if (winner?.winningCombination) {
          return winner
        } else {
          return false
        }
      }

      const clickedTile = map[index]
      if (clickedTile.disabled) return

      const newMap = createNewMap(map, index)
      const winner = checkIsWinner<TMark>(currentPlayer, newMap)

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
    // if (isEndRoundMessageShown) return
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
