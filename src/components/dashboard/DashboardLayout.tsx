import { useState } from "react"
import Icon from "@/components/ui/icon"
import type { DashboardSection } from "@/pages/Dashboard"

interface NavItem {
  id: DashboardSection
  label: string
  icon: string
}

const navGroups: { title: string; items: NavItem[] }[] = [
  {
    title: "ОСНОВНОЕ",
    items: [
      { id: "content-plan", label: "Контент-план AI", icon: "CalendarDays" },
      { id: "posts", label: "Посты", icon: "FileText" },
      { id: "ai-generator", label: "AI Генератор", icon: "Sparkles" },
      { id: "chatgpt", label: "ChatGPT", icon: "MessageSquare" },
      { id: "rss", label: "RSS Репостер", icon: "Rss" },
      { id: "ad-exchange", label: "Биржа рекламы", icon: "TrendingUp" },
    ],
  },
  {
    title: "АНАЛИТИКА",
    items: [
      { id: "analytics", label: "Анализ AI", icon: "BarChart3" },
      { id: "channels", label: "Каналы", icon: "Tv" },
      { id: "instructions", label: "Инструкция", icon: "BookOpen" },
    ],
  },
  {
    title: "ИНСТРУМЕНТЫ",
    items: [
      { id: "team", label: "Офис команды", icon: "Users" },
      { id: "payment", label: "Оплата", icon: "CreditCard" },
      { id: "settings", label: "Настройки", icon: "Settings" },
    ],
  },
]

interface Grid {
  id: number
  name: string
}

const planLimits: Record<string, number> = { Базовый: 1, PRO: 3, Бизнес: 99, Enterprise: 99 }
const currentPlan = "PRO"

interface Props {
  activeSection: DashboardSection
  onSectionChange: (s: DashboardSection) => void
  children: React.ReactNode
}

export function DashboardLayout({ activeSection, onSectionChange, children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showProjectModal, setShowProjectModal] = useState(false)
  const [grids, setGrids] = useState<Grid[]>([{ id: 1, name: "Каналы РакетаПост" }])
  const [activeGrid, setActiveGrid] = useState(1)
  const [editingGridId, setEditingGridId] = useState<number | null>(null)
  const [editingGridName, setEditingGridName] = useState("")
  const [showDeleteGrid, setShowDeleteGrid] = useState<number | null>(null)
  const [showAddGrid, setShowAddGrid] = useState(false)
  const [newGridName, setNewGridName] = useState("")

  const maxGrids = planLimits[currentPlan] || 1
  const canAddGrid = grids.length < maxGrids

  const addGrid = () => {
    if (!newGridName.trim()) return
    const id = Date.now()
    setGrids((prev) => [...prev, { id, name: newGridName.trim() }])
    setActiveGrid(id)
    setNewGridName("")
    setShowAddGrid(false)
  }

  const deleteGrid = (id: number) => {
    setGrids((prev) => prev.filter((g) => g.id !== id))
    if (activeGrid === id && grids.length > 1) setActiveGrid(grids.find((g) => g.id !== id)!.id)
    setShowDeleteGrid(null)
  }

  const saveGridName = () => {
    if (editingGridName.trim() && editingGridId !== null) {
      setGrids((prev) => prev.map((g) => g.id === editingGridId ? { ...g, name: editingGridName.trim() } : g))
    }
    setEditingGridId(null)
  }

  const activeGridName = grids.find((g) => g.id === activeGrid)?.name || "РакетаПост"

  return (
    <div className="flex h-screen bg-[#09090B] overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:static inset-y-0 left-0 z-40 w-56 flex flex-col border-r border-zinc-800 bg-[#0C0C0F] transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-zinc-800">
          <div className="w-7 h-7 rounded-lg bg-orange-500/20 flex items-center justify-center">
            <Icon name="Rocket" className="w-4 h-4 text-orange-500" />
          </div>
          <div>
            <div className="text-white font-semibold text-sm leading-none">РакетаПост</div>
            <div className="text-zinc-500 text-[10px] mt-0.5">AI контент-платформа</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
          {navGroups.map((group) => (
            <div key={group.title}>
              <div className="text-[10px] font-semibold text-zinc-600 px-2 mb-2 tracking-widest">{group.title}</div>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = activeSection === item.id
                  return (
                    <button
                      key={item.id}
                      onClick={() => { onSectionChange(item.id); setSidebarOpen(false) }}
                      className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-all ${isActive ? "bg-orange-500/15 text-orange-400 font-medium" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"}`}
                    >
                      <Icon name={item.icon} className={`w-4 h-4 shrink-0 ${isActive ? "text-orange-400" : "text-zinc-500"}`} />
                      {item.label}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-zinc-800">
          <button className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/60 transition-all">
            <Icon name="LogOut" className="w-4 h-4" />
            Выйти
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between px-3 md:px-6 py-3.5 border-b border-zinc-800 bg-[#09090B] shrink-0">
          <div className="flex items-center gap-2 md:gap-3 min-w-0">
            <button className="md:hidden text-zinc-400 hover:text-white shrink-0" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Icon name="Menu" className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowProjectModal(true)}
              className="flex items-center gap-1.5 border border-zinc-800 rounded-lg px-2.5 py-1.5 bg-zinc-900/50 text-sm text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 cursor-pointer transition-colors min-w-0 max-w-[180px] sm:max-w-xs"
            >
              <Icon name="Folder" className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate text-xs sm:text-sm">{activeGridName}</span>
              <Icon name="ChevronDown" className="w-3.5 h-3.5 shrink-0" />
            </button>
          </div>
          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            <span className="hidden lg:block text-xs text-orange-400 border border-orange-500/30 bg-orange-500/10 px-2.5 py-1 rounded-full whitespace-nowrap">
              PRO · 2 990 ₽/мес
            </span>
            <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center">
              <Icon name="User" className="w-4 h-4 text-zinc-400" />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          {children}
        </main>
      </div>

      {/* Project / Grids modal */}
      {showProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="bg-[#141417] border border-zinc-800 rounded-2xl w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800">
              <div>
                <h3 className="text-white font-semibold">Сетки каналов</h3>
                <p className="text-zinc-500 text-xs mt-0.5">Каждая сетка — отдельное окружение</p>
              </div>
              <button onClick={() => setShowProjectModal(false)} className="text-zinc-500 hover:text-white">
                <Icon name="X" className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-2 max-h-72 overflow-y-auto">
              {grids.map((grid) => (
                <div
                  key={grid.id}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl border transition-all ${activeGrid === grid.id ? "border-orange-500/50 bg-orange-500/5" : "border-zinc-800 hover:border-zinc-700"}`}
                >
                  <button className="flex-1 flex items-center gap-2.5 min-w-0 text-left" onClick={() => { setActiveGrid(grid.id); setShowProjectModal(false) }}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${activeGrid === grid.id ? "bg-orange-500/20" : "bg-zinc-800"}`}>
                      <Icon name="Layers" className={`w-4 h-4 ${activeGrid === grid.id ? "text-orange-400" : "text-zinc-400"}`} />
                    </div>
                    {editingGridId === grid.id ? (
                      <input
                        value={editingGridName}
                        onChange={(e) => setEditingGridName(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") saveGridName(); if (e.key === "Escape") setEditingGridId(null) }}
                        onBlur={saveGridName}
                        autoFocus
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 bg-zinc-900 border border-orange-500/50 rounded-lg px-2 py-1 text-sm text-white focus:outline-none min-w-0"
                      />
                    ) : (
                      <span className={`text-sm font-medium truncate ${activeGrid === grid.id ? "text-white" : "text-zinc-300"}`}>{grid.name}</span>
                    )}
                  </button>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => { setEditingGridId(grid.id); setEditingGridName(grid.name) }}
                      className="p-1.5 text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 rounded-lg transition-colors"
                      title="Переименовать"
                    >
                      <Icon name="Pencil" className="w-3.5 h-3.5" />
                    </button>
                    {grids.length > 1 && (
                      <button
                        onClick={() => setShowDeleteGrid(grid.id)}
                        className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-zinc-800 rounded-lg transition-colors"
                        title="Удалить"
                      >
                        <Icon name="Trash2" className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="px-4 pb-4">
              {showAddGrid ? (
                <div className="flex gap-2">
                  <input
                    value={newGridName}
                    onChange={(e) => setNewGridName(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") addGrid(); if (e.key === "Escape") { setShowAddGrid(false); setNewGridName("") } }}
                    placeholder="Название сетки..."
                    autoFocus
                    className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/60"
                  />
                  <button onClick={addGrid} className="px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-xl transition-colors">
                    Добавить
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => canAddGrid ? setShowAddGrid(true) : undefined}
                  disabled={!canAddGrid}
                  className={`w-full flex items-center justify-center gap-2 py-2.5 border rounded-xl text-sm transition-all ${
                    canAddGrid
                      ? "border-dashed border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200"
                      : "border-zinc-800 text-zinc-600 cursor-not-allowed"
                  }`}
                >
                  <Icon name="Plus" className="w-4 h-4" />
                  {canAddGrid ? "Добавить сетку" : `Лимит достигнут (${maxGrids} для ${currentPlan})`}
                </button>
              )}
              <p className="text-zinc-600 text-xs text-center mt-2">
                {grids.length} / {maxGrids} сеток · тариф {currentPlan}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Delete grid confirm */}
      {showDeleteGrid !== null && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 px-4">
          <div className="bg-[#141417] border border-zinc-800 rounded-2xl p-6 w-full max-w-sm">
            <h3 className="text-white font-semibold mb-2">Удалить сетку?</h3>
            <p className="text-zinc-400 text-sm mb-5">Все каналы и посты этой сетки будут удалены.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteGrid(null)} className="flex-1 py-2.5 border border-zinc-700 text-zinc-300 text-sm rounded-lg hover:bg-zinc-800">Отмена</button>
              <button onClick={() => deleteGrid(showDeleteGrid)} className="flex-1 py-2.5 bg-red-500/80 hover:bg-red-500 text-white text-sm font-medium rounded-lg">Удалить</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
