import { useState } from "react"
import Icon from "@/components/ui/icon"
import { PostEditorModal } from "@/components/dashboard/PostEditorModal"

type Tab = "scheduled" | "drafts" | "published"

const mockPosts = {
  scheduled: [
    { id: 1, title: "Как AI меняет контент-маркетинг в 2025", date: "05 мая, 10:00", channels: ["tg", "vk"], views: null },
    { id: 2, title: "5 лайфхаков для роста Telegram-канала", date: "07 мая, 14:00", channels: ["tg"], views: null },
    { id: 3, title: "Почему авторепостер экономит 10 часов в неделю", date: "09 мая, 18:00", channels: ["tg", "max"], views: null },
  ],
  drafts: [
    { id: 4, title: "Черновик: Кейс агентства", date: "Сохранён 2 мая", channels: ["tg"], views: null },
    { id: 5, title: "Черновик: Инструкция по настройке RSS", date: "Сохранён 1 мая", channels: [], views: null },
  ],
  published: [
    { id: 6, title: "Запуск РакетаПост — что умеет платформа", date: "01 мая, 10:00", channels: ["tg"], views: 4820 },
    { id: 7, title: "Топ-3 ошибки при ведении каналов", date: "28 апр, 14:00", channels: ["tg", "vk"], views: 3210 },
    { id: 8, title: "Кейс: 10к подписчиков за месяц без рекламы", date: "25 апр, 18:00", channels: ["tg"], views: 7640 },
  ],
}

const channelBadge: Record<string, { label: string; color: string }> = {
  tg: { label: "Telegram", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  vk: { label: "ВКонтакте", color: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30" },
  max: { label: "MAX", color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
}

const tabLabels: Record<Tab, string> = { scheduled: "Запланированные", drafts: "Черновики", published: "Опубликованные" }

export function PostsPage() {
  const [tab, setTab] = useState<Tab>("scheduled")
  const [posts, setPosts] = useState(mockPosts)
  const [showStats, setShowStats] = useState<number | null>(null)
  const [showConfirm, setShowConfirm] = useState<number | null>(null)
  const [showEditor, setShowEditor] = useState(false)
  const [editPost, setEditPost] = useState<{ id: number; title: string } | null>(null)

  const currentPosts = posts[tab]

  const deletePost = (id: number) => {
    setPosts((prev) => ({ ...prev, [tab]: prev[tab].filter((p) => p.id !== id) }))
    setShowConfirm(null)
  }

  return (
    <div className="p-3 md:p-6 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-white">Посты</h1>
          <p className="text-zinc-500 text-sm mt-0.5">Управление всеми публикациями</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 border border-zinc-700 text-zinc-300 hover:bg-zinc-800 text-sm rounded-lg transition-colors whitespace-nowrap">
            <Icon name="CalendarDays" className="w-4 h-4" />
            <span className="hidden sm:inline">Контент-план</span>
          </button>
          <button
            onClick={() => { setEditPost(null); setShowEditor(true) }}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors whitespace-nowrap"
          >
            <Icon name="Plus" className="w-4 h-4" />
            Новый пост
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-zinc-900/60 border border-zinc-800 rounded-xl p-1 w-full sm:w-fit overflow-x-auto no-scrollbar">
        {(Object.keys(tabLabels) as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${tab === t ? "bg-orange-500 text-white" : "text-zinc-400 hover:text-zinc-200"}`}
          >
            {tabLabels[t]}
            <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${tab === t ? "bg-white/20" : "bg-zinc-800"}`}>
              {posts[t].length}
            </span>
          </button>
        ))}
      </div>

      {/* Posts list */}
      <div className="space-y-2">
        {currentPosts.length === 0 && (
          <div className="text-center py-16 text-zinc-600">
            <Icon name="FileText" className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="text-sm">Нет постов в этой категории</p>
          </div>
        )}
        {currentPosts.map((post) => (
          <div key={post.id} className="flex items-center gap-3 bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 rounded-xl px-3 md:px-4 py-3.5 transition-colors group">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-white text-sm font-medium truncate">{post.title}</p>
                {post.channels.map((ch) => (
                  <span key={ch} className={`text-[10px] border px-1.5 py-0.5 rounded-full hidden sm:inline ${channelBadge[ch].color}`}>
                    {channelBadge[ch].label}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-zinc-500 text-xs flex items-center gap-1">
                  <Icon name="Clock" className="w-3 h-3" />
                  {post.date}
                </span>
                {post.views !== null && (
                  <span className="text-zinc-500 text-xs flex items-center gap-1">
                    <Icon name="Eye" className="w-3 h-3" />
                    {post.views.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity shrink-0">
              <button
                onClick={() => { setEditPost({ id: post.id, title: post.title }); setShowEditor(true) }}
                className="p-1.5 text-zinc-500 hover:text-orange-400 hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <Icon name="Edit2" className="w-3.5 h-3.5" />
              </button>
              <button className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors hidden sm:flex">
                <Icon name="Copy" className="w-3.5 h-3.5" />
              </button>
              {post.views !== null && (
                <button onClick={() => setShowStats(post.id)} className="p-1.5 text-zinc-500 hover:text-orange-400 hover:bg-zinc-800 rounded-lg transition-colors hidden sm:flex">
                  <Icon name="BarChart2" className="w-3.5 h-3.5" />
                </button>
              )}
              <button onClick={() => setShowConfirm(post.id)} className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-zinc-800 rounded-lg transition-colors">
                <Icon name="Trash2" className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Post editor modal */}
      {showEditor && (
        <PostEditorModal
          onClose={() => { setShowEditor(false); setEditPost(null) }}
          initialText={editPost?.title || ""}
          mode={editPost ? "edit" : "create"}
        />
      )}

      {/* Stats modal */}
      {showStats !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="bg-[#141417] border border-zinc-800 rounded-2xl p-6 w-full max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Статистика поста</h3>
              <button onClick={() => setShowStats(null)} className="text-zinc-500 hover:text-white"><Icon name="X" className="w-5 h-5" /></button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[{ label: "Просмотры", value: "7 640", icon: "Eye", color: "text-blue-400" }, { label: "ER", value: "4.2%", icon: "Heart", color: "text-pink-400" }, { label: "CTR", value: "1.8%", icon: "MousePointer", color: "text-orange-400" }].map((s) => (
                <div key={s.label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-center">
                  <Icon name={s.icon} className={`w-4 h-4 mx-auto mb-1 ${s.color}`} />
                  <div className={`text-lg font-semibold ${s.color}`}>{s.value}</div>
                  <div className="text-zinc-500 text-[10px]">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Confirm delete */}
      {showConfirm !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="bg-[#141417] border border-zinc-800 rounded-2xl p-6 w-full max-w-sm">
            <h3 className="text-white font-semibold mb-2">Удалить пост?</h3>
            <p className="text-zinc-400 text-sm mb-5">Это действие нельзя отменить.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowConfirm(null)} className="flex-1 py-2.5 border border-zinc-700 text-zinc-300 text-sm rounded-lg hover:bg-zinc-800">Отмена</button>
              <button onClick={() => deletePost(showConfirm)} className="flex-1 py-2.5 bg-red-500/80 hover:bg-red-500 text-white text-sm font-medium rounded-lg">Удалить</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
