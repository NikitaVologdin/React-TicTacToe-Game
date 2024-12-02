import { createPortal } from "react-dom"
import { useEffect, useRef } from "react"
import { isModalOpenSelector } from "../app/features/dialogSlice"
import { useAppSelector } from "../app/hooks"

interface IModalProps {
  children: React.ReactNode
}

export default function Modal({ children }: IModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const isModalOpen = useAppSelector(isModalOpenSelector)
  useEffect(() => {
    if (isModalOpen) {
      dialogRef.current?.showModal()
    } else {
      dialogRef.current?.close()
    }
  }, [isModalOpen])

  return createPortal(
    <dialog ref={dialogRef} className="dialog">
      {children}
    </dialog>,
    document.body,
  )
}
