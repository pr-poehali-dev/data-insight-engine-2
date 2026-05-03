import { useState } from "react"
import Icon from "@/components/ui/icon"
import { PostEditorModal } from "@/components/dashboard/PostEditorModal"

const MONTHS_RU = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"]
const DAYS_RU = ["Пн","Вт","Ср","Чт","Пт","Сб","Вс"]
const WEEKDAYS_FULL = ["Понедельник","Вторник","Среда","Четверг","Пятница","Суббота","Воскресенье"]

const channelColors: Record<string, string> = {
  tg: "bg-blue-500",
  vk: "bg-indigo-500",
  max: "bg-orange-500",
}

interface Post {
  id: number
  year: number
  month: number
  day: number
  time: string
  title: string
  channels: string[]
  status: "scheduled" | "draft" | "published"
}

const mockPosts: Post[] = [
  { id: 1, year: 2026, month: 4, day: 5, time: "10:00", title: "Как AI меняет контент-маркетинг", channels: ["tg"], status: "scheduled" },
  { id: 2, year: 2026, month: 4, day: 7, time: "14:00", title: "5 лайфхаков для роста канала", channels: ["tg", "vk"], status: "scheduled" },
  { id: 3, year: 2026, month: 4, day: 12, time: "18:00", title: "Кейс: 10к подписчиков за месяц", channels: ["tg"], status: "published" },
  { id: 4, year: 2026, month: 4, day: 3, time: "09:00", title: "Черновик: Новый кейс", channels: ["tg"], status: "draft" },
]

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  const d = new Date(year, month, 1).getDay()
  return d === 0 ? 6 : d - 1
}

const statusColors: Record<string, string> = {
  scheduled: "bg-orange-500",
  draft: "bg-zinc-500",
  published: "bg-emerald-500",
}

export function ContentPlanPage() {
  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [posts, setPosts] = useState<Post[]>(mockPosts)
  const [showEditor, setShowEditor] = useState(false)
  const [editorDate, setEditorDate] = useState("")
  const [selectedDay, setSelectedDay] = useState<number | null>(null)

  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth)

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear((y) => y - 1); setViewMonth(11) }
    else setViewMonth((m) => m - 1)
  }
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear((y) => y + 1); setViewMonth(0) }
    else setViewMonth((m) => m + 1)
  }
  const goToToday = () => { setViewYear(today.getFullYear()); setViewMonth(today.getMonth()) }

  const openEditorForDay = (day: number) => {
    const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    setEditorDate(dateStr)
    setShowEditor(true)
  }

  const stats = [
    { label: "Всего", value: posts.length, icon: "FileText", color: "text-zinc-300" },
    { label: "Опубликовано", value: posts.filter((p) => p.status === "published").length, icon: "CheckCircle", color: "text-emerald-400" },
    { label: "Запланировано", value: posts.filter((p) => p.status === "scheduled").length, icon: "Clock", color: "text-orange-400" },
    { label: "Черновики", value: posts.filter((p) => p.status === "draft").length, icon: "Edit3", color: "text-zinc-400" },
  ]

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]
  while (cells.length % 7 !== 0) cells.push(null)

  const monthName = MONTHS_RU[viewMonth]
  const isCurrentMonth = viewYear === today.getFullYear() && viewMonth === today.getMonth()

  return (
    <div className="p-3 md:p-6 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-white">Контент-план AI</h1>
          <p className="text-zinc-500 text-sm mt-0.5">Календарь публикаций</p>
        </div>
        <button
          onClick={() => { setEditorDate(""); setShowEditor(true) }}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors whitespace-nowrap"
        >
          <Icon name="Plus" className="w-4 h-4" />
          Добавить пост
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
        {stats.map((s) => (
          <div key={s.label} className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-3 md:p-4">
            <div className="flex items-center gap-2 mb-1.5">
              <Icon name={s.icon} className={`w-3.5 h-3.5 ${s.color}`} />
              <span className="text-zinc-500 text-xs">{s.label}</span>
            </div>
            <div className={`text-2xl font-semibold ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Calendar */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl overflow-hidden">
        {/* Month header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <span className="text-white font-semibold text-base md:text-lg">
              {monthName} {viewYear}
            </span>
            {isCurrentMonth && (
              <span className="hidden sm:block text-xs text-orange-400 border border-orange-500/30 bg-orange-500/10 px-2 py-0.5 rounded-full">
                текущий
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <button onClick={prevMonth} className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors">
              <Icon name="ChevronLeft" className="w-4 h-4" />
            </button>
            {!isCurrentMonth && (
              <button onClick={goToToday} className="px-2.5 py-1.5 text-xs text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors hidden sm:block">
                Сегодня
              </button>
            )}
            <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors">
              <Icon name="ChevronRight" className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Date label row */}
        <div className="px-4 py-2 bg-zinc-900/30 border-b border-zinc-800/50">
          <p className="text-zinc-400 text-xs font-medium">
            {WEEKDAYS_FULL[today.getDay() === 0 ? 6 : today.getDay() - 1]}, {today.getDate()} {MONTHS_RU[today.getMonth()]} {today.getFullYear()}
          </p>
        </div>

        {/* Day names */}
        <div className="grid grid-cols-7 border-b border-zinc-800">
          {DAYS_RU.map((d, i) => (
            <div key={d} className={`py-2 text-center text-[10px] md:text-xs font-semibold ${i >= 5 ? "text-orange-400/60" : "text-zinc-500"}`}>
              {d}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 divide-x divide-zinc-800/50">
          {cells.map((day, idx) => {
            const isToday = day !== null && isCurrentMonth && day === today.getDate()
            const isPast = day !== null && (
              viewYear < today.getFullYear() ||
              (viewYear === today.getFullYear() && viewMonth < today.getMonth()) ||
              (isCurrentMonth && day < today.getDate())
            )
            const isWeekend = idx % 7 >= 5
            const dayPosts = day !== null ? posts.filter((p) => p.year === viewYear && p.month === viewMonth && p.day === day) : []

            return (
              <div
                key={idx}
                className={`min-h-[72px] md:min-h-[100px] p-1.5 md:p-2 relative border-b border-zinc-800/30 transition-colors ${
                  day !== null ? "cursor-pointer hover:bg-zinc-800/30" : ""
                } ${isWeekend && day !== null ? "bg-zinc-900/30" : ""}`}
                onClick={() => day !== null && openEditorForDay(day)}
              >
                {day !== null && (
                  <>
                    <div className="flex items-center justify-between mb-1">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                          isToday
                            ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                            : isPast
                            ? "text-zinc-600"
                            : "text-zinc-300"
                        }`}
                      >
                        {day}
                      </div>
                      {dayPosts.length > 0 && (
                        <span className="text-[9px] text-zinc-500">{dayPosts.length}</span>
                      )}
                    </div>
                    <div className="space-y-0.5">
                      {dayPosts.slice(0, 2).map((post) => (
                        <div
                          key={post.id}
                          onClick={(e) => { e.stopPropagation(); setSelectedDay(post.id) }}
                          className="flex items-center gap-1 bg-zinc-800/70 hover:bg-zinc-700/60 border border-zinc-700/40 rounded px-1 py-0.5 transition-colors"
                        >
                          <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${statusColors[post.status]}`} />
                          <span className="text-[9px] md:text-[10px] text-zinc-300 truncate leading-tight">{post.title}</span>
                        </div>
                      ))}
                      {dayPosts.length > 2 && (
                        <div className="text-[9px] text-zinc-600 px-1">+{dayPosts.length - 2} ещё</div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>

        {/* Legend */}
        <div className="px-4 py-3 border-t border-zinc-800 flex flex-wrap gap-3">
          {[
            { color: "bg-orange-500", label: "Запланированы" },
            { color: "bg-emerald-500", label: "Опубликованы" },
            { color: "bg-zinc-500", label: "Черновики" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${l.color}`} />
              <span className="text-zinc-500 text-[10px]">{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Post editor modal */}
      {showEditor && (
        <PostEditorModal
          onClose={() => setShowEditor(false)}
          initialDate={editorDate}
          mode="create"
        />
      )}
    </div>
  )
}
