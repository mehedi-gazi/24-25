"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Users, MoreVertical } from "lucide-react"

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      user: "Jordan",
      content: "Hey everyone! How's everyone doing today?",
      timestamp: new Date(Date.now() - 300000),
      isOwn: false,
    },
    {
      id: "2",
      user: "You",
      content: "Doing great! Just finished reading an interesting article about web development.",
      timestamp: new Date(Date.now() - 240000),
      isOwn: true,
    },
    {
      id: "3",
      user: "Casey",
      content: "Nice! I've been exploring some new design trends lately. Always learning something new.",
      timestamp: new Date(Date.now() - 180000),
      isOwn: false,
    },
    {
      id: "4",
      user: "Alex",
      content: "That's awesome! I love how this community is always sharing knowledge.",
      timestamp: new Date(Date.now() - 120000),
      isOwn: false,
    },
  ])

  const [input, setInput] = useState("")
  const [onlineUsers] = useState(12)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const newMessage = {
      id: Date.now().toString(),
      user: "You",
      content: input.trim(),
      timestamp: new Date(),
      isOwn: true,
    }

    setMessages((prev) => [...prev, newMessage])
    setInput("")

    // Simulate responses from different users
    setTimeout(
      () => {
        const users = ["Jordan", "Casey", "Alex", "Sam", "Riley", "Morgan"]
        const responses = [
          "That's really interesting!",
          "I totally agree with that.",
          "Thanks for sharing!",
          "Great point!",
          "I've been thinking about that too.",
          "That makes a lot of sense.",
          "Couldn't agree more!",
          "That's a fresh perspective.",
          "I learned something new today!",
          "Appreciate the insight!",
          "That's exactly what I was thinking.",
          "Really good observation.",
        ]

        const randomUser = users[Math.floor(Math.random() * users.length)]
        const randomResponse = responses[Math.floor(Math.random() * responses.length)]

        const responseMessage = {
          id: (Date.now() + 1).toString(),
          user: randomUser,
          content: randomResponse,
          timestamp: new Date(),
          isOwn: false,
        }

        setMessages((prev) => [...prev, responseMessage])
      },
      1000 + Math.random() * 3000,
    )
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  }

  const getRandomColor = (user) => {
    const colors = [
      "text-blue-400",
      "text-green-400",
      "text-purple-400",
      "text-pink-400",
      "text-yellow-400",
      "text-cyan-400",
    ]
    const index = user.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return colors[index % colors.length]
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <h1 className="text-lg font-medium">General Chat</h1>
            </div>
            <div className="flex items-center space-x-1 text-sm text-zinc-400">
              <Users className="w-4 h-4" />
              <span>{onlineUsers} online</span>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-zinc-100">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 max-h-[calc(100vh-140px)]">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isOwn ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-2 duration-300`}
          >
            <div className={`max-w-[70%] ${message.isOwn ? "order-2" : "order-1"}`}>
              {!message.isOwn && (
                <div className={`text-xs mb-1 px-1 font-medium ${getRandomColor(message.user)}`}>{message.user}</div>
              )}
              <div
                className={`px-4 py-3 rounded-2xl ${
                  message.isOwn ? "bg-zinc-100 text-zinc-900 rounded-br-md" : "bg-zinc-800 text-zinc-100 rounded-bl-md"
                } shadow-sm transition-all duration-200 hover:shadow-md`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <div className={`text-xs mt-1 ${message.isOwn ? "text-zinc-500" : "text-zinc-400"}`}>
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-zinc-800 bg-zinc-900/50 backdrop-blur-sm p-6">
        <form onSubmit={handleSubmit} className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="bg-zinc-800 border-zinc-700 text-zinc-100 placeholder-zinc-400 pr-12 py-3 rounded-full focus:ring-1 focus:ring-zinc-600 focus:border-zinc-600 transition-all duration-200"
              maxLength={500}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-zinc-500">
              {input.length}/500
            </div>
          </div>
          <Button
            type="submit"
            disabled={!input.trim()}
            className="bg-zinc-100 text-zinc-900 hover:bg-zinc-200 disabled:bg-zinc-700 disabled:text-zinc-400 rounded-full p-3 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
        <div className="mt-2 text-xs text-zinc-500 text-center">Press Enter to send • Be kind and respectful</div>
      </div>
    </div>
  )
}
