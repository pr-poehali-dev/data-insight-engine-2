import { useState, useRef } from "react"
import Icon from "@/components/ui/icon"

interface PostEditorModalProps {
  onClose: () => void
  initialDate?: string
  initialText?: string
  mode?: "create" | "edit"
}

const EMOJI_GROUPS = [
  {
    label: "Часто",
    emojis: ["😀","😂","🥹","😍","🤩","😎","🤔","😅","🙏","👍","❤️","🔥","⭐","✅","🚀","💡","📢","📊","🎯","💰"],
  },
  {
    label: "Смайлы",
    emojis: ["😀","😃","😄","😁","😆","😅","🤣","😂","🙂","😊","😇","😍","🥰","😘","😜","😝","🤑","🤩","😎","🥳","😱","🤯","😤","😡","🥲","😭","😢","😰","🫡","🫢"],
  },
  {
    label: "Жесты",
    emojis: ["👍","👎","✌️","🤞","🖖","🤟","🤙","👏","🙌","🤝","🫶","💪","🦾","🫰","👀","🫵","☝️","🤜","🤛","✋"],
  },
  {
    label: "Символы",
    emojis: ["❤️","🧡","💛","💚","💙","💜","🖤","🤍","❤️‍🔥","💔","✨","⭐","🌟","🔥","💥","❄️","⚡","🌈","🎉","🎊","🏆","🥇","🎯","🗓️","📅","⏰","🔔","📍","🔗","💬"],
  },
  {
    label: "Бизнес",
    emojis: ["📊","📈","📉","💰","💵","💳","🏦","📱","💻","⌨️","🖥️","📡","🔧","⚙️","🛠️","📝","📋","📌","📎","🗂️","✅","❌","⚠️","🚀","✈️","🌍","🏢","👔","🤵","👩‍💼"],
  },
  {
    label: "Медиа",
    emojis: ["📸","📷","🎥","🎬","🎵","🎶","🎸","🎹","🎧","🎤","📻","📺","🖼️","🎨","✏️","🖊️","📖","📚","🗞️","📰"],
  },
]

const channels = [
  { id: "tg", label: "Telegram", color: "border-blue-500 bg-blue-500/10 text-blue-400" },
  { id: "vk", label: "ВКонтакте", color: "border-indigo-500 bg-indigo-500/10 text-indigo-400" },
  { id: "max", label: "MAX", color: "border-orange-500 bg-orange-500/10 text-orange-400" },
]

const aiLoading = [
  "Анализирую текст...",
  "Улучшаю оформление...",
  "Добавляю структуру...",
  "Генерирую финальную версию...",
]

export function PostEditorModal({ onClose, initialDate = "", initialText = "", mode = "create" }: PostEditorModalProps) {
  const [text, setText] = useState(initialText)
  const [selectedChannels, setSelectedChannels] = useState<string[]>(["tg"])
  const [scheduleType, setScheduleType] = useState<"now" | "later">("later")
  const [scheduleDate, setScheduleDate] = useState(initialDate)
  const [scheduleTime, setScheduleTime] = useState("12:00")
  const [showEmoji, setShowEmoji] = useState(false)
  const [emojiGroup, setEmojiGroup] = useState(0)
  const [aiLoading_, setAiLoading_] = useState(false)
  const [aiStep, setAiStep] = useState(0)
  const [media, setMedia] = useState<{ type: "image" | "video"; name: string; url: string }[]>([])
  const [showConfirmClose, setShowConfirmClose] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const toggleChannel = (id: string) =>
    setSelectedChannels((prev) => prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id])

  const insertEmoji = (emoji: string) => {
    const ta = textareaRef.current
    if (!ta) { setText((t) => t + emoji); return }
    const start = ta.selectionStart
    const end = ta.selectionEnd
    const newText = text.slice(0, start) + emoji + text.slice(end)
    setText(newText)
    setTimeout(() => { ta.selectionStart = ta.selectionEnd = start + emoji.length; ta.focus() }, 0)
  }

  const applyFormat = (tag: string) => {
    const ta = textareaRef.current
    if (!ta) return
    const start = ta.selectionStart
    const end = ta.selectionEnd
    const selected = text.slice(start, end)
    let newText = text
    if (tag === "bold") newText = text.slice(0, start) + `**${selected}**` + text.slice(end)
    else if (tag === "italic") newText = text.slice(0, start) + `_${selected}_` + text.slice(end)
    else if (tag === "strike") newText = text.slice(0, start) + `~~${selected}~~` + text.slice(end)
    else if (tag === "code") newText = text.slice(0, start) + "`" + selected + "`" + text.slice(end)
    else if (tag === "link") newText = text.slice(0, start) + `[${selected || "текст"}](URL)` + text.slice(end)
    else if (tag === "hr") newText = text + "\n\n—————————\n\n"
    setText(newText)
    setTimeout(() => ta.focus(), 0)
  }

  const handleAIGenerate = () => {
    setAiLoading_(true)
    setAiStep(0)
    const interval = setInterval(() => setAiStep((s) => s + 1), 700)
    setTimeout(() => {
      clearInterval(interval)
      setAiLoading_(false)
      setText(`🚀 ${text.slice(0, 40) || "Новый пост"}\n\nВот что важно знать об этой теме прямо сейчас.\n\n💡 Ключевые моменты:\n— Первый важный тезис\n— Второй тезис с данными\n— Практический вывод\n\nСохраняйте и делитесь с теми, кому это нужно 👇`)
    }, 3000)
  }

  const handleFileAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const images = media.filter((m) => m.type === "image")
    const videos = media.filter((m) => m.type === "video")
    files.forEach((file) => {
      const isVideo = file.type.startsWith("video/")
      if (isVideo && videos.length >= 2) return
      if (!isVideo && images.length >= 5) return
      const url = URL.createObjectURL(file)
      setMedia((prev) => [...prev, { type: isVideo ? "video" : "image", name: file.name, url }])
    })
    e.target.value = ""
  }

  const hasChanges = text.trim().length > 0 || media.length > 0

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 px-0 sm:px-4">
      <div className="bg-[#141417] border border-zinc-800 rounded-t-2xl sm:rounded-2xl w-full sm:max-w-2xl max-h-[95vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-zinc-800 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-orange-500/20 flex items-center justify-center">
              <Icon name="FileText" className="w-4 h-4 text-orange-400" />
            </div>
            <h3 className="text-white font-semibold text-sm">{mode === "edit" ? "Редактировать пост" : "Новый пост"}</h3>
          </div>
          <button onClick={() => hasChanges ? setShowConfirmClose(true) : onClose()} className="text-zinc-500 hover:text-white p-1">
            <Icon name="X" className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Formatting toolbar */}
          <div className="flex items-center gap-0.5 px-3 py-2 border-b border-zinc-800/60 bg-zinc-900/40 flex-wrap">
            {[
              { label: "B", tag: "bold", title: "Жирный" },
              { label: "I", tag: "italic", title: "Курсив" },
              { label: "S", tag: "strike", title: "Зачёркнутый" },
              { label: "<>", tag: "code", title: "Код" },
              { label: "🔗", tag: "link", title: "Ссылка" },
              { label: "—", tag: "hr", title: "Разделитель" },
            ].map((btn) => (
              <button
                key={btn.tag}
                onClick={() => applyFormat(btn.tag)}
                title={btn.title}
                className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 rounded text-xs font-bold transition-colors"
              >
                {btn.label}
              </button>
            ))}
            <div className="w-px h-5 bg-zinc-800 mx-1" />
            <button
              onClick={() => setShowEmoji((v) => !v)}
              className={`w-8 h-8 flex items-center justify-center text-sm rounded transition-colors ${showEmoji ? "bg-orange-500/20 text-orange-400" : "text-zinc-400 hover:text-white hover:bg-zinc-800"}`}
            >
              😊
            </button>
            <div className="flex-1" />
            <button
              onClick={handleAIGenerate}
              disabled={aiLoading_}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-medium rounded-lg transition-colors disabled:opacity-50"
            >
              <Icon name="Sparkles" className="w-3.5 h-3.5" />
              AI Генерация
            </button>
          </div>

          {/* Emoji picker */}
          {showEmoji && (
            <div className="border-b border-zinc-800 bg-zinc-900/60 px-3 py-2">
              <div className="flex gap-1 mb-2 overflow-x-auto no-scrollbar">
                {EMOJI_GROUPS.map((g, i) => (
                  <button
                    key={g.label}
                    onClick={() => setEmojiGroup(i)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] whitespace-nowrap transition-colors ${emojiGroup === i ? "bg-orange-500/20 text-orange-400" : "text-zinc-500 hover:text-zinc-300"}`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-10 gap-0.5">
                {EMOJI_GROUPS[emojiGroup].emojis.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => insertEmoji(emoji)}
                    className="w-8 h-8 flex items-center justify-center text-lg hover:bg-zinc-800 rounded transition-colors"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* AI loading overlay */}
          {aiLoading_ && (
            <div className="mx-4 mt-3 p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-center gap-3">
              <div className="w-4 h-4 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin shrink-0" />
              <span className="text-orange-400 text-sm">{aiLoading[Math.min(aiStep, aiLoading.length - 1)]}</span>
            </div>
          )}

          {/* Textarea */}
          <div className="px-4 pt-3">
            <textarea
              ref={textareaRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Напишите текст поста... или используйте AI Генерацию"
              rows={8}
              className="w-full bg-zinc-900/60 border border-zinc-700/60 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/50 resize-none leading-relaxed"
            />
            <div className="flex justify-end mt-1">
              <span className="text-zinc-600 text-xs">{text.length} символов</span>
            </div>
          </div>

          {/* Media */}
          <div className="px-4 pb-2">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-zinc-400 text-xs font-medium">Медиафайлы</span>
              <span className="text-zinc-600 text-[10px]">до 5 фото / 2 видео</span>
            </div>
            {media.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {media.map((m, i) => (
                  <div key={i} className="relative group">
                    {m.type === "image" ? (
                      <img src={m.url} alt={m.name} className="w-16 h-16 object-cover rounded-lg border border-zinc-700" />
                    ) : (
                      <div className="w-16 h-16 bg-zinc-800 border border-zinc-700 rounded-lg flex flex-col items-center justify-center gap-1">
                        <Icon name="Video" className="w-5 h-5 text-zinc-400" />
                        <span className="text-[9px] text-zinc-500 text-center px-1 truncate w-full">{m.name}</span>
                      </div>
                    )}
                    <button
                      onClick={() => setMedia((prev) => prev.filter((_, j) => j !== i))}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Icon name="X" className="w-3 h-3 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <input ref={fileRef} type="file" multiple accept="image/*,video/*" className="hidden" onChange={handleFileAdd} />
            <button
              onClick={() => fileRef.current?.click()}
              className="flex items-center gap-2 px-3 py-2 border border-dashed border-zinc-700 text-zinc-500 hover:text-zinc-300 hover:border-zinc-500 text-xs rounded-xl transition-colors"
            >
              <Icon name="Paperclip" className="w-3.5 h-3.5" />
              Загрузить фото / видео
            </button>
          </div>

          {/* Channels */}
          <div className="px-4 pb-3">
            <div className="text-zinc-400 text-xs font-medium mb-2">Каналы для публикации</div>
            <div className="flex flex-wrap gap-2">
              {channels.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => toggleChannel(ch.id)}
                  className={`px-3 py-2 rounded-lg border text-xs font-medium transition-all ${
                    selectedChannels.includes(ch.id) ? ch.color : "border-zinc-700 text-zinc-500"
                  }`}
                >
                  {ch.label}
                </button>
              ))}
            </div>
          </div>

          {/* Schedule */}
          <div className="px-4 pb-4">
            <div className="text-zinc-400 text-xs font-medium mb-2">Дата и время публикации</div>
            <div className="flex gap-2 mb-3 flex-wrap">
              <button
                onClick={() => setScheduleType("now")}
                className={`px-3 py-2 rounded-lg text-xs border transition-all ${
                  scheduleType === "now" ? "border-orange-500 bg-orange-500/10 text-orange-400" : "border-zinc-700 text-zinc-400"
                }`}
              >
                Опубликовать сейчас
              </button>
              <button
                onClick={() => setScheduleType("later")}
                className={`px-3 py-2 rounded-lg text-xs border transition-all ${
                  scheduleType === "later" ? "border-orange-500 bg-orange-500/10 text-orange-400" : "border-zinc-700 text-zinc-400"
                }`}
              >
                Запланировать
              </button>
            </div>
            {scheduleType === "later" && (
              <div className="flex flex-wrap gap-2">
                <input
                  type="date"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  className="bg-white text-zinc-900 border border-zinc-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
                />
                <input
                  type="time"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  className="bg-white text-zinc-900 border border-zinc-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
                />
              </div>
            )}
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-4 py-3 border-t border-zinc-800 flex flex-col sm:flex-row gap-2 shrink-0 bg-[#141417]">
          <button
            onClick={onClose}
            className="sm:flex-none px-4 py-2.5 border border-zinc-700 text-zinc-400 hover:bg-zinc-800 text-sm rounded-xl transition-colors order-3 sm:order-1"
          >
            Отмена
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-zinc-600 text-zinc-200 hover:bg-zinc-800 text-sm font-medium rounded-xl transition-colors order-2">
            <Icon name="Save" className="w-4 h-4" />
            Сохранить в черновик
          </button>
          <button
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-white text-sm font-medium rounded-xl transition-colors order-1 sm:order-3 ${
              scheduleType === "now" ? "bg-emerald-500 hover:bg-emerald-600" : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            <Icon name={scheduleType === "now" ? "Send" : "Clock"} className="w-4 h-4" />
            {scheduleType === "now" ? "Опубликовать сейчас" : "Запланировать"}
          </button>
        </div>
      </div>

      {/* Confirm close */}
      {showConfirmClose && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-[#1a1a1f] border border-zinc-700 rounded-2xl p-5 max-w-xs w-full">
            <h4 className="text-white font-semibold mb-2">Закрыть без сохранения?</h4>
            <p className="text-zinc-400 text-sm mb-4">Все изменения будут потеряны.</p>
            <div className="flex gap-2">
              <button onClick={() => setShowConfirmClose(false)} className="flex-1 py-2 border border-zinc-700 text-zinc-300 text-sm rounded-lg">Отмена</button>
              <button onClick={onClose} className="flex-1 py-2 bg-red-500/80 hover:bg-red-500 text-white text-sm font-medium rounded-lg">Закрыть</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
