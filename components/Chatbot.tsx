"use client"
import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MessageCircle, Send, X } from 'lucide-react'

interface Message {
  text: string
  isUser: boolean
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return

    const newMessage: Message = { text: inputMessage, isUser: true }
    setMessages([...messages, newMessage])
    setInputMessage('')

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response from chatbot')
      }

      const data = await response.json()
      const botMessage: Message = { text: data.response, isUser: false }
      setMessages(prevMessages => [...prevMessages, botMessage])
    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = { text: 'Sorry, I encountered an error. Please try again later.', isUser: false }
      setMessages(prevMessages => [...prevMessages, errorMessage])
    }
  }

  return (
    <>
      <Button
        className="fixed bottom-4 right-4 rounded-full p-4"
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
      {isOpen && (
        <Card className="fixed bottom-20 right-4 w-80 h-96 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>SkillUp Chatbot</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex-grow overflow-hidden">
            <ScrollArea className="h-full" ref={scrollAreaRef}>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-2 ${
                    message.isUser ? 'text-right' : 'text-left'
                  }`}
                >
                  <span
                    className={`inline-block rounded-lg px-3 py-2 ${
                      message.isUser
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground'
                    }`}
                  >
                    {message.text}
                  </span>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage()
              }}
              className="flex w-full items-center space-x-2"
            >
              <Input
                type="text"
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
              />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </>
  )
}