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
      { id: "chatgpt", label: "ChatGPT", icon: "MessageSquare" },
      { id: "payment", label: "Оплата", icon: "CreditCard" },
      { id: "settings", label: "Настройки", icon: "Settings" },
    ],
  },
]

interface Props {
  activeSection: DashboardSection
  onSectionChange: (s: DashboardSection) => void
  children: React.ReactNode
}

export function DashboardLayout({ activeSection, onSectionChange, children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-[#09090B] overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-56 flex flex-col border-r border-zinc-800 bg-[#0C0C0F] transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
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
              <div className="text-[10px] font-semibold text-zinc-600 px-2 mb-2 tracking-widest">
                {group.title}
              </div>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = activeSection === item.id
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSectionChange(item.id)
                        setSidebarOpen(false)
                      }}
                      className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-all ${
                        isActive
                          ? "bg-orange-500/15 text-orange-400 font-medium"
                          : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"
                      }`}
                    >
                      <Icon
                        name={item.icon}
                        className={`w-4 h-4 shrink-0 ${isActive ? "text-orange-400" : "text-zinc-500"}`}
                      />
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
        <header className="flex items-center justify-between px-4 md:px-6 py-3.5 border-b border-zinc-800 bg-[#09090B] shrink-0">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden text-zinc-400 hover:text-white"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Icon name="Menu" className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 border border-zinc-800 rounded-lg px-3 py-1.5 bg-zinc-900/50 text-sm text-zinc-400 hover:text-zinc-200 cursor-pointer transition-colors">
              <Icon name="Folder" className="w-3.5 h-3.5" />
              <span>Проект: РакетаПост</span>
              <Icon name="ChevronDown" className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-xs text-orange-400 border border-orange-500/30 bg-orange-500/10 px-2.5 py-1 rounded-full">
              Тариф: PRO · 2 990 ₽/мес
            </span>
            <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center">
              <Icon name="User" className="w-4 h-4 text-zinc-400" />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
