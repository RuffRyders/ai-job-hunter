'use client'

/**
 * Add all providers here b/c they require client side rendering, and this allow server side rendering for the rest of the app
 */

import { FC, PropsWithChildren } from 'react'

const AppProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      {/* <ExampleProvider> */}
      {children}
      {/* </ExampleProvider> */}
    </>
  )
}

export default AppProviders
