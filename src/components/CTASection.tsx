import { motion } from "framer-motion"
import Icon from "@/components/ui/icon"

const plans = [
  {
    name: "Базовый",
    price: "990",
    desc: "Для старта",
    features: ["1 сетка каналов", "2 канала в сетке", "AI генератор постов", "Авторепостер (1 источник)"],
    cta: "Начать бесплатно",
    highlight: false,
  },
  {
    name: "PRO",
    price: "2 990",
    desc: "Самый популярный",
    features: ["3 сетки каналов", "3 канала в сетке", "AI + картинки", "Авторепостер (10 источников)", "Команда (+1 сотр.)"],
    cta: "Попробовать PRO",
    highlight: true,
  },
  {
    name: "Бизнес",
    price: "4 990",
    desc: "Для агентств",
    features: ["Безлимит сеток", "Безлимит каналов", "AI + видео", "Безлимит источников", "Команда (безлимит)"],
    cta: "Выбрать Бизнес",
    highlight: false,
  },
  {
    name: "Enterprise",
    price: "По запросу",
    desc: "Под ключ",
    features: ["Всё включено", "Индивидуальные условия", "Личный менеджер", "SLA и приоритетная поддержка"],
    cta: "Связаться",
    highlight: false,
  },
]

export function CTASection() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6" style={{ backgroundColor: "#09090B" }}>
      <div className="max-w-6xl mx-auto">
        {/* Pricing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-orange-500" />
            <span className="text-zinc-400 text-sm">Тарифы</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-[48px] font-medium text-white tracking-tight mb-4">
            Начните экономить 48 часов в неделю
          </h2>
          <p className="text-zinc-400 max-w-md mx-auto">
            Выберите план под ваши задачи. Первые 7 дней — бесплатно, без привязки карты.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-24">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl border p-6 flex flex-col ${
                plan.highlight
                  ? "border-orange-500/50 bg-orange-500/5"
                  : "border-zinc-800 bg-zinc-900/30"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-orange-500 rounded-full text-xs text-white font-medium">
                  Популярный
                </div>
              )}
              <div className="mb-4">
                <h3 className="text-white font-semibold text-lg">{plan.name}</h3>
                <p className="text-zinc-500 text-xs mt-0.5">{plan.desc}</p>
              </div>
              <div className="mb-6">
                {plan.price === "По запросу" ? (
                  <span className="text-2xl font-medium text-white">По запросу</span>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-medium text-white">{plan.price}</span>
                    <span className="text-zinc-500 text-sm">₽/мес</span>
                  </div>
                )}
              </div>
              <ul className="space-y-2 flex-1 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-zinc-400">
                    <Icon name="Check" className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  plan.highlight
                    ? "bg-orange-500 text-white hover:bg-orange-600"
                    : "border border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Final CTA */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-zinc-800 pt-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-medium text-white tracking-tight text-center md:text-left">
            Запустите автопостинг сегодня.
          </h2>
          <div className="flex items-center gap-3 flex-shrink-0">
            <button className="px-4 py-2.5 border border-zinc-700 text-white font-medium rounded-lg hover:bg-zinc-800 transition-colors text-sm whitespace-nowrap">
              Связаться с нами
            </button>
            <button className="px-4 py-2.5 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors text-sm whitespace-nowrap">
              Начать бесплатно
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}