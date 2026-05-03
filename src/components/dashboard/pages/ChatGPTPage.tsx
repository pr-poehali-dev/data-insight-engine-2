import { useState, useRef, useEffect } from "react"
import Icon from "@/components/ui/icon"

interface Message {
  id: number
  role: "user" | "bot"
  text: string
}

interface Chat {
  id: number
  name: string
  messages: Message[]
}

const initialChat: Chat = {
  id: 1,
  name: "Новый чат",
  messages: [
    { id: 1, role: "bot", text: "Привет! Я AI-ассистент РакетаПост. Помогу написать посты, придумать идеи для контента или ответить на вопросы по маркетингу. Чем могу помочь?" },
  ],
}

const botReplies = [
  "Отличная идея! Вот несколько вариантов для вашего канала:\n\n1. Начните с истории из практики\n2. Добавьте конкретные цифры\n3. Завершите призывом к действию",
  "Для роста аудитории рекомендую публиковать 2-3 поста в день с разнообразным контентом: полезные советы, кейсы и новости ниши.",
  "Хороший вопрос! AI-генерация постов экономит до 80% времени. Попробуйте наш AI Генератор — он создаст пост за 10 секунд по вашему описанию.",
]

export function ChatGPTPage() {
  const [chats, setChats] = useState<Chat[]>([initialChat])
  const [activeId, setActiveId] = useState(1)
  const [input, setInput] = useState("")
  const [typing, setTyping] = useState(false)
  const [showRename, setShowRename] = useState<number | null>(null)
  const [renameName, setRenameName] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null)

  const activeChat = chats.find((c) => c.id === activeId)!
  const totalTokens = activeChat.messages.reduce((acc, m) => acc + m.text.length, 0)
  const cost = ((totalTokens / 1000) * 0.03 * 2.5).toFixed(2)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [activeChat?.messages, typing])

  const sendMessage = () => {
    if (!input.trim() || typing) return
    const userMsg: Message = { id: Date.now(), role: "user", text: input }
    setChats((prev) =>
      prev.map((c) => c.id === activeId ? { ...c, messages: [...c.messages, userMsg] } : c)
    )
    setInput("")
    setTyping(true)
    setTimeout(() => {
      const botMsg: Message = {
        id: Date.now() + 1,
        role: "bot",
        text: botReplies[Math.floor(Math.random() * botReplies.length)],
      }
      setChats((prev) =>
        prev.map((c) => c.id === activeId ? { ...c, messages: [...c.messages, botMsg] } : c)
      )
      setTyping(false)
    }, 1500 + Math.random() * 1000)
  }

  const newChat = () => {
    const id = Date.now()
    const chat: Chat = { id, name: `Чат ${chats.length + 1}`, messages: [{ id: 1, role: "bot", text: "Привет! Чем могу помочь?" }] }
    setChats((prev) => [...prev, chat])
    setActiveId(id)
  }

  const deleteChat = (id: number) => {
    const remaining = chats.filter((c) => c.id !== id)
    setChats(remaining)
    if (activeId === id && remaining.length > 0) setActiveId(remaining[0].id)
  }

  const renameChat = () => {
    if (renameName.trim() && showRename !== null) {
      setChats((prev) => prev.map((c) => c.id === showRename ? { ...c, name: renameName.trim() } : c))
    }
    setShowRename(null)
    setRenameName("")
  }

  return (
    <div className="flex h-full" style={{ height: "calc(100vh - 57px)" }}>
      {/* Sidebar */}
      <div className="w-52 shrink-0 border-r border-zinc-800 bg-zinc-900/30 flex flex-col hidden md:flex">
        <div className="p-3">
          <button
            onClick={newChat}
            className="w-full flex items-center gap-2 px-3 py-2.5 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-orange-400 text-sm font-medium rounded-xl transition-colors"
          >
            <Icon name="Plus" className="w-4 h-4" />
            Новый чат
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-2 space-y-0.5">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setActiveId(chat.id)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl cursor-pointer group transition-all ${
                activeId === chat.id ? "bg-zinc-800" : "hover:bg-zinc-800/50"
              }`}
            >
              <Icon name="MessageSquare" className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
              <span className="text-zinc-300 text-xs truncate flex-1">{chat.name}</span>
              <div className="hidden group-hover:flex items-center gap-1">
                <button
                  onClick={(e) => { e.stopPropagation(); setShowRename(chat.id); setRenameName(chat.name) }}
                  className="text-zinc-500 hover:text-white"
                >
                  <Icon name="Edit2" className="w-3 h-3" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); deleteChat(chat.id) }}
                  className="text-zinc-500 hover:text-red-400"
                >
                  <Icon name="Trash2" className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="p-3 border-t border-zinc-800">
          <div className="text-zinc-600 text-[10px] text-center">
            Расход: ~{cost} ₽
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <Icon name="Bot" className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="text-white font-medium text-sm">{activeChat?.name}</span>
          </div>
          <span className="text-zinc-600 text-xs">~{cost} ₽ за сессию</span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeChat?.messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role === "bot" && (
                <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mr-2 mt-0.5">
                  <Icon name="Bot" className="w-3.5 h-3.5 text-emerald-400" />
                </div>
              )}
              <div
                className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-orange-500 text-white rounded-tr-sm"
                    : "bg-zinc-800 text-zinc-200 rounded-tl-sm border border-zinc-700"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                <Icon name="Bot" className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div className="bg-zinc-800 border border-zinc-700 px-4 py-3 rounded-2xl rounded-tl-sm">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-zinc-800 shrink-0">
          <div className="flex items-end gap-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage() } }}
              placeholder="Напишите сообщение... (Enter — отправить)"
              rows={1}
              className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/60 resize-none"
              style={{ maxHeight: "120px" }}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || typing}
              className="w-10 h-10 shrink-0 flex items-center justify-center bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white rounded-xl transition-colors"
            >
              <Icon name="Send" className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Rename modal */}
      {showRename !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="bg-[#141417] border border-zinc-800 rounded-2xl p-6 w-full max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Переименовать чат</h3>
              <button onClick={() => setShowRename(null)} className="text-zinc-500 hover:text-white"><Icon name="X" className="w-5 h-5" /></button>
            </div>
            <input
              value={renameName}
              onChange={(e) => setRenameName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && renameChat()}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500/60 mb-4"
              autoFocus
            />
            <div className="flex gap-3">
              <button onClick={() => setShowRename(null)} className="flex-1 py-2.5 border border-zinc-700 text-zinc-300 text-sm rounded-lg hover:bg-zinc-800">Отмена</button>
              <button onClick={renameChat} className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg">Сохранить</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
