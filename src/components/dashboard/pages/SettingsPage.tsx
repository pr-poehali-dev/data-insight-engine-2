import { useState } from "react"
import Icon from "@/components/ui/icon"

export function SettingsPage() {
  const [profile, setProfile] = useState({ name: "Иван Петров", email: "ivan@example.com", telegram: "@ivan_petrov" })
  const [notifications, setNotifications] = useState({
    email: true, telegram: true, postPublished: true,
    newEmployee: false, weeklyDigest: true, deadlineReminder: true,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showDeleteAccount, setShowDeleteAccount] = useState(false)
  const [passwordForm, setPasswordForm] = useState({ old: "", new: "", confirm: "" })
  const [deleteEmail, setDeleteEmail] = useState("")
  const [saved, setSaved] = useState(false)

  const saveProfile = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const sessions = [
    { device: "Chrome, macOS", ip: "95.14.xx.xx", time: "Сейчас", current: true },
    { device: "Safari, iPhone", ip: "95.14.xx.xx", time: "2 дня назад", current: false },
  ]

  const notifLabels: Record<keyof typeof notifications, string> = {
    email: "Email-уведомления",
    telegram: "Telegram-уведомления",
    postPublished: "Пост опубликован",
    newEmployee: "Новый сотрудник",
    weeklyDigest: "Еженедельный дайджест",
    deadlineReminder: "Напоминание о дедлайне",
  }

  return (
    <div className="p-4 md:p-6 space-y-5 max-w-2xl">
      <div>
        <h1 className="text-xl font-semibold text-white">Настройки</h1>
        <p className="text-zinc-500 text-sm mt-0.5">Профиль, уведомления и безопасность</p>
      </div>

      {/* Profile */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-4">
        <h2 className="text-white font-semibold text-sm flex items-center gap-2">
          <Icon name="User" className="w-4 h-4 text-orange-400" />
          Профиль
        </h2>
        {/* Avatar */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-orange-500/20 flex items-center justify-center">
            <span className="text-orange-400 font-bold text-2xl">{profile.name[0]}</span>
          </div>
          <div>
            <button className="flex items-center gap-2 px-3 py-2 border border-zinc-700 text-zinc-300 hover:bg-zinc-800 text-xs rounded-lg transition-colors">
              <Icon name="Upload" className="w-3.5 h-3.5" />
              Загрузить фото
            </button>
            <p className="text-zinc-600 text-[10px] mt-1">JPG, PNG до 5 МБ</p>
          </div>
        </div>
        {[
          { label: "Имя", key: "name", placeholder: "Ваше имя" },
          { label: "Email", key: "email", placeholder: "email@example.com" },
          { label: "Telegram", key: "telegram", placeholder: "@username" },
        ].map(({ label, key, placeholder }) => (
          <div key={key}>
            <label className="text-zinc-400 text-xs mb-1.5 block">{label}</label>
            <input
              value={profile[key as keyof typeof profile]}
              onChange={(e) => setProfile((p) => ({ ...p, [key]: e.target.value }))}
              placeholder={placeholder}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/60"
            />
          </div>
        ))}
        <button
          onClick={saveProfile}
          className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl transition-all ${
            saved ? "bg-emerald-500 text-white" : "bg-orange-500 hover:bg-orange-600 text-white"
          }`}
        >
          <Icon name={saved ? "Check" : "Save"} className="w-4 h-4" />
          {saved ? "Сохранено!" : "Сохранить"}
        </button>
      </div>

      {/* Notifications */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-3">
        <h2 className="text-white font-semibold text-sm flex items-center gap-2">
          <Icon name="Bell" className="w-4 h-4 text-orange-400" />
          Уведомления
        </h2>
        {(Object.keys(notifications) as (keyof typeof notifications)[]).map((key) => (
          <div key={key} className="flex items-center justify-between py-1">
            <span className="text-zinc-300 text-sm">{notifLabels[key]}</span>
            <button
              onClick={() => setNotifications((n) => ({ ...n, [key]: !n[key] }))}
              className={`w-11 h-6 rounded-full transition-all relative shrink-0 ${notifications[key] ? "bg-orange-500" : "bg-zinc-700"}`}
            >
              <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${notifications[key] ? "left-6" : "left-1"}`} />
            </button>
          </div>
        ))}
      </div>

      {/* Security */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-4">
        <h2 className="text-white font-semibold text-sm flex items-center gap-2">
          <Icon name="Shield" className="w-4 h-4 text-orange-400" />
          Безопасность
        </h2>
        <button
          onClick={() => setShowPassword(true)}
          className="flex items-center gap-2 px-4 py-2.5 border border-zinc-700 text-zinc-300 hover:bg-zinc-800 text-sm rounded-xl transition-colors"
        >
          <Icon name="Lock" className="w-4 h-4" />
          Сменить пароль
        </button>
        <div>
          <h3 className="text-zinc-400 text-xs mb-2">Активные сессии</h3>
          <div className="space-y-2">
            {sessions.map((s, i) => (
              <div key={i} className="flex items-center justify-between px-3 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-200 text-sm">{s.device}</span>
                    {s.current && <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-1.5 py-0.5 rounded-full">текущая</span>}
                  </div>
                  <div className="text-zinc-600 text-xs">{s.ip} · {s.time}</div>
                </div>
                {!s.current && (
                  <button className="text-xs text-red-400 hover:text-red-300 border border-red-500/30 hover:bg-red-500/10 px-2.5 py-1 rounded-lg transition-colors">
                    Завершить
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Data */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-4">
        <h2 className="text-white font-semibold text-sm flex items-center gap-2">
          <Icon name="Database" className="w-4 h-4 text-orange-400" />
          Данные
        </h2>
        <div className="flex flex-wrap gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 border border-zinc-700 text-zinc-300 hover:bg-zinc-800 text-sm rounded-xl transition-colors">
            <Icon name="Download" className="w-4 h-4" />
            Экспорт CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-zinc-700 text-zinc-300 hover:bg-zinc-800 text-sm rounded-xl transition-colors">
            <Icon name="Download" className="w-4 h-4" />
            Экспорт JSON
          </button>
        </div>
        <div className="pt-2 border-t border-zinc-800">
          <button
            onClick={() => setShowDeleteAccount(true)}
            className="flex items-center gap-2 px-4 py-2.5 border border-red-500/30 text-red-400 hover:bg-red-500/10 text-sm rounded-xl transition-colors"
          >
            <Icon name="Trash2" className="w-4 h-4" />
            Удалить аккаунт
          </button>
          <p className="text-zinc-600 text-xs mt-2">Все данные будут безвозвратно удалены</p>
        </div>
      </div>

      {/* Password modal */}
      {showPassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="bg-[#141417] border border-zinc-800 rounded-2xl p-6 w-full max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Сменить пароль</h3>
              <button onClick={() => setShowPassword(false)} className="text-zinc-500 hover:text-white"><Icon name="X" className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              {[["old", "Текущий пароль"], ["new", "Новый пароль"], ["confirm", "Подтвердите пароль"]].map(([key, label]) => (
                <div key={key}>
                  <label className="text-zinc-400 text-xs mb-1.5 block">{label}</label>
                  <input
                    type="password"
                    value={passwordForm[key as keyof typeof passwordForm]}
                    onChange={(e) => setPasswordForm((f) => ({ ...f, [key]: e.target.value }))}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500/60"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={() => setShowPassword(false)} className="flex-1 py-2.5 border border-zinc-700 text-zinc-300 text-sm rounded-lg hover:bg-zinc-800">Отмена</button>
              <button onClick={() => setShowPassword(false)} className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg">Сохранить</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete account modal */}
      {showDeleteAccount && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="bg-[#141417] border border-zinc-800 rounded-2xl p-6 w-full max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Удалить аккаунт</h3>
              <button onClick={() => setShowDeleteAccount(false)} className="text-zinc-500 hover:text-white"><Icon name="X" className="w-5 h-5" /></button>
            </div>
            <p className="text-zinc-400 text-sm mb-4">Это действие нельзя отменить. Введите ваш email для подтверждения.</p>
            <input
              value={deleteEmail}
              onChange={(e) => setDeleteEmail(e.target.value)}
              placeholder={profile.email}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-red-500/60 mb-4"
            />
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteAccount(false)} className="flex-1 py-2.5 border border-zinc-700 text-zinc-300 text-sm rounded-lg hover:bg-zinc-800">Отмена</button>
              <button
                disabled={deleteEmail !== profile.email}
                className="flex-1 py-2.5 bg-red-500/80 hover:bg-red-500 disabled:opacity-40 text-white text-sm font-medium rounded-lg"
              >
                Удалить навсегда
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
