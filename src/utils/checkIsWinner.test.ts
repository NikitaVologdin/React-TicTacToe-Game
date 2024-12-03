import { expect, test } from "vitest"
import checkIsWinner from "./checkIsWinner"
import { ITileData } from "../Types/mapTypes"

const currentPlayer = "x"
const map: ITileData[] = [
  {
    location: "top-left",
    mark: "x",
    index: 0,
    disabled: true,
  },
  {
    location: "top-center",
    mark: "o",
    index: 1,
    disabled: true,
  },
  {
    location: "top-right",
    mark: "x",
    index: 2,
    disabled: true,
  },
  {
    location: "center-left",
    mark: "x",
    index: 3,
    disabled: true,
  },
  {
    location: "center-center",
    mark: "x",
    index: 4,
    disabled: true,
  },
  {
    location: "center-right",
    mark: "o",
    index: 5,
    disabled: true,
  },
  {
    location: "bottom-left",
    mark: "x",
    index: 6,
    disabled: true,
  },
  {
    location: "bottom-center",
    mark: "o",
    index: 7,
    disabled: true,
  },
  {
    location: "bottom-right",
    mark: "o",
    index: 8,
    disabled: true,
  },
]

test("test is a winning combination", () => {
  expect(checkIsWinner(currentPlayer, map)).toStrictEqual({
    mark: "x",
    winningCombination: [2, 4, 6],
  })
})
