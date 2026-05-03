import { useState } from "react"
import Icon from "@/components/ui/icon"

const DAYS = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"]

const mockPosts = [
  { id: 1, day: 1, time: "10:00", title: "Как AI меняет контент-маркетинг", channels: ["tg"] },
  { id: 2, day: 3, time: "14:00", title: "5 лайфхаков для роста канала", channels: ["tg", "vk"] },
  { id: 3, day: 5, time: "18:00", title: "Кейс: 10к подписчиков за месяц", channels: ["tg"] },
]

const stats = [
  { label: "Всего постов", value: "24", icon: "FileText", color: "text-zinc-300" },
  { label: "Опубликовано", value: "5", icon: "CheckCircle", color: "text-emerald-400" },
  { label: "Запланировано", value: "12", icon: "Clock", color: "text-orange-400" },
  { label: "Черновики", value: "7", icon: "Edit3", color: "text-zinc-400" },
]

function getWeekDates(offset = 0) {
  const now = new Date()
  const day = now.getDay()
  const mon = new Date(now)
  mon.setDate(now.getDate() - (day === 0 ? 6 : day - 1) + offset * 7)
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(mon)
    d.setDate(mon.getDate() + i)
    return d
  })
}

export function ContentPlanPage() {
  const [weekOffset, setWeekOffset] = useState(0)
  const [posts, setPosts] = useState(mockPosts)
  const [showModal, setShowModal] = useState(false)
  const [newPost, setNewPost] = useState({ title: "", day: 0, time: "12:00", channels: ["tg"] })
  const [dragId, setDragId] = useState<number | null>(null)

  const dates = getWeekDates(weekOffset)
  const today = new Date()

  const handleDrop = (dayIndex: number) => {
    if (dragId === null) return
    setPosts((prev) => prev.map((p) => (p.id === dragId ? { ...p, day: dayIndex } : p)))
    setDragId(null)
  }

  const addPost = () => {
    setPosts((prev) => [...prev, { id: Date.now(), ...newPost }])
    setShowModal(false)
    setNewPost({ title: "", day: 0, time: "12:00", channels: ["tg"] })
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-white">Контент-план AI</h1>
          <p className="text-zinc-500 text-sm mt-0.5">Календарь запланированных публикаций</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors whitespace-nowrap"
        >
          <Icon name="Plus" className="w-4 h-4" />
          Добавить пост
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Icon name={s.icon} className={`w-4 h-4 ${s.color}`} />
              <span className="text-zinc-500 text-xs">{s.label}</span>
            </div>
            <div className={`text-2xl font-semibold ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Calendar navigation */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <span className="text-white font-medium text-sm">
              Неделя {weekOffset === 0 ? "1" : weekOffset > 0 ? `+${weekOffset}` : weekOffset}
            </span>
            {weekOffset === 0 && (
              <span className="text-xs text-orange-400 border border-orange-500/30 bg-orange-500/10 px-2 py-0.5 rounded-full">
                текущая
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setWeekOffset((w) => w - 1)}
              className="px-2.5 py-1.5 text-xs text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
            >
              ← Пред.
            </button>
            <button
              onClick={() => setWeekOffset(0)}
              className="px-2.5 py-1.5 text-xs text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
            >
              Текущая
            </button>
            <button
              onClick={() => setWeekOffset((w) => w + 1)}
              className="px-2.5 py-1.5 text-xs text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
            >
              След. →
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 divide-x divide-zinc-800">
          {DAYS.map((day, i) => {
            const date = dates[i]
            const isToday =
              date.getDate() === today.getDate() &&
              date.getMonth() === today.getMonth() &&
              date.getFullYear() === today.getFullYear()
            const dayPosts = posts.filter((p) => p.day === i)

            return (
              <div
                key={day}
                className="min-h-[160px] p-2 relative"
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(i)}
              >
                <div className="text-center mb-2">
                  <div className="text-zinc-500 text-[10px] font-medium">{day}</div>
                  <div
                    className={`text-sm font-medium mt-0.5 w-6 h-6 rounded-full flex items-center justify-center mx-auto ${
                      isToday ? "bg-orange-500 text-white" : "text-zinc-300"
                    }`}
                  >
                    {date.getDate()}
                  </div>
                </div>
                <div className="space-y-1">
                  {dayPosts.map((post) => (
                    <div
                      key={post.id}
                      draggable
                      onDragStart={() => setDragId(post.id)}
                      className="bg-zinc-800/80 border border-zinc-700/50 rounded-lg p-1.5 cursor-grab active:cursor-grabbing group relative"
                    >
                      <div className="flex items-center gap-1 mb-1">
                        <Icon name="Clock" className="w-2.5 h-2.5 text-zinc-500" />
                        <span className="text-[9px] text-zinc-500">{post.time}</span>
                      </div>
                      <p className="text-[10px] text-zinc-300 leading-tight line-clamp-2">
                        {post.title}
                      </p>
                      <button
                        onClick={() => setPosts((prev) => prev.filter((p) => p.id !== post.id))}
                        className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 text-zinc-500 hover:text-red-400 transition-all"
                      >
                        <Icon name="X" className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => {
                    setNewPost((n) => ({ ...n, day: i }))
                    setShowModal(true)
                  }}
                  className="mt-1 w-full text-[10px] text-zinc-600 hover:text-zinc-400 transition-colors text-center py-1"
                >
                  + Добавить пост
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="bg-[#141417] border border-zinc-800 rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-semibold">Новый пост</h3>
              <button onClick={() => setShowModal(false)} className="text-zinc-500 hover:text-white">
                <Icon name="X" className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-zinc-400 text-xs mb-1.5 block">Заголовок</label>
                <input
                  value={newPost.title}
                  onChange={(e) => setNewPost((n) => ({ ...n, title: e.target.value }))}
                  placeholder="Введите заголовок поста..."
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/60"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-400 text-xs mb-1.5 block">День недели</label>
                  <select
                    value={newPost.day}
                    onChange={(e) => setNewPost((n) => ({ ...n, day: Number(e.target.value) }))}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500/60"
                  >
                    {DAYS.map((d, i) => (
                      <option key={d} value={i}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-zinc-400 text-xs mb-1.5 block">Время</label>
                  <input
                    type="time"
                    value={newPost.time}
                    onChange={(e) => setNewPost((n) => ({ ...n, time: e.target.value }))}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500/60"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 border border-zinc-700 text-zinc-300 text-sm rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  Отмена
                </button>
                <button
                  onClick={addPost}
                  className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Добавить
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
