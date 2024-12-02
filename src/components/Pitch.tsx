import { useEffect, useState } from "react"
import { type IMap } from "../Types/mapTypes"
import { AnimatePresence } from "motion/react"
import OIcon from "../components/icons/OIcon"
import XIcon from "../components/icons/XIcon"
import XOutlinedIcon from "../components/icons/XOutlineIcon"
import OOutlinedIcon from "../components/icons/OOutlineIcon"
import { type TMark } from "../Types/configTypes"
import {
  currentPlayerSelector,
  mapSelector,
  roundResultSelector,
  startGameSelector,
} from "../app/features/configSlice"
import { useAppSelector } from "../app/hooks"
import XOutlineIcon from "../components/icons/XOutlineIcon"

interface PitchProps {
  map: IMap
  makeMove: (index: number) => void
}

interface PitchTileProps {
  index: number
  makeMove: (index: number) => void
  mark: TMark | undefined
}

function PitchTile({ index, makeMove, mark }: PitchTileProps) {
  const [isHovered, setHovered] = useState(false)

  const map = useAppSelector(mapSelector)
  const currentPlayer = useAppSelector(currentPlayerSelector)
  const isNewGameStarted = useAppSelector(startGameSelector)
  const roundResult = useAppSelector(roundResultSelector)

  const availableIndexes = getAvailableIndexes(map)
  const isAvailable = availableIndexes.includes(index)

  useEffect(() => {
    if (isNewGameStarted) {
      setHovered(false)
    }
  }, [isNewGameStarted])

  function getAvailableIndexes(map: IMap) {
    const availableTiles = map.filter(tile => !tile.disabled)
    const availableIndexes = availableTiles.map(tile => tile.index)
    return availableIndexes
  }

  function drawMark(mark: "x" | "o" | undefined) {
    if (mark === undefined) {
      return
    }
    if (
      roundResult.winnerMark === "x" &&
      roundResult.winningCombination.includes(index)
    ) {
      return <XOutlineIcon size={65} stroke="" fill="var(--semi-dark-navy)" />
    }
    if (
      roundResult.winnerMark === "o" &&
      roundResult.winningCombination.includes(index)
    ) {
      return <OOutlinedIcon size={65} stroke="" fill="var(--semi-dark-navy)" />
    }
    if (mark === "x") {
      return <XIcon size={65} className="mark__x" />
    }
    if (mark === "o") {
      return <OIcon size={65} className="mark__o" />
    }
  }

  const xPlayerOutlinedIcon = (
    <XOutlinedIcon
      size={64}
      className=""
      ariaLabel=""
      stroke="var(--light-blue)"
      fill="var(--semi-dark-navy)"
    />
  )
  const oPlayerOutlinedIcon = (
    <OOutlinedIcon
      size={64}
      className=""
      ariaLabel=""
      stroke="var(--light-yellow)"
      fill="var(--semi-dark-navy)"
    />
  )
  const currentPlayerIcon =
    currentPlayer === "x" ? xPlayerOutlinedIcon : oPlayerOutlinedIcon

  const location = map[index].location

  return (
    <button
      className="pitch__tile"
      onClick={() => {
        makeMove(index)
      }}
      onMouseOver={() => {
        setHovered(true)
      }}
      onMouseLeave={() => {
        setHovered(false)
      }}
      aria-label={`Add ${currentPlayer} flag to ${location}`}
    >
      <AnimatePresence>{drawMark(mark)}</AnimatePresence>
      {isHovered && isAvailable ? currentPlayerIcon : null}
    </button>
  )
}

export default function Pitch({ map, makeMove }: PitchProps) {
  return (
    <div className="game__pitch pitch">
      {map.map((item, index) => {
        return (
          <PitchTile
            index={item.index}
            makeMove={makeMove}
            mark={item.mark}
            key={item.location}
          />
        )
      })}
    </div>
  )
}
