import { expect, test } from "vitest"
import checkIsWinner from "./checkIsWinner"

const playersIndexes = { x: [7, 1, 4], o: [2, 3, 6] }

test("test is a winning combination", () => {
  expect(checkIsWinner("x", playersIndexes)).toStrictEqual({
    mark: "x",
    winningCombination: [1, 4, 7],
  })
})
test("test is a not winning combination", () => {
  expect(checkIsWinner("o", playersIndexes)).toBe(false)
})
