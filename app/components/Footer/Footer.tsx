import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <p>Zot goe · BE1008.468.616</p>
      <p>© Brent Timmermans · {currentYear}</p>
    </footer>
  );
}
