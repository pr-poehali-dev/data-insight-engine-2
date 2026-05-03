import { useState, useRef, useEffect } from "react"
import Icon from "@/components/ui/icon"

interface Message {
  id: number
  from: "bot" | "user"
  text: string
  time: string
}

const now = () => new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" })

const autoReplies = [
  "Спасибо за обращение! Мы получили ваше сообщение и ответим в ближайшее время 🚀",
  "Ваш вопрос принят! Наша команда поддержки ответит вам в рабочее время (Пн-Пт 10:00–21:00).",
  "Мы уже разбираемся с вашим вопросом. Ожидайте ответа!",
]

export function SupportChat() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      from: "bot",
      text: "👋 Привет! Добро пожаловать в РакетаПост.\n\nЯ — бот поддержки. Напишите ваш вопрос, и наш специалист ответит вам в рабочее время:\n\n🕐 Пн–Пт: 10:00 – 21:00",
      time: now(),
    },
  ])
  const [unread, setUnread] = useState(0)
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) { setUnread(0); bottomRef.current?.scrollIntoView({ behavior: "smooth" }) }
  }, [open, messages])

  const sendMessage = () => {
    if (!input.trim()) return
    const userMsg: Message = { id: Date.now(), from: "user", text: input, time: now() }
    setMessages((p) => [...p, userMsg])
    setInput("")
    setTyping(true)
    setTimeout(() => {
      const reply: Message = {
        id: Date.now() + 1,
        from: "bot",
        text: autoReplies[Math.floor(Math.random() * autoReplies.length)],
        time: now(),
      }
      setMessages((p) => [...p, reply])
      setTyping(false)
      if (!open) setUnread((n) => n + 1)
    }, 1800)
  }

  return (
    <>
      {/* Chat window */}
      {open && (
        <div className="fixed bottom-20 right-4 z-50 w-[calc(100vw-2rem)] sm:w-80 bg-[#141417] border border-zinc-800 rounded-2xl shadow-2xl shadow-black/60 flex flex-col overflow-hidden" style={{ maxHeight: "min(480px, calc(100vh - 100px))" }}>
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-orange-500/20 to-orange-600/10 border-b border-zinc-800 shrink-0">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-orange-500/20 flex items-center justify-center">
                <Icon name="Rocket" className="w-4 h-4 text-orange-400" />
              </div>
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#141417]" />
            </div>
            <div className="flex-1">
              <div className="text-white text-sm font-semibold">Поддержка РакетаПост</div>
              <div className="text-emerald-400 text-[10px]">Пн–Пт 10:00–21:00 · онлайн</div>
            </div>
            <button onClick={() => setOpen(false)} className="text-zinc-500 hover:text-white">
              <Icon name="X" className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                {msg.from === "bot" && (
                  <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0 mr-2 mt-1">
                    <Icon name="Rocket" className="w-3 h-3 text-orange-400" />
                  </div>
                )}
                <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
                  msg.from === "user"
                    ? "bg-orange-500 text-white rounded-tr-sm"
                    : "bg-zinc-800 text-zinc-200 border border-zinc-700 rounded-tl-sm"
                }`}>
                  {msg.text}
                  <div className={`text-[9px] mt-1 ${msg.from === "user" ? "text-white/60 text-right" : "text-zinc-600"}`}>{msg.time}</div>
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0">
                  <Icon name="Rocket" className="w-3 h-3 text-orange-400" />
                </div>
                <div className="bg-zinc-800 border border-zinc-700 px-3 py-2 rounded-2xl rounded-tl-sm">
                  <div className="flex gap-1">
                    {[0, 150, 300].map((d) => (
                      <div key={d} className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: d + "ms" }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-zinc-800 shrink-0">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Написать сообщение..."
                className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/50"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim()}
                className="w-8 h-8 flex items-center justify-center bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white rounded-xl transition-colors shrink-0"
              >
                <Icon name="Send" className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Trigger button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-4 right-4 z-50 w-13 h-13 w-[52px] h-[52px] rounded-full bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/30 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
      >
        {open ? (
          <Icon name="X" className="w-5 h-5 text-white" />
        ) : (
          <Icon name="MessageCircle" className="w-5 h-5 text-white" />
        )}
        {unread > 0 && !open && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
            {unread}
          </span>
        )}
      </button>
    </>
  )
}
