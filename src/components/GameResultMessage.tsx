import OIcon from "../components/icons/OIcon"
import XIcon from "../components/icons/XIcon"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import {
  setIsEndRoundMessageShown,
  setIsModalOpen,
} from "../app/features/dialogSlice"
import { useNavigate } from "react-router"
import { motion } from "motion/react"
import { firstPlayersMarkSelector } from "../app/features/configSlice"

interface GameResultMessageProps {
  winnerMark: "x" | "o" | undefined
  isTie: boolean
  restartGame: () => void
}

export default function GameResultMessage({
  winnerMark,
  isTie,
  restartGame,
}: GameResultMessageProps) {
  const icon = winnerMark === "x" ? <XIcon size={64} /> : <OIcon size={64} />
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const firstPlayersMark = useAppSelector(firstPlayersMarkSelector)
  const hasPlayerWon = firstPlayersMark === winnerMark
  function nextGameClickHandler() {
    restartGame()
    dispatch(setIsEndRoundMessageShown(false))
    dispatch(setIsModalOpen(false))
  }
  function quitGameClickHandler() {
    dispatch(setIsEndRoundMessageShown(false))
    dispatch(setIsModalOpen(false))

    restartGame()
    document.startViewTransition(() => {
      navigate("/")
    })
  }

  return (
    <motion.div
      className="message"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {hasPlayerWon && (
        <strong className="message__result">
          {hasPlayerWon ? "YOU WON!" : "OH NO, YOU LOST…"}
        </strong>
      )}
      {isTie && <output className="message__tie">ROUND TIED</output>}
      {winnerMark && (
        <div className={`message__winner message__winner_${winnerMark}`}>
          {icon} TAKES THE ROUND
        </div>
      )}
      <div className="message__controls">
        <button
          className="message__button message__button_quit"
          onClick={quitGameClickHandler}
        >
          quit
        </button>
        <button
          className="message__button message__button_next"
          onClick={nextGameClickHandler}
        >
          next round
        </button>
      </div>
    </motion.div>
  )
}
