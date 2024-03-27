import AppProviders from './_providers'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

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
          <main className="h-full">{children}</main>
        </AppProviders>
      </body>
    </html>
  )
}
