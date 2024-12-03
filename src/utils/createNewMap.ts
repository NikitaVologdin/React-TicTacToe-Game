import { TMark } from "../Types/configTypes"
import { IMap } from "../Types/mapTypes"

export default function createNewMap(
  map: IMap,
  index: number,
  currentPlayer: TMark,
) {
  const newMap = structuredClone(map)
  const tileData = newMap[index]
  tileData.mark = currentPlayer
  tileData.disabled = true
  return newMap
}
