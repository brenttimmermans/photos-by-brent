import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
  return (
    <div className={styles.grid}>
      <Link href="/night" className={styles.night}>
        <section>
          <div className={styles.text}>Night</div>
          <div className={styles.background} />
        </section>
      </Link>
      <Link href="/racing" className={styles.racing}>
        <section>
          <div className={styles.text}>Racing</div>
          <div className={styles.background} />
        </section>
      </Link>
      <Link href="/street" className={styles.street}>
        <section>
          <div className={styles.text}>Street</div>
          <div className={styles.background} />
        </section>
      </Link>
      <Link href="/nature" className={styles.nature}>
        <section>
          <div className={styles.text}>Nature</div>
          <div className={styles.background} />
        </section>
      </Link>
    </div>
  )
}
