import { TMark } from "../Types/configTypes"

interface IPlayersMoves {
  x: number[]
  o: number[]
}

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

function checkCombination(
  combination: number[],
  playerIndexes: number[],
  mark: TMark,
) {
  let result: { mark: TMark; winningCombination: number[] } = {
    mark,
    winningCombination: [],
  }
  for (let i = 0; i < playerIndexes.length; i++) {
    const first = playerIndexes.includes(combination[0])
    const second = playerIndexes.includes(combination[1])
    const third = playerIndexes.includes(combination[2])

    if (first && second && third) {
      result.winningCombination = combination
    }
  }
  return result
}

function isWinningCombination(
  playerIndexes: number[],
  combinations: Array<number[]>,
  mark: TMark,
) {
  for (let combination of combinations) {
    const result = checkCombination(combination, playerIndexes, mark)
    if (result.winningCombination.length) {
      return result
    }
  }
}

export default function checkIsWinner(
  currentPlayer: TMark,
  playersMoves: IPlayersMoves,
) {
  const currentPlayerIndexes = playersMoves[currentPlayer]
  if (currentPlayerIndexes.length < 3) return

  const winner = isWinningCombination(
    currentPlayerIndexes,
    winningCombinations,
    currentPlayer,
  )

  if (winner?.winningCombination) return winner

  return false
}
