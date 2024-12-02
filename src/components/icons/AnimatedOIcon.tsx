import { type IconProps } from "../../Types/IconType"
import { motion } from "motion/react"

export default function OIcon({ size, className }: IconProps) {
  const width = size
  const height = size
  const viewBox = `0 0 64 64`

  return (
    <motion.svg
      width={width}
      height={height}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      className={className ? className : ""}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
    >
      <path
        d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z"
        fill=""
      />
    </motion.svg>
  )
}
