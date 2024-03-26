import styles from './Close.module.css';

interface CloseButtonProps {
  onClick: () => void;
}

export default function Close({ onClick }: CloseButtonProps) {
  return (
    <button onClick={onClick} className={styles.close}>
      &times;
    </button>
  );
}
