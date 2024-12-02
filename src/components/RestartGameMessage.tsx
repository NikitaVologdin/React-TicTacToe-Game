import {
  setIsModalOpen,
  setIsRestartMessageShown,
} from "../app/features/dialogSlice"
import { useAppDispatch } from "../app/hooks"
import { motion } from "motion/react"

interface restartGameMessageProps {
  restartGame: () => void
}

export default function RestartGameMessage({
  restartGame,
}: restartGameMessageProps) {
  function cancelHandler() {
    dispatch(setIsRestartMessageShown(false))
    dispatch(setIsModalOpen(false))
  }
  function restartHandler() {
    restartGame()
    dispatch(setIsRestartMessageShown(false))
    dispatch(setIsModalOpen(false))
  }
  const dispatch = useAppDispatch()
  return (
    <motion.div
      className="message"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <p className="message__restart">RESTART GAME?</p>
      <div className="message__controls">
        <button
          className="message__button message__button_quit"
          onClick={cancelHandler}
        >
          No, Cancel
        </button>
        <button
          className="message__button message__button_next"
          onClick={restartHandler}
        >
          Yes, Restart
        </button>
      </div>
    </motion.div>
  )
}
