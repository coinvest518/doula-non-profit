"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User, Loader2, Lock } from "lucide-react"
import Link from "next/link"

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export function AIPublicChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m your doula assistant. I can help answer questions about pregnancy, birth, and postpartum care. You have 2 free questions - sign up for unlimited access!',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [usageCount, setUsageCount] = useState(0)
  const maxFreeUses = 2
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])

  useEffect(() => {
    const stored = localStorage.getItem('ai-chat-usage')
    if (stored) {
      setUsageCount(parseInt(stored))
    }
  }, [])

  const sendMessage = async () => {
    if (!input.trim() || isLoading || usageCount >= maxFreeUses) return

    const userMessage: Message = { role: 'user', content: input, timestamp: new Date() }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      })

      const data = await response.json()
      if (data.error) throw new Error(data.error)

      const assistantMessage: Message = { role: 'assistant', content: data.response, timestamp: new Date() }
      setMessages(prev => [...prev, assistantMessage])
      
      const newCount = usageCount + 1
      setUsageCount(newCount)
      localStorage.setItem('ai-chat-usage', newCount.toString())
    } catch (error) {
      const errorMessage: Message = {
        role: 'assistant',
        content: 'I\'m sorry, I\'m having trouble responding right now. Please try again later.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const isLimitReached = usageCount >= maxFreeUses

  return (
    <Card className="w-full max-w-full flex flex-col h-[500px] sm:h-[600px]">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            Doula AI Assistant
          </div>
          <div className="text-sm font-normal text-muted-foreground">
            {usageCount}/{maxFreeUses} free uses
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0 min-h-0">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 text-sm ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-2 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full flex-shrink-0 ${ 
                    message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                  }`}>
                    {message.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>
                  <div className={`rounded-lg p-3 min-w-0 ${ 
                    message.role === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted'
                  }`}>
                    <div className="whitespace-pre-wrap break-words">
                      {message.content}
                    </div>
                    <p className="text-xs opacity-70 mt-2 text-right">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start text-sm">
                <div className="flex gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted flex-shrink-0">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="rounded-lg p-3 bg-muted flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        <div className="border-t p-4">
          {isLimitReached ? (
            <div className="flex justify-center">
              <Card className="bg-primary/5 border-primary/20 w-full max-w-sm mx-auto">
                <CardContent className="p-4 text-center">
                  <Lock className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium mb-2">Free limit reached!</p>
                  <p className="text-xs text-muted-foreground mb-3">
                    Sign up for unlimited AI assistant access
                  </p>
                  <Button size="sm" asChild>
                    <Link href="/signup">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask a question..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button onClick={sendMessage} disabled={isLoading || !input.trim()} aria-label="Send message">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
