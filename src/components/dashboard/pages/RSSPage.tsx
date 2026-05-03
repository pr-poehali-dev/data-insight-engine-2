import { useState } from "react"
import Icon from "@/components/ui/icon"

const topics = [
  { id: "finance", label: "Финансы", icon: "TrendingUp" },
  { id: "tech", label: "Технологии", icon: "Cpu" },
  { id: "marketing", label: "Маркетинг", icon: "Megaphone" },
  { id: "business", label: "Бизнес", icon: "Briefcase" },
  { id: "crypto", label: "Крипто", icon: "Bitcoin" },
  { id: "ai", label: "AI / ML", icon: "Bot" },
  { id: "news", label: "Новости", icon: "Newspaper" },
  { id: "sport", label: "Спорт", icon: "Trophy" },
]

const sourcesByTopic: Record<string, { id: string; name: string; url: string }[]> = {
  finance: [
    { id: "f1", name: "РБК Финансы", url: "rbc.ru/finances/rss" },
    { id: "f2", name: "Коммерсантъ Деньги", url: "kommersant.ru/RSS/money.xml" },
  ],
  tech: [
    { id: "t1", name: "Хабр", url: "habr.com/rss/hubs/all" },
    { id: "t2", name: "TechCrunch RU", url: "techcrunch.com/feed" },
  ],
  marketing: [
    { id: "m1", name: "vc.ru Маркетинг", url: "vc.ru/marketing/rss" },
    { id: "m2", name: "Cossa", url: "cossa.ru/rss" },
  ],
  business: [
    { id: "b1", name: "Forbes Россия", url: "forbes.ru/rss" },
    { id: "b2", name: "Inc. Russia", url: "incrussia.ru/rss" },
  ],
  crypto: [{ id: "c1", name: "CoinTelegraph RU", url: "ru.cointelegraph.com/rss" }],
  ai: [{ id: "a1", name: "AI News", url: "ainews.com/feed" }],
  news: [{ id: "n1", name: "РИА Новости", url: "ria.ru/export/rss2/archive/index.xml" }],
  sport: [{ id: "s1", name: "Спорт-Экспресс", url: "sport-express.ru/rss" }],
}

export function RSSPage() {
  const [autoPublish, setAutoPublish] = useState(true)
  const [checkInterval, setCheckInterval] = useState("30")
  const [postInterval, setPostInterval] = useState("15")
  const [selectedTopics, setSelectedTopics] = useState<string[]>(["tech", "marketing"])
  const [activeSources, setActiveSources] = useState<string[]>(["t1", "m1"])
  const [stopWords, setStopWords] = useState("реклама, спонсор, партнёр")
  const [signature, setSignature] = useState("📢 Читайте больше в нашем канале!")
  const [showAddSource, setShowAddSource] = useState(false)
  const [newSource, setNewSource] = useState({ name: "", url: "" })
  const [customSources, setCustomSources] = useState<{ id: string; name: string; url: string }[]>([])

  const toggleTopic = (id: string) =>
    setSelectedTopics((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]))

  const toggleSource = (id: string) =>
    setActiveSources((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]))

  const addSource = () => {
    if (newSource.name && newSource.url) {
      setCustomSources((prev) => [...prev, { id: `custom_${Date.now()}`, ...newSource }])
      setNewSource({ name: "", url: "" })
      setShowAddSource(false)
    }
  }

  const allSources = [
    ...selectedTopics.flatMap((t) => sourcesByTopic[t] || []),
    ...customSources,
  ]

  return (
    <div className="p-4 md:p-6 space-y-5">
      <div>
        <h1 className="text-xl font-semibold text-white">RSS Репостер</h1>
        <p className="text-zinc-500 text-sm mt-0.5">Автоматическая публикация из внешних источников</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-4">
          {/* Settings */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 space-y-4">
            <h2 className="text-white font-medium text-sm">Настройки автопубликации</h2>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-zinc-200 text-sm">Автопубликация</div>
                <div className="text-zinc-500 text-xs">Включить автоматический постинг из RSS</div>
              </div>
              <button
                onClick={() => setAutoPublish(!autoPublish)}
                className={`w-11 h-6 rounded-full transition-all relative ${autoPublish ? "bg-orange-500" : "bg-zinc-700"}`}
              >
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${autoPublish ? "left-6" : "left-1"}`} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-zinc-400 text-xs mb-1.5 block">Проверка RSS</label>
                <select
                  value={checkInterval}
                  onChange={(e) => setCheckInterval(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500/60"
                >
                  {["10", "15", "30", "60"].map((v) => (
                    <option key={v} value={v}>{v} мин</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-zinc-400 text-xs mb-1.5 block">Интервал между постами</label>
                <select
                  value={postInterval}
                  onChange={(e) => setPostInterval(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500/60"
                >
                  {["5", "15", "30", "60"].map((v) => (
                    <option key={v} value={v}>{v} мин</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-start gap-2 bg-zinc-800/50 rounded-lg p-3">
              <Icon name="Info" className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
              <p className="text-zinc-500 text-xs">AI-очистка контента ~0.04 ₽/пост. Убирает рекламные вставки и форматирует текст под ваш стиль.</p>
            </div>
          </div>

          {/* Topics */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4">
            <h2 className="text-white font-medium text-sm mb-3">Тематики</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {topics.map((t) => (
                <button
                  key={t.id}
                  onClick={() => toggleTopic(t.id)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm transition-all ${
                    selectedTopics.includes(t.id)
                      ? "border-orange-500 bg-orange-500/10 text-orange-400"
                      : "border-zinc-700 text-zinc-400 hover:border-zinc-600"
                  }`}
                >
                  <Icon name={t.icon} className="w-3.5 h-3.5" />
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sources */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-white font-medium text-sm">Источники</h2>
              <button
                onClick={() => setShowAddSource(true)}
                className="flex items-center gap-1.5 text-xs text-orange-400 hover:text-orange-300 transition-colors"
              >
                <Icon name="Plus" className="w-3.5 h-3.5" />
                Добавить свой
              </button>
            </div>
            <div className="space-y-2">
              {allSources.length === 0 && (
                <p className="text-zinc-600 text-sm text-center py-4">Выберите тематику для отображения источников</p>
              )}
              {allSources.map((s) => (
                <div key={s.id} className="flex items-center justify-between px-3 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg">
                  <div>
                    <div className="text-zinc-200 text-sm">{s.name}</div>
                    <div className="text-zinc-600 text-xs">{s.url}</div>
                  </div>
                  <button
                    onClick={() => toggleSource(s.id)}
                    className={`w-10 h-5 rounded-full transition-all relative shrink-0 ${activeSources.includes(s.id) ? "bg-orange-500" : "bg-zinc-700"}`}
                  >
                    <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${activeSources.includes(s.id) ? "left-5" : "left-0.5"}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 space-y-4">
            <h2 className="text-white font-medium text-sm">Фильтры</h2>
            <div>
              <label className="text-zinc-400 text-xs mb-1.5 block">Стоп-слова (через запятую)</label>
              <textarea
                value={stopWords}
                onChange={(e) => setStopWords(e.target.value)}
                rows={3}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/60 resize-none"
              />
            </div>
            <div>
              <label className="text-zinc-400 text-xs mb-1.5 block">Подпись к посту</label>
              <div className="flex gap-1 mb-1.5 p-1 bg-zinc-900 border border-zinc-800 rounded-lg">
                {["B", "I", "🔗"].map((b) => (
                  <button key={b} className="px-2 py-1 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded text-xs">{b}</button>
                ))}
              </div>
              <textarea
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                rows={2}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500/60 resize-none"
              />
              <div className="mt-2 p-2.5 bg-zinc-900 border border-zinc-800 rounded-lg">
                <div className="text-zinc-500 text-[10px] mb-1">Превью:</div>
                <div className="text-zinc-300 text-xs">{signature}</div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <button className="w-full flex items-center justify-center gap-2 py-2.5 border border-zinc-700 text-zinc-300 hover:bg-zinc-800 text-sm rounded-xl transition-colors">
              <Icon name="Send" className="w-4 h-4" />
              Тестовый пост
            </button>
            <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-xl transition-colors">
              <Icon name="Save" className="w-4 h-4" />
              Сохранить настройки
            </button>
          </div>
        </div>
      </div>

      {/* Add source modal */}
      {showAddSource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="bg-[#141417] border border-zinc-800 rounded-2xl p-6 w-full max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Добавить источник</h3>
              <button onClick={() => setShowAddSource(false)} className="text-zinc-500 hover:text-white">
                <Icon name="X" className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3">
              <input
                value={newSource.name}
                onChange={(e) => setNewSource((n) => ({ ...n, name: e.target.value }))}
                placeholder="Название источника"
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/60"
              />
              <input
                value={newSource.url}
                onChange={(e) => setNewSource((n) => ({ ...n, url: e.target.value }))}
                placeholder="URL RSS-ленты"
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/60"
              />
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={() => setShowAddSource(false)} className="flex-1 py-2.5 border border-zinc-700 text-zinc-300 text-sm rounded-lg hover:bg-zinc-800">
                Отмена
              </button>
              <button onClick={addSource} className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg">
                Добавить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
