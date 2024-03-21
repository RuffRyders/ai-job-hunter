import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { I18nProvider, useLocale } from 'react-aria-components'

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
  let { locale, direction } = useLocale()

  return (
    <html lang={locale} dir={direction} className="dark">
      <I18nProvider locale={locale}>
        <body className={inter.className}>
          <main className="h-full dark text-foreground bg-background">
            {children}
          </main>
        </body>
      </I18nProvider>
    </html>
  )
}
