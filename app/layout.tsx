import Header from '@/app/Header/Header'
import '@/app/globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata: Metadata = {
  title: 'photos.by.brent',
  description: 'Photography portfolio by Brent Timmermans',
}

interface Props {
  children: React.ReactNode
  modal: React.ReactNode
}

export default function RootLayout({ children, modal }: Props) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Header />
        <main>{children}</main>
        {modal}
      </body>
    </html>
  )
}
