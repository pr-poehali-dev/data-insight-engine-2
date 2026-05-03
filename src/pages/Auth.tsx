import { useState } from "react"
import Icon from "@/components/ui/icon"

type Mode = "login" | "register"

export default function Auth() {
  const [mode, setMode] = useState<Mode>("login")
  const [email, setEmail] = useState("")
  const [codeSent, setCodeSent] = useState(false)
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)

  const handleGetCode = () => {
    if (!email.trim()) return
    setLoading(true)
    setTimeout(() => { setLoading(false); setCodeSent(true) }, 1200)
  }

  return (
    <div className="min-h-screen bg-[#05050A] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Cosmic background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Stars */}
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              width: Math.random() * 2 + 1 + "px",
              height: Math.random() * 2 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              opacity: Math.random() * 0.6 + 0.1,
              animationDuration: Math.random() * 3 + 2 + "s",
              animationDelay: Math.random() * 2 + "s",
            }}
          />
        ))}
        {/* Gradient orbs */}
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-orange-600/10 blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-orange-500/8 blur-3xl" />
        <div className="absolute top-[30%] right-[10%] w-[30vw] h-[30vw] rounded-full bg-purple-700/8 blur-3xl" />
        {/* Shooting stars */}
        <div className="absolute top-[15%] left-0 w-32 h-px bg-gradient-to-r from-transparent to-orange-400/60 animate-ping" style={{ animationDuration: "3s" }} />
        <div className="absolute top-[60%] right-0 w-24 h-px bg-gradient-to-l from-transparent to-white/40 animate-ping" style={{ animationDuration: "4.5s", animationDelay: "1.5s" }} />
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-700/50 rounded-2xl p-7 shadow-2xl shadow-black/50">
          {/* Logo */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-9 h-9 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
                <Icon name="Rocket" className="w-5 h-5 text-orange-400" />
              </div>
            </div>
            <h1 className="text-white text-2xl font-bold tracking-tight">РакетаПост</h1>
            <p className="text-zinc-500 text-sm mt-1">Управление контентом с ИИ</p>
          </div>

          {/* Mode toggle */}
          <div className="flex rounded-xl overflow-hidden border border-zinc-700 mb-5">
            <button
              onClick={() => { setMode("login"); setCodeSent(false) }}
              className={`flex-1 py-2.5 text-sm font-medium transition-all ${mode === "login" ? "bg-orange-500 text-white" : "text-zinc-400 hover:text-zinc-200"}`}
            >
              Вход
            </button>
            <button
              onClick={() => { setMode("register"); setCodeSent(false) }}
              className={`flex-1 py-2.5 text-sm font-medium transition-all ${mode === "register" ? "bg-orange-500 text-white" : "text-zinc-400 hover:text-zinc-200"}`}
            >
              Регистрация
            </button>
          </div>

          {/* Register bonus */}
          {mode === "register" && (
            <div className="mb-4 px-4 py-2.5 rounded-xl border border-orange-500/30 bg-orange-500/8 flex items-center gap-2">
              <span className="text-orange-400 text-lg">🎁</span>
              <span className="text-orange-300 text-sm">При регистрации — <strong>7 дней бесплатно</strong></span>
            </div>
          )}

          {/* Form */}
          {!codeSent ? (
            <>
              <div className="mb-4">
                <label className="text-zinc-400 text-xs mb-1.5 block">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleGetCode()}
                  placeholder="your@email.com"
                  className="w-full bg-zinc-800/80 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-orange-500/60 focus:bg-zinc-800 transition-all"
                />
              </div>
              <button
                onClick={handleGetCode}
                disabled={!email.trim() || loading}
                className="w-full py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 mb-4"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Отправка...
                  </>
                ) : "Получить код"}
              </button>

              {mode === "register" && (
                <p className="text-center text-zinc-600 text-xs mb-4">
                  Нажимая кнопку, вы соглашаетесь с{" "}
                  <a href="#" className="text-orange-400 hover:text-orange-300 underline">Политикой конфиденциальности</a>
                  {" "}и{" "}
                  <a href="#" className="text-orange-400 hover:text-orange-300 underline">Пользовательским соглашением</a>
                </p>
              )}
            </>
          ) : (
            <>
              <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-2">
                <Icon name="Mail" className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-emerald-300 text-xs">Код отправлен на <strong>{email}</strong></span>
              </div>
              <div className="mb-4">
                <label className="text-zinc-400 text-xs mb-1.5 block">Код подтверждения</label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="000000"
                  maxLength={6}
                  className="w-full bg-zinc-800/80 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 text-sm text-center text-lg tracking-widest font-mono focus:outline-none focus:border-orange-500/60 transition-all"
                />
              </div>
              <a href="/dashboard">
                <button
                  disabled={code.length < 6}
                  className="w-full py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold text-sm rounded-xl transition-colors mb-3"
                >
                  {mode === "login" ? "Войти" : "Создать аккаунт"}
                </button>
              </a>
              <button onClick={() => setCodeSent(false)} className="w-full text-zinc-500 hover:text-zinc-300 text-sm transition-colors">
                ← Изменить email
              </button>
            </>
          )}

          {/* Divider */}
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-zinc-800" />
            <span className="text-zinc-600 text-xs">или</span>
            <div className="flex-1 h-px bg-zinc-800" />
          </div>

          {/* Telegram */}
          <button className="w-full flex items-center justify-center gap-2.5 py-3 bg-[#229ED9] hover:bg-[#1a8bc4] text-white font-semibold text-sm rounded-xl transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
            Войти через Telegram
          </button>

          <div className="text-center mt-5">
            <a href="/" className="text-zinc-600 hover:text-zinc-400 text-xs transition-colors">← На главную</a>
          </div>
        </div>
      </div>
    </div>
  )
}
