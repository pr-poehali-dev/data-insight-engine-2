import { useState } from "react"
import Icon from "@/components/ui/icon"

const mockChannels = [
  { id: 1, name: "РакетаПост", platform: "tg", status: true },
  { id: 2, name: "РакетаПост VK", platform: "vk", status: true },
  { id: 3, name: "MAX Demo", platform: "max", status: false },
]

const platformInfo: Record<string, { label: string; color: string; icon: string }> = {
  tg: { label: "Telegram", color: "text-blue-400 bg-blue-500/10 border-blue-500/30", icon: "Send" },
  vk: { label: "ВКонтакте", color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/30", icon: "Globe" },
  max: { label: "MAX", color: "text-orange-400 bg-orange-500/10 border-orange-500/30", icon: "Tv" },
}

const maxSteps = [
  { title: "Создайте бота на business.max.ru", desc: "Зарегистрируйтесь для бизнеса и пройдите верификацию (ИП/юрлицо). Создайте чат-бота и дождитесь модерации (до 24ч)." },
  { title: "Настройте права бота", desc: "Создайте канал для бизнеса и добавьте бота администратором. Разрешите публикацию сообщений в чатах." },
  { title: "Скопируйте API ключ", desc: "Вставьте CHAT_ID и API токен бота в поля ниже." },
  { title: "Введите название и добавьте канал", desc: "Укажите отображаемое имя канала и нажмите «Добавить MAX»." },
]

export function ChannelsPage() {
  const [channels, setChannels] = useState(mockChannels)
  const [activeTab, setActiveTab] = useState<"tg" | "vk" | "max">("tg")
  const [showMaxModal, setShowMaxModal] = useState(false)
  const [maxStep, setMaxStep] = useState(0)
  const [maxForm, setMaxForm] = useState({ chatId: "", token: "", name: "" })
  const [showConfirm, setShowConfirm] = useState<number | null>(null)
  const [showTest, setShowTest] = useState<number | null>(null)
  const [tgUsername, setTgUsername] = useState("")
  const [vkToken, setVkToken] = useState("")
  const [vkGroupId, setVkGroupId] = useState("")

  const deleteChannel = (id: number) => {
    setChannels((prev) => prev.filter((c) => c.id !== id))
    setShowConfirm(null)
  }

  const tabChannels = channels.filter((c) => c.platform === activeTab)

  return (
    <div className="p-4 md:p-6 space-y-5">
      <div>
        <h1 className="text-xl font-semibold text-white">Каналы</h1>
        <p className="text-zinc-500 text-sm mt-0.5">Подключение и управление каналами</p>
      </div>

      {/* Platform tabs */}
      <div className="flex gap-2">
        {(["tg", "vk", "max"] as const).map((p) => (
          <button
            key={p}
            onClick={() => setActiveTab(p)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
              activeTab === p
                ? `${platformInfo[p].color} border-current`
                : "border-zinc-700 text-zinc-400 hover:border-zinc-600"
            }`}
          >
            <Icon name={platformInfo[p].icon} className="w-4 h-4" />
            {platformInfo[p].label}
            <span className="text-xs opacity-60">({channels.filter((c) => c.platform === p).length})</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Connect form */}
        <div className="lg:col-span-2">
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 space-y-4">
            <h2 className="text-white font-medium text-sm">
              Подключить {platformInfo[activeTab].label}
            </h2>

            {activeTab === "tg" && (
              <>
                <div className="space-y-2 text-sm text-zinc-400">
                  {[
                    "Добавьте бота @RaketaPostBot в канал как администратора",
                    "Выдайте право «Публиковать сообщения»",
                    "Укажите @username канала ниже",
                  ].map((step, i) => (
                    <div key={i} className="flex gap-2">
                      <span className="w-5 h-5 rounded-full bg-orange-500/20 text-orange-400 text-xs flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
                <input
                  value={tgUsername}
                  onChange={(e) => setTgUsername(e.target.value)}
                  placeholder="@username_канала"
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/60"
                />
                <button className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-xl transition-colors">
                  Подключить Telegram
                </button>
              </>
            )}

            {activeTab === "vk" && (
              <>
                <div className="space-y-2 text-sm text-zinc-400">
                  {[
                    "Создайте сообщество ВКонтакте",
                    "Управление → Работа с API → создайте ключ с правами на стену",
                    "Скопируйте ID сообщества и токен",
                  ].map((step, i) => (
                    <div key={i} className="flex gap-2">
                      <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 text-xs flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
                <input value={vkGroupId} onChange={(e) => setVkGroupId(e.target.value)} placeholder="ID сообщества (club...)" className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/60" />
                <input value={vkToken} onChange={(e) => setVkToken(e.target.value)} placeholder="Access token" className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/60" />
                <button className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-xl transition-colors">
                  Подключить ВКонтакте
                </button>
              </>
            )}

            {activeTab === "max" && (
              <button
                onClick={() => { setShowMaxModal(true); setMaxStep(0) }}
                className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Icon name="Plus" className="w-4 h-4" />
                Подключить MAX (4 шага)
              </button>
            )}
          </div>
        </div>

        {/* Channels table */}
        <div className="lg:col-span-3">
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-zinc-800">
              <h2 className="text-white font-medium text-sm">Подключённые каналы</h2>
            </div>
            {tabChannels.length === 0 ? (
              <div className="text-center py-12 text-zinc-600">
                <Icon name="Tv" className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p className="text-sm">Нет подключённых каналов</p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-800">
                    {["Название", "Статус", "Тест", ""].map((h) => (
                      <th key={h} className="px-4 py-2.5 text-left text-xs text-zinc-500 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50">
                  {tabChannels.map((ch) => (
                    <tr key={ch.id} className="hover:bg-zinc-800/30 transition-colors">
                      <td className="px-4 py-3">
                        <div className="text-zinc-200 text-sm font-medium">{ch.name}</div>
                        <div className="text-zinc-600 text-xs">ID: {ch.id}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${ch.status ? "bg-emerald-500/20 text-emerald-400" : "bg-zinc-700 text-zinc-500"}`}>
                          {ch.status ? "Активен" : "Не активен"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setShowTest(ch.id)}
                          className="p-1.5 text-zinc-500 hover:text-orange-400 hover:bg-zinc-800 rounded-lg transition-colors"
                        >
                          <Icon name="Search" className="w-3.5 h-3.5" />
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setShowConfirm(ch.id)}
                          className="p-1.5 text-zinc-600 hover:text-red-400 hover:bg-zinc-800 rounded-lg transition-colors"
                        >
                          <Icon name="Trash2" className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* MAX Modal */}
      {showMaxModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="bg-[#141417] border border-zinc-800 rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-semibold">Подключение MAX</h3>
              <button onClick={() => setShowMaxModal(false)} className="text-zinc-500 hover:text-white">
                <Icon name="X" className="w-5 h-5" />
              </button>
            </div>
            {/* Steps indicator */}
            <div className="flex gap-1 mb-5">
              {maxSteps.map((_, i) => (
                <div key={i} className={`flex-1 h-1 rounded-full ${i <= maxStep ? "bg-orange-500" : "bg-zinc-800"}`} />
              ))}
            </div>
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">{maxStep + 1}</span>
                <h4 className="text-white font-medium text-sm">{maxSteps[maxStep].title}</h4>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed ml-8">{maxSteps[maxStep].desc}</p>
            </div>
            {maxStep === 2 && (
              <div className="space-y-3 mb-4">
                <input value={maxForm.chatId} onChange={(e) => setMaxForm((f) => ({ ...f, chatId: e.target.value }))} placeholder="CHAT_ID" className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/60" />
                <input value={maxForm.token} onChange={(e) => setMaxForm((f) => ({ ...f, token: e.target.value }))} placeholder="API Token бота" className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/60" />
              </div>
            )}
            {maxStep === 3 && (
              <input value={maxForm.name} onChange={(e) => setMaxForm((f) => ({ ...f, name: e.target.value }))} placeholder="Название канала" className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/60 mb-4" />
            )}
            <div className="flex gap-3">
              {maxStep > 0 && (
                <button onClick={() => setMaxStep((s) => s - 1)} className="px-4 py-2.5 border border-zinc-700 text-zinc-300 text-sm rounded-lg hover:bg-zinc-800">
                  Назад
                </button>
              )}
              <button
                onClick={() => {
                  if (maxStep < 3) setMaxStep((s) => s + 1)
                  else setShowMaxModal(false)
                }}
                className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg"
              >
                {maxStep < 3 ? "Далее" : "➕ Добавить MAX"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm delete */}
      {showConfirm !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="bg-[#141417] border border-zinc-800 rounded-2xl p-6 w-full max-w-sm">
            <h3 className="text-white font-semibold mb-2">Удалить канал?</h3>
            <p className="text-zinc-400 text-sm mb-5">Это действие нельзя отменить. Канал будет отключён от платформы.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowConfirm(null)} className="flex-1 py-2.5 border border-zinc-700 text-zinc-300 text-sm rounded-lg hover:bg-zinc-800">Отмена</button>
              <button onClick={() => deleteChannel(showConfirm)} className="flex-1 py-2.5 bg-red-500/80 hover:bg-red-500 text-white text-sm font-medium rounded-lg">Удалить</button>
            </div>
          </div>
        </div>
      )}

      {/* Test notification */}
      {showTest !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="bg-[#141417] border border-zinc-800 rounded-2xl p-6 w-full max-w-sm text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-3">
              <Icon name="CheckCircle" className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">Тестовое сообщение отправлено</h3>
            <p className="text-zinc-400 text-sm mb-4">Проверьте канал — сообщение должно появиться в течение нескольких секунд.</p>
            <button onClick={() => setShowTest(null)} className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg">Закрыть</button>
          </div>
        </div>
      )}
    </div>
  )
}
