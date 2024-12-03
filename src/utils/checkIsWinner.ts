import { IMap } from "../Types/mapTypes"

export default function checkIsWinner<T>(currentPlayer: T, map: IMap) {
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

  return {
    mark: "x",
    winningCombination: [2, 4, 6],
  }
  if (winner?.winningCombination) {
    return winner
  } else {
    return false
  }
}
