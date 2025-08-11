import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ARIM - Azərbaycan Reklam İstehsalat Mərkəzi',
  description: 'Azərbaycanın aparıcı reklam və marketinq şirkəti. Daxili və çöl reklamları, rəqəmsal marketinq, veb sayt hazırlanması və daha çox.',
  keywords: 'reklam, marketinq, Azərbaycan, bilbord, rəqəmsal marketinq, veb sayt',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="az">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
