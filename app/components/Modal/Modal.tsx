'use client';

import { PropsWithChildren, forwardRef } from 'react';
import Close from './Close';
import Loader from './Loader';
import styles from './Modal.module.css';

interface Props {
  onClose: () => void;
  isLoading?: boolean;
}

const Modal = forwardRef<HTMLDialogElement, PropsWithChildren<Props>>(
  ({ children, isLoading = false, onClose }, ref) => (
    <dialog ref={ref} className={styles.dialog}>
      {isLoading && <Loader />}

      {!isLoading && <Close onClick={onClose} />}
      <div style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
        {children}
      </div>
    </dialog>
  ),
);

Modal.displayName = 'Modal';

export default Modal;
