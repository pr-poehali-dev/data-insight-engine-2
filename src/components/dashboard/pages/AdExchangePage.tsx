import { useState } from "react"
import Icon from "@/components/ui/icon"

type Tab = "feed" | "my" | "create"

const mockOffers = [
  { id: 1, channel: "ИнвестПро", platform: "tg", price: 3500, topic: "Финансы", subscribers: "48 200", contact: "@investpro_ads" },
  { id: 2, channel: "TechDaily", platform: "tg", price: 1200, topic: "Технологии", subscribers: "12 400", contact: "@techdaily_adv" },
  { id: 3, channel: "Маркетинг & SMM", platform: "vk", price: 2000, topic: "Маркетинг", subscribers: "31 000", contact: "@smm_adv" },
  { id: 4, channel: "CryptoFlash", platform: "tg", price: 5000, topic: "Крипто", subscribers: "87 600", contact: "@cryptoflash_ads" },
  { id: 5, channel: "БизнесХаб", platform: "tg", price: 1800, topic: "Бизнес", subscribers: "22 100", contact: "@bizneshub" },
]

const myOffers = [
  { id: 10, channel: "РакетаПост", platform: "tg", price: 2500, topic: "AI/SMM", subscribers: "15 000", contact: "@raketapost_ads", boosted: false },
]

const platformColors: Record<string, string> = {
  tg: "bg-blue-500/20 text-blue-400",
  vk: "bg-indigo-500/20 text-indigo-400",
  max: "bg-orange-500/20 text-orange-400",
}
const platformLabels: Record<string, string> = { tg: "Telegram", vk: "ВКонтакте", max: "MAX" }

const boostOptions = [
  { days: 1, price: 100 },
  { days: 3, price: 200 },
  { days: 7, price: 350 },
]

const topics = ["Финансы", "Технологии", "Маркетинг", "Бизнес", "Крипто", "AI/SMM", "Новости", "Спорт", "Развлечения"]

export function AdExchangePage() {
  const [tab, setTab] = useState<Tab>("feed")
  const [showBoost, setShowBoost] = useState<number | null>(null)
  const [showCreate, setShowCreate] = useState(false)
  const [selectedBoost, setSelectedBoost] = useState<number | null>(null)
  const [form, setForm] = useState({ channel: "", title: "", desc: "", price: "", topic: topics[0], contact: "" })

  return (
    <div className="p-4 md:p-6 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-white">Биржа рекламы</h1>
          <p className="text-zinc-500 text-sm mt-0.5">Покупка и продажа рекламы без комиссии</p>
        </div>
        <button
          onClick={() => setTab("create")}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors whitespace-nowrap"
        >
          <Icon name="Plus" className="w-4 h-4" />
          Создать оффер
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-zinc-900/60 border border-zinc-800 rounded-xl p-1 w-fit">
        {([["feed", "🛒 Лента предложений"], ["my", "📋 Мои офферы"], ["create", "➕ Создать оффер"]] as [Tab, string][]).map(([t, label]) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              tab === t ? "bg-orange-500 text-white" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Feed */}
      {tab === "feed" && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {mockOffers.map((offer) => (
            <div key={offer.id} className="bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 rounded-xl p-4 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center">
                      <Icon name="Tv" className="w-4 h-4 text-zinc-400" />
                    </div>
                    <div>
                      <div className="text-white text-sm font-medium">{offer.channel}</div>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${platformColors[offer.platform]}`}>
                        {platformLabels[offer.platform]}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-orange-400 font-semibold text-sm">{offer.price.toLocaleString()} ₽</div>
                  <div className="text-zinc-500 text-xs">за пост</div>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded-full">{offer.topic}</span>
                <span className="text-xs text-zinc-500 flex items-center gap-1">
                  <Icon name="Users" className="w-3 h-3" />
                  {offer.subscribers}
                </span>
              </div>
              <div className="flex gap-2">
                <a
                  href={`https://t.me/${offer.contact.replace("@", "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs rounded-lg transition-colors"
                >
                  <Icon name="MessageCircle" className="w-3.5 h-3.5" />
                  Связаться
                </a>
                <button
                  onClick={() => setShowBoost(offer.id)}
                  className="flex items-center gap-1.5 px-3 py-2 border border-zinc-700 hover:bg-zinc-800 text-zinc-400 hover:text-yellow-400 text-xs rounded-lg transition-colors"
                >
                  <Icon name="Star" className="w-3.5 h-3.5" />
                  Поднять
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* My offers */}
      {tab === "my" && (
        <div className="space-y-3">
          {myOffers.length === 0 ? (
            <div className="text-center py-16 text-zinc-600">
              <Icon name="TrendingUp" className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p className="text-sm">У вас нет активных офферов</p>
            </div>
          ) : myOffers.map((offer) => (
            <div key={offer.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-zinc-900/60 border border-zinc-800 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center">
                  <Icon name="Rocket" className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <div className="text-white font-medium text-sm">{offer.channel}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${platformColors[offer.platform]}`}>
                      {platformLabels[offer.platform]}
                    </span>
                    <span className="text-zinc-500 text-xs">{offer.topic}</span>
                    <span className="text-orange-400 text-xs font-medium">{offer.price.toLocaleString()} ₽</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowBoost(offer.id)}
                  className="flex items-center gap-1.5 px-3 py-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs rounded-lg hover:bg-yellow-500/20 transition-colors"
                >
                  <Icon name="Star" className="w-3.5 h-3.5" />
                  Поднять
                </button>
                <button className="flex items-center gap-1.5 px-3 py-2 border border-zinc-700 text-zinc-400 hover:bg-zinc-800 text-xs rounded-lg transition-colors">
                  <Icon name="Edit2" className="w-3.5 h-3.5" />
                  Изменить
                </button>
                <button className="p-2 border border-zinc-700 text-zinc-500 hover:text-red-400 hover:bg-zinc-800 rounded-lg transition-colors">
                  <Icon name="Trash2" className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create */}
      {tab === "create" && (
        <div className="max-w-lg">
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-4">
            <h2 className="text-white font-medium">Новый оффер</h2>
            {[
              { label: "Название канала", key: "channel", placeholder: "Мой канал" },
              { label: "Заголовок объявления", key: "title", placeholder: "Реклама в IT-канале" },
              { label: "Контакт Telegram", key: "contact", placeholder: "@username" },
            ].map(({ label, key, placeholder }) => (
              <div key={key}>
                <label className="text-zinc-400 text-xs mb-1.5 block">{label}</label>
                <input
                  value={form[key as keyof typeof form]}
                  onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                  placeholder={placeholder}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/60"
                />
              </div>
            ))}
            <div>
              <label className="text-zinc-400 text-xs mb-1.5 block">Описание</label>
              <textarea
                value={form.desc}
                onChange={(e) => setForm((f) => ({ ...f, desc: e.target.value }))}
                placeholder="Опишите ваш канал и условия размещения..."
                rows={3}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/60 resize-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-zinc-400 text-xs mb-1.5 block">Цена (₽)</label>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                  placeholder="2500"
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/60"
                />
              </div>
              <div>
                <label className="text-zinc-400 text-xs mb-1.5 block">Тематика</label>
                <select
                  value={form.topic}
                  onChange={(e) => setForm((f) => ({ ...f, topic: e.target.value }))}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500/60"
                >
                  {topics.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <button className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium text-sm rounded-xl transition-colors">
              Опубликовать оффер
            </button>
          </div>
        </div>
      )}

      {/* Boost modal */}
      {showBoost !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="bg-[#141417] border border-zinc-800 rounded-2xl p-6 w-full max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Поднять оффер</h3>
              <button onClick={() => setShowBoost(null)} className="text-zinc-500 hover:text-white">
                <Icon name="X" className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2 mb-5">
              {boostOptions.map((opt) => (
                <button
                  key={opt.days}
                  onClick={() => setSelectedBoost(opt.days)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
                    selectedBoost === opt.days
                      ? "border-orange-500 bg-orange-500/10"
                      : "border-zinc-700 hover:border-zinc-600"
                  }`}
                >
                  <span className="text-zinc-200 text-sm">{opt.days} {opt.days === 1 ? "день" : "дня"}</span>
                  <span className="text-orange-400 font-semibold">{opt.price} ₽</span>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowBoost(null)} className="flex-1 py-2.5 border border-zinc-700 text-zinc-300 text-sm rounded-lg hover:bg-zinc-800">
                Отмена
              </button>
              <button
                onClick={() => setShowBoost(null)}
                disabled={!selectedBoost}
                className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white text-sm font-medium rounded-lg"
              >
                Оплатить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
