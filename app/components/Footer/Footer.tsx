import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      © Brent Timmermans · {currentYear}
    </footer>
  );
}
