import Image from 'next/image'
import Link from 'next/link'
import styles from './Header.module.css'

const INSTAGRAM_LINK = 'https://www.instagram.com/photos.by.brent'

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/">
        <h1>Photos.by.brent 📸</h1>
      </Link>
      <div>
        <nav>
          <ul>
            <li>
              <Link href="/night">Night</Link>
            </li>
            <li>
              <Link href="/racing">Racing</Link>
            </li>
            <li>
              <Link href="/street">Street</Link>
            </li>
            <li>
              {/* <Link href="/film">Film</Link> */}
              <Link href="/" aria-disabled>
                Film
              </Link>
            </li>
          </ul>
          <ul>
            <li>
              {/* <Link href="/about">About</Link> */}
              <Link href="/" aria-disabled>
                About
              </Link>
            </li>
            <li>
              {/* <Link href="/contact">Contact</Link> */}
              <Link href="/" aria-disabled>
                Contact
              </Link>
            </li>
          </ul>
          <ul className={styles.socials}>
            <li>
              <Link href={INSTAGRAM_LINK}>
                <Image
                  src="/icons/instagram.svg"
                  alt="Instagram icon"
                  width={16}
                  height={16}
                />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
