import { useState } from 'react'
import { useInterval } from '../hooks/useInterval'

export function MessageWriter({
  message = '',
  wordDelay = 200,
  onDone,
}: {
  message: string
  wordDelay?: number
  onDone?: () => void
}) {
  const [index, setIndex] = useState(0)
  const [written, setWritten] = useState('')
  const [running, setRunning] = useState(true)
  const parts = message.split(' ')

  useInterval(
    () => {
      setWritten(`${written} ${parts[index]}`)
      if (index < parts.length - 1) {
        setIndex(index + 1)
      } else {
        setRunning(false)
        onDone?.()
      }
    },
    running ? wordDelay : null,
  )

  return <>{written}</>
}
