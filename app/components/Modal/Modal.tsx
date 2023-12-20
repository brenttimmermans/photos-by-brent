'use client'

import { FC, PropsWithChildren, forwardRef } from 'react'
import styles from './Modal.module.css'

interface Props {
  onClose: () => void
}

const Modal = forwardRef<HTMLDialogElement, PropsWithChildren<Props>>(
  ({ children, onClose }, ref) => (
    <dialog ref={ref} className={styles.dialog}>
      <CloseButton onClick={onClose} />
      {children}
    </dialog>
  ),
)

Modal.displayName = 'Modal'

interface CloseButtonProps {
  onClick: () => void
}

const CloseButton: FC<CloseButtonProps> = ({ onClick }) => (
  <button onClick={onClick} className={styles.closeButton}>
    &times;
  </button>
)

export default Modal
