import OIcon from "../../components/icons/OIcon"
import XIcon from "../../components/icons/XIcon"

interface CurrentPlayerDisplayProps {
  currentPlayer: "x" | "o"
}

export default function CurrentPlayerDisplay({
  currentPlayer,
}: CurrentPlayerDisplayProps) {
  return (
    <div className="turn-display">
      <div className="turn-display__icon">
        {currentPlayer === "x" ? <XIcon size={16} /> : <OIcon size={16} />}
      </div>
      <span>turn</span>
    </div>
  )
}
