'use client'

import { ReactNode, createContext } from 'react'

const initialState = {
  isJobModalOpen: false,
}

export const JobTrackerContext = createContext<{
  isJobModalOpen: boolean
} | null>(initialState)

export function JobTrackerProvider({ children }: { children: ReactNode }) {
  return (
    <JobTrackerContext.Provider value={initialState}>
      {children}
    </JobTrackerContext.Provider>
  )
}
