'use client'

import { useState } from 'react'

import { Input } from '@/common/ui/Input/Input'
import { cn } from '@/common/utils/style/cn'
import { getErrorMessage } from '@/common/utils/getErrorMessage/getErrorMessage'
import { sendMessage } from './data/sendMessage'
import { Button } from '@/common/ui/Button'

interface Message {
  type: 'user' | 'bot'
  content: string
}

const ChatPage = () => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    { type: 'bot', content: 'Yo, whats up?' },
  ])

  const _sendMessage = async () => {
    setLoading(true)
    try {
      const response = await sendMessage({ message })
      setMessages([...messages, { type: 'bot', content: response }])
    } catch (err) {
      console.error(err)
      const errorMessage = getErrorMessage(err)
      alert(errorMessage)
    }
  }

  return (
    <div className="flex-1 flex flex-col items-stretch bg-green-200">
      <div className="flex-1 flex flex-col gap-1">
        {messages.map((message, index) => (
          <p
            key={index}
            className={cn(['text-black py-2 px-3 rounded-2xl', message.type === 'bot' ? 'bg-slate-400' : 'bg-blue-400'])}
          >
            {message.content}
          </p>
        ))}
      </div>
      <form onSubmit={_sendMessage}>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={cn(['w-full rounded-full'])}
        />
        <Button type="submit">Send</Button>
      </form>
    </div>
  )
}

export default ChatPage
