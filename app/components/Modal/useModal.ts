import { useRef } from 'react';

const useModal = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openDialog = () => {
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  return { ref: dialogRef, openDialog, closeDialog };
};

export default useModal;
