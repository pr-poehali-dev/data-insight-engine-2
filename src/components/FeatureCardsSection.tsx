import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import Icon from "@/components/ui/icon"

const featureCards = [
  {
    title: "AI Генератор постов",
    description: "Пост за 10 секунд по описанию темы",
    icon: "Sparkles",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    illustration: (
      <div className="relative w-full h-full flex items-start justify-center overflow-hidden p-6">
        <div className="w-full space-y-2">
          <div className="h-3 bg-orange-500/20 rounded-full w-full" />
          <div className="h-3 bg-orange-500/15 rounded-full w-4/5" />
          <div className="h-3 bg-orange-500/10 rounded-full w-3/5" />
          <div className="mt-4 h-8 bg-orange-500/30 rounded-lg w-2/5 flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-orange-400 animate-pulse" />
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Контент-план",
    description: "Календарь с перетаскиванием и автопостингом",
    icon: "CalendarDays",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    illustration: (
      <div className="relative w-full h-full flex items-start justify-center overflow-hidden p-6">
        <div className="w-full">
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 21 }).map((_, i) => (
              <div
                key={i}
                className={`h-6 rounded ${i === 3 || i === 8 || i === 14 ? "bg-orange-500/50" : i === 10 || i === 16 ? "bg-blue-500/30" : "bg-zinc-800/50"}`}
              />
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Мультипостинг",
    description: "Один пост → Telegram, MAX, ВКонтакте",
    icon: "Send",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    illustration: (
      <div className="relative w-full h-full flex items-start justify-center overflow-hidden p-6">
        <div className="w-full space-y-2">
          {["Telegram", "ВКонтакте", "MAX"].map((name, i) => (
            <div key={name} className="flex items-center gap-2 bg-zinc-800/40 rounded-lg px-3 py-2">
              <div className={`w-2 h-2 rounded-full ${i === 0 ? "bg-blue-400" : i === 1 ? "bg-blue-600" : "bg-orange-400"}`} />
              <span className="text-zinc-400 text-xs">{name}</span>
              <div className="ml-auto w-3 h-3 rounded-full bg-emerald-500/60 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "Авторепостер (RSS)",
    description: "Контент из любых источников сам идёт в канал",
    icon: "Rss",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    illustration: (
      <div className="relative w-full h-full flex items-start justify-center overflow-hidden p-6">
        <div className="w-full space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-yellow-500/20 flex items-center justify-center shrink-0">
                <div className="w-2 h-2 rounded-full bg-yellow-400" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="h-2 bg-zinc-700/60 rounded w-full" />
                <div className="h-2 bg-zinc-700/40 rounded w-3/4" />
              </div>
              <div className="w-4 h-4 rounded-full border border-zinc-700 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "AI Аналитика",
    description: "Охват, вовлечённость, CTR — в одном дашборде",
    icon: "BarChart3",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    illustration: (
      <div className="relative w-full h-full flex items-end justify-center overflow-hidden p-6">
        <div className="w-full flex items-end gap-1.5 h-24">
          {[40, 65, 45, 80, 60, 90, 70, 85, 55, 95, 75, 88].map((h, i) => (
            <div
              key={i}
              className={`flex-1 rounded-t ${i === 10 ? "bg-purple-400" : i === 9 ? "bg-purple-500/70" : "bg-purple-500/30"}`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "Биржа рекламы",
    description: "Продажа и покупка рекламы без комиссии",
    icon: "TrendingUp",
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    illustration: (
      <div className="relative w-full h-full flex items-start justify-center overflow-hidden p-6">
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between bg-zinc-800/40 rounded-lg px-3 py-2">
            <span className="text-zinc-400 text-xs">Покупка рекламы</span>
            <span className="text-emerald-400 text-xs font-medium">−0% комиссии</span>
          </div>
          <div className="flex items-center justify-between bg-zinc-800/40 rounded-lg px-3 py-2">
            <span className="text-zinc-400 text-xs">Охват канала</span>
            <span className="text-pink-400 text-xs font-medium">48 200</span>
          </div>
          <div className="flex items-center justify-between bg-zinc-800/40 rounded-lg px-3 py-2">
            <span className="text-zinc-400 text-xs">Заявок сегодня</span>
            <span className="text-white text-xs font-medium">12</span>
          </div>
        </div>
      </div>
    ),
  },
]

export function FeatureCardsSection() {
  return (
    <div className="relative z-20 py-16 md:py-40" style={{ backgroundColor: "#09090B" }}>
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: "20%",
          background: "linear-gradient(to bottom, rgba(255,255,255,0.05) 0%, transparent 100%)",
        }}
      />
      <div className="w-full flex justify-center px-4 sm:px-6">
        <div className="w-full max-w-5xl">
          {/* Header row */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] text-white max-w-md"
              style={{
                letterSpacing: "-0.0325em",
                fontVariationSettings: '"opsz" 28',
                fontWeight: 538,
                lineHeight: 1.1,
              }}
            >
              Всё для управления контентом
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-md"
            >
              <p className="text-zinc-400 leading-relaxed">
                РакетаПост объединяет всё необходимое для роста канала: от генерации постов до анализа
                эффективности.{" "}
                <a href="#" className="text-orange-400 inline-flex items-center gap-1 hover:underline">
                  Попробовать бесплатно <ChevronRight className="w-4 h-4" />
                </a>
              </p>
            </motion.div>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {featureCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer group overflow-hidden relative flex flex-col justify-end"
                style={{
                  aspectRatio: "336 / 360",
                  borderRadius: "30px",
                  minHeight: "280px",
                  isolation: "isolate",
                }}
              >
                <div
                  className="absolute top-0 left-0 w-full"
                  style={{
                    height: "240px",
                    maskImage: "linear-gradient(#000 70%, transparent 90%)",
                    WebkitMaskImage: "linear-gradient(#000 70%, transparent 90%)",
                  }}
                >
                  {card.illustration}
                </div>
                <div
                  className="relative z-10 flex items-center justify-between w-full"
                  style={{ padding: "0 24px 40px", gap: "16px" }}
                >
                  <div>
                    <h3 className="text-white font-medium text-lg leading-tight">{card.title}</h3>
                    <p className="text-zinc-500 text-xs mt-1">{card.description}</p>
                  </div>
                  <div className={`w-8 h-8 rounded-full ${card.bg} border border-zinc-700 flex items-center justify-center flex-shrink-0`}>
                    <Icon name={card.icon} className={`w-4 h-4 ${card.color}`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}