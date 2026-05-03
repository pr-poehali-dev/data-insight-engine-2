import { useState } from "react"
import Icon from "@/components/ui/icon"

const periods = ["7 дней", "14 дней", "30 дней", "90 дней"]
const channels = ["Все каналы", "РакетаПост TG", "РакетаПост VK", "MAX канал"]

const metrics = [
  { label: "Просмотры", value: "124 800", change: "+18%", icon: "Eye", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
  { label: "Вовлечённость (ER)", value: "4.2%", change: "+0.6%", icon: "Heart", color: "text-pink-400", bg: "bg-pink-500/10 border-pink-500/20" },
  { label: "CTR", value: "1.8%", change: "+0.2%", icon: "MousePointer", color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
  { label: "Постов", value: "48", change: "+12", icon: "FileText", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
]

const chartData = [12, 19, 15, 28, 22, 35, 30, 42, 38, 51, 46, 58, 52, 67]
const chartLabels = ["21 апр", "22", "23", "24", "25", "26", "27", "28", "29", "30", "1 мая", "2", "3", "Сег."]

const topPosts = [
  { title: "Кейс: 10к подписчиков за месяц без рекламы", views: 7640, er: "5.1%" },
  { title: "Запуск РакетаПост — что умеет платформа", views: 4820, er: "3.8%" },
  { title: "Топ-3 ошибки при ведении каналов", views: 3210, er: "4.2%" },
]

const weakPosts = [
  { title: "Пост о важности контент-плана", views: 420, er: "0.8%" },
  { title: "Субботняя подборка новостей", views: 380, er: "0.6%" },
  { title: "Анонс нового функционала", views: 290, er: "0.5%" },
]

export function AnalyticsPage() {
  const [period, setPeriod] = useState("30 дней")
  const [channel, setChannel] = useState("Все каналы")
  const maxChart = Math.max(...chartData)

  return (
    <div className="p-4 md:p-6 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-white">Анализ AI</h1>
          <p className="text-zinc-500 text-sm mt-0.5">Статистика и аналитика ваших каналов</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 px-3 py-2 border border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 text-xs rounded-lg transition-colors">
            <Icon name="FileSpreadsheet" className="w-3.5 h-3.5" />
            Excel
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 border border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 text-xs rounded-lg transition-colors">
            <Icon name="FileText" className="w-3.5 h-3.5" />
            CSV
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 border border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 text-xs rounded-lg transition-colors">
            <Icon name="File" className="w-3.5 h-3.5" />
            PDF
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <div className="flex gap-1 bg-zinc-900/60 border border-zinc-800 rounded-xl p-1">
          {periods.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                period === p ? "bg-orange-500 text-white" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
        <select
          value={channel}
          onChange={(e) => setChannel(e.target.value)}
          className="bg-zinc-900/60 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:border-orange-500/60"
        >
          {channels.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {metrics.map((m) => (
          <div key={m.label} className={`border rounded-xl p-4 ${m.bg}`}>
            <div className="flex items-center justify-between mb-2">
              <Icon name={m.icon} className={`w-4 h-4 ${m.color}`} />
              <span className="text-emerald-400 text-xs font-medium">{m.change}</span>
            </div>
            <div className={`text-2xl font-semibold ${m.color}`}>{m.value}</div>
            <div className="text-zinc-500 text-xs mt-0.5">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4">
        <h2 className="text-white font-medium text-sm mb-4">Просмотры по дням</h2>
        <div className="flex items-end gap-1.5 h-32">
          {chartData.map((v, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-800 border border-zinc-700 rounded px-1.5 py-0.5 text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {(v * 100).toLocaleString()}
              </div>
              <div
                className="w-full rounded-t bg-orange-500/60 hover:bg-orange-500 transition-colors cursor-pointer"
                style={{ height: `${(v / maxChart) * 100}%` }}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          {chartLabels.filter((_, i) => i % 3 === 0).map((l) => (
            <span key={l} className="text-[10px] text-zinc-600">{l}</span>
          ))}
        </div>
      </div>

      {/* Best & Weak posts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Icon name="TrendingUp" className="w-4 h-4 text-emerald-400" />
            <h2 className="text-white font-medium text-sm">Лучшие посты</h2>
          </div>
          <div className="space-y-2.5">
            {topPosts.map((post, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xs font-bold text-zinc-600 w-4 shrink-0">#{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-zinc-300 text-xs truncate">{post.title}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-zinc-500 text-[10px] flex items-center gap-1">
                      <Icon name="Eye" className="w-2.5 h-2.5" />
                      {post.views.toLocaleString()}
                    </span>
                    <span className="text-emerald-400 text-[10px]">ER {post.er}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Icon name="TrendingDown" className="w-4 h-4 text-red-400" />
            <h2 className="text-white font-medium text-sm">Слабые посты</h2>
          </div>
          <div className="space-y-2.5">
            {weakPosts.map((post, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xs font-bold text-zinc-600 w-4 shrink-0">#{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-zinc-300 text-xs truncate">{post.title}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-zinc-500 text-[10px] flex items-center gap-1">
                      <Icon name="Eye" className="w-2.5 h-2.5" />
                      {post.views.toLocaleString()}
                    </span>
                    <span className="text-red-400 text-[10px]">ER {post.er}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
