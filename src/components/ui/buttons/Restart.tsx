interface RestartButtonProps {
  onShowRestartMessage: () => void
}

export default function RestartButton({
  onShowRestartMessage,
}: RestartButtonProps) {
  return (
    <button
      className="reset"
      aria-label="Restart game"
      onClick={onShowRestartMessage}
    >
      <img src="/icon-restart.svg" alt="" />
    </button>
  )
}
