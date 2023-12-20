import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <h1>Landing page!</h1>
      <Link href="/street">Street</Link>
      <Link href="/night">Night</Link>
    </main>
  )
}
