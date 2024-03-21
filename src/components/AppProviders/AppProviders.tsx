'use client'

/**
 * Add all providers here b/c they require client side rendering, and this allow server side rendering for the rest of the app
 */

import { FC, PropsWithChildren } from 'react'
import { I18nProvider, useLocale } from 'react-aria-components'

const AppProviders: FC<PropsWithChildren> = ({ children }) => {
  let { locale, direction } = useLocale()

  // TODO: this html tag won't be render SSR, is that bad for SEO?
  return (
    <html lang={locale} dir={direction}>
      <I18nProvider locale={locale}>{children}</I18nProvider>
    </html>
  )
}

export default AppProviders
