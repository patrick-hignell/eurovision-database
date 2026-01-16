// DialogModal.tsx
import React, { useRef, useEffect, ReactNode } from 'react'

// Define the props interface with TypeScript
interface DialogModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

const DialogModal: React.FC<DialogModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  // Use useRef to access the native <dialog> element
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen) {
      // Use showModal() for a modal dialog that interrupts interaction with the rest of the page
      dialog.showModal()
    } else {
      dialog.close()
    }

    // Handle closing via the Escape key or dialog.close()
    const handleClose = () => {
      onClose()
    }
    dialog.addEventListener('close', handleClose)

    return () => {
      dialog.removeEventListener('close', handleClose)
    }
  }, [isOpen, onClose]) // Re-run effect when isOpen or onClose changes

  return (
    <dialog ref={dialogRef} className="dialog-modal bg-transparent">
      {children}
    </dialog>
  )
}

export default DialogModal
