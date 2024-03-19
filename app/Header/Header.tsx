import Image from 'next/image'
import Link from 'next/link'
import styles from './Header.module.css'
import CustomLink from './Link'

const INSTAGRAM_LINK = 'https://www.instagram.com/photos.by.brent'

const categorieRoutes = [
  {
    name: 'Night',
    path: '/night',
  },
  {
    name: 'Racing',
    path: '/racing',
  },
  {
    name: 'Street',
    path: '/street',
  },
  {
    name: 'Nature',
    path: '/nature',
  },
]

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/">
        <h1>Photos.by.brent 📸</h1>
      </Link>
      <div>
        <nav>
          <ul>
            {categorieRoutes.map(({ name, path }) => (
              <li key={name}>
                <CustomLink path={path}>{name}</CustomLink>
              </li>
            ))}
          </ul>
          <ul>
            <li>
              {/* <CustomLink href="/about">About</CustomLink> */}
              <CustomLink path="/" disabled>
                About
              </CustomLink>
            </li>
            <li>
              {/* <CustomLink href="/contact">Contact</CustomLink> */}
              <CustomLink path="/" disabled>
                Contact
              </CustomLink>
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
