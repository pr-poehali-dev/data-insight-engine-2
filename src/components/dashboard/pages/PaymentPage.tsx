import { useState } from "react"
import Icon from "@/components/ui/icon"

const plans = [
  { name: "Базовый", price: "990", desc: "Для старта", features: ["1 сетка каналов", "2 канала в сетке", "AI генератор постов", "Авторепостер (1 источник)"], highlight: false, current: false },
  { name: "PRO", price: "2 990", desc: "Самый популярный", features: ["3 сетки каналов", "3 канала в сетке", "AI + картинки", "Авторепостер (10 источников)", "Команда (+1 сотр.)"], highlight: true, current: true },
  { name: "Бизнес", price: "4 990", desc: "Для агентств", features: ["Безлимит сеток", "Безлимит каналов", "AI + видео", "Безлимит источников", "Команда (безлимит)"], highlight: false, current: false },
  { name: "Enterprise", price: "По запросу", desc: "Под ключ", features: ["Всё включено", "Индивидуальные условия", "Личный менеджер", "SLA и приоритет"], highlight: false, current: false },
]

const history = [
  { id: "INV-001", date: "1 мая 2025", amount: "2 990 ₽", plan: "PRO", status: "Оплачено" },
  { id: "INV-002", date: "1 апр 2025", amount: "2 990 ₽", plan: "PRO", status: "Оплачено" },
  { id: "INV-003", date: "1 мар 2025", amount: "990 ₽", plan: "Базовый", status: "Оплачено" },
]

export function PaymentPage() {
  const [gptBalance] = useState("142.80")
  const [showTopup, setShowTopup] = useState(false)
  const [topupAmount, setTopupAmount] = useState("500")

  const presets = ["100", "300", "500", "1000", "2000"]

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Оплата</h1>
        <p className="text-zinc-500 text-sm mt-0.5">Управление тарифом и балансом</p>
      </div>

      {/* GPT Balance */}
      <div className="bg-gradient-to-r from-orange-500/10 to-orange-500/5 border border-orange-500/20 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Icon name="Zap" className="w-4 h-4 text-orange-400" />
            <span className="text-zinc-300 text-sm font-medium">GPT-баланс</span>
          </div>
          <div className="text-3xl font-semibold text-white">{gptBalance} ₽</div>
          <div className="text-zinc-500 text-xs mt-1">Себестоимость: (токены / 1000) × 0.03 ₽ × 2.5</div>
        </div>
        <button
          onClick={() => setShowTopup(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-xl transition-colors whitespace-nowrap"
        >
          <Icon name="Plus" className="w-4 h-4" />
          Пополнить баланс
        </button>
      </div>

      {/* Plans */}
      <div>
        <h2 className="text-white font-semibold mb-4">Тарифы</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-5 flex flex-col ${
                plan.highlight
                  ? "border-orange-500/50 bg-orange-500/5"
                  : plan.current
                  ? "border-orange-500/30 bg-orange-500/5"
                  : "border-zinc-800 bg-zinc-900/40"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-orange-500 rounded-full text-xs text-white font-medium whitespace-nowrap">
                  Популярный
                </div>
              )}
              {plan.current && (
                <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-emerald-400" title="Текущий тариф" />
              )}
              <div className="mb-3">
                <h3 className="text-white font-semibold">{plan.name}</h3>
                <p className="text-zinc-500 text-xs mt-0.5">{plan.desc}</p>
              </div>
              <div className="mb-4">
                {plan.price === "По запросу" ? (
                  <span className="text-xl font-semibold text-white">По запросу</span>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-semibold text-white">{plan.price}</span>
                    <span className="text-zinc-500 text-xs">₽/мес</span>
                  </div>
                )}
              </div>
              <ul className="space-y-1.5 flex-1 mb-4">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-zinc-400">
                    <Icon name="Check" className="w-3 h-3 text-orange-400 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  plan.current
                    ? "border border-emerald-500/40 text-emerald-400 bg-emerald-500/10 cursor-default"
                    : plan.highlight
                    ? "bg-orange-500 text-white hover:bg-orange-600"
                    : "border border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                }`}
              >
                {plan.current ? "Текущий тариф" : plan.name === "Enterprise" ? "Связаться" : `Перейти на ${plan.name}`}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* History */}
      <div>
        <h2 className="text-white font-semibold mb-4">История платежей</h2>
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800">
                {["№ счёта", "Дата", "Тариф", "Сумма", "Статус"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs text-zinc-500 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {history.map((item) => (
                <tr key={item.id} className="hover:bg-zinc-800/30 transition-colors">
                  <td className="px-4 py-3 text-zinc-400 text-sm">{item.id}</td>
                  <td className="px-4 py-3 text-zinc-300 text-sm">{item.date}</td>
                  <td className="px-4 py-3 text-zinc-300 text-sm">{item.plan}</td>
                  <td className="px-4 py-3 text-white text-sm font-medium">{item.amount}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">{item.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Topup modal */}
      {showTopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="bg-[#141417] border border-zinc-800 rounded-2xl p-6 w-full max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Пополнить GPT-баланс</h3>
              <button onClick={() => setShowTopup(false)} className="text-zinc-500 hover:text-white"><Icon name="X" className="w-5 h-5" /></button>
            </div>
            <label className="text-zinc-400 text-xs mb-2 block">Сумма (₽)</label>
            <input
              type="number"
              value={topupAmount}
              onChange={(e) => setTopupAmount(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500/60 mb-3"
            />
            <div className="flex flex-wrap gap-2 mb-5">
              {presets.map((p) => (
                <button
                  key={p}
                  onClick={() => setTopupAmount(p)}
                  className={`px-3 py-1.5 rounded-lg text-xs border transition-all ${
                    topupAmount === p ? "border-orange-500 bg-orange-500/10 text-orange-400" : "border-zinc-700 text-zinc-400 hover:border-zinc-600"
                  }`}
                >
                  {p} ₽
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowTopup(false)} className="flex-1 py-2.5 border border-zinc-700 text-zinc-300 text-sm rounded-lg hover:bg-zinc-800">Отмена</button>
              <button onClick={() => setShowTopup(false)} className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg">
                Оплатить через ЮKassa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
