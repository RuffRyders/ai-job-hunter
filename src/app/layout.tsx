import AppProviders from './_providers'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AppHeader from '@/features/header/ui/AppHeader'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Job Hunter',
  description: 'AI Job Hunting Assistant',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProviders>
          <header>
            <AppHeader />
          </header>

          <main>{children}</main>
        </AppProviders>
      </body>
    </html>
  )
}
