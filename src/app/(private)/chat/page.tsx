'use client'

import { FormEventHandler, useEffect, useRef, useState } from 'react'

import { Input } from '@/common/ui/Input/Input'
import { cn } from '@/common/utils/style/cn'
import { getErrorMessage } from '@/common/utils/getErrorMessage/getErrorMessage'
import { sendMessage } from './data/sendMessage'
import { Button } from '@/common/ui/Button'
import { is } from 'date-fns/locale'

interface Message {
  type: 'user' | 'bot'
  content: string
  error?: boolean
}

const ChatPage = () => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    { type: 'bot', content: 'Yo, whats up?' },
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  console.log('messages: ', messages)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const _sendMessage: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      setMessages((currentMessages) => {
        return [...currentMessages, { type: 'user', content: message }]
      })
      setMessage('')
      const response = await sendMessage({ message })
      setMessages((currentMessages) => {
        return [...currentMessages, { type: 'bot', content: response }]
      })
      setLoading(false)
    } catch (err) {
      console.error(err)
      const errorMessage = getErrorMessage(err)
      setMessages((currentMessages) => {
        return [
          ...currentMessages,
          { type: 'bot', content: `ERROR: ${errorMessage}`, error: true },
        ]
      })
      setLoading(false)
    }
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  return (
    <div className="flex-1 flex flex-col items-stretch bg-slate-100">
      <div className="flex-1 flex flex-col gap-1 shrink-0 overflow-auto bg-slate-200 px-4 scroll-smooth">
        {messages.map((message, index) => (
          <p
            key={index}
            className={cn([
              index === 0 && 'mt-4',
              index === messages.length - 1 && 'mb-4',
              'text-slate-800 py-2 px-3 rounded-2xl max-w-7xl self-start',
              message.type === 'bot' ? 'bg-blue-200' : 'bg-slate-300 mt-4',
            ])}
          >
            {message.content}
          </p>
        ))}
        {loading && (
          <p className="text-slate-800 py-2 px-3 rounded-2xl max-w-7xl self-start bg-slate-300 mt-4">
            ...
          </p>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={_sendMessage} className="py-4 shadow-top px-4">
        <Input
          ref={inputRef}
          value={message}
          onChange={handleInput}
          className={cn(['w-full rounded-full px-6 shadow-inner'])}
          placeholder="Ask here..."
          autoFocus
        />
      </form>
    </div>
  )
}

export default ChatPage
