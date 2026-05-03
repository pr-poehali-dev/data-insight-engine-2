import { useState } from "react"
import Icon from "@/components/ui/icon"

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800 bg-[#09090B]/80 backdrop-blur-md">
      <div className="w-full flex justify-center px-4 py-4">
        <div className="w-full max-w-4xl flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Icon name="Rocket" className="w-5 h-5 text-orange-500" />
            <span className="text-white font-semibold">РакетаПост</span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
              Функции
            </a>
            <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
              Тарифы
            </a>
            <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
              Биржа рекламы
            </a>
          </div>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-4">
            <a href="/auth" className="text-sm text-zinc-400 hover:text-white transition-colors whitespace-nowrap">
              Войти
            </a>
            <a
              href="/auth"
              className="text-sm text-white bg-orange-500 hover:bg-orange-600 px-3.5 py-1.5 rounded-md transition-colors whitespace-nowrap"
            >
              Попробовать бесплатно
            </a>
          </div>

          {/* Mobile: login + burger */}
          <div className="flex md:hidden items-center gap-3">
            <a
              href="/auth"
              className="text-sm text-white bg-orange-500 hover:bg-orange-600 px-3 py-1.5 rounded-md transition-colors whitespace-nowrap"
            >
              Войти
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-zinc-400 hover:text-white transition-colors p-1"
              aria-label="Меню"
            >
              <Icon name={menuOpen ? "X" : "Menu"} className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-zinc-800 bg-[#09090B] px-4 py-4 flex flex-col gap-4">
          <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors py-1">
            Функции
          </a>
          <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors py-1">
            Тарифы
          </a>
          <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors py-1">
            Биржа рекламы
          </a>
        </div>
      )}
    </nav>
  )
}