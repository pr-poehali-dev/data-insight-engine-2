import { motion } from "framer-motion"
import { ChevronRight, Check } from "lucide-react"
import Icon from "@/components/ui/icon"

const aiFeatures = [
  { name: "GPT-4o", isAI: true, selected: true, icon: "✦" },
  { name: "Claude 3.5", isAI: true, selected: false, icon: "◈" },
  { name: "Gemini Pro", isAI: true, selected: false, icon: "◇" },
  { name: "Llama 3", isAI: true, selected: false, icon: "◉" },
  { name: "Собственная база", isAI: false, selected: false, icon: "○" },
  { name: "Тон бренда", isAI: false, selected: false, icon: "○" },
]

export function AISection() {
  return (
    <div className="relative z-20 py-40" style={{ backgroundColor: "#09090B" }}>
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: "20%",
          background: "linear-gradient(to bottom, rgba(255,255,255,0.05) 0%, transparent 100%)",
        }}
      />
      <div className="w-full flex justify-center px-6">
        <div className="w-full max-w-5xl">
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-orange-500" />
            <span className="text-zinc-400 text-sm">Искусственный интеллект</span>
            <ChevronRight className="w-4 h-4 text-zinc-500" />
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] text-white max-w-3xl mb-8"
            style={{
              letterSpacing: "-0.0325em",
              fontVariationSettings: '"opsz" 28',
              fontWeight: 538,
              lineHeight: 1.1,
            }}
          >
            Пост за 10 секунд с ChatGPT внутри платформы
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-zinc-400 max-w-md mb-8"
          >
            <span className="text-white font-medium">РакетаПост для AI.</span> Выбирайте любую модель и генерируйте посты, заголовки, идеи — прямо в редакторе без переключения вкладок.
          </motion.p>

          {/* Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="px-5 py-2.5 bg-orange-500/10 text-orange-400 rounded-lg border border-orange-500/30 hover:bg-orange-500/20 transition-colors text-sm flex items-center gap-2 mb-16"
          >
            Попробовать AI-генератор
            <ChevronRight className="w-4 h-4" />
          </motion.button>

          {/* AI model picker mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center mb-24"
          >
            <div
              style={{
                perspective: "900px",
                userSelect: "none",
                WebkitUserSelect: "none",
                width: "100%",
                maxWidth: "720px",
                position: "relative",
              }}
            >
              <div
                style={{
                  transformOrigin: "top",
                  willChange: "transform",
                  transform: "translateY(0%) rotateX(30deg) scale(1.15)",
                  position: "relative",
                }}
              >
                {/* Glass overlay effect */}
                <div
                  style={{
                    border: "1px solid rgba(66, 66, 66, 0.5)",
                    background: "linear-gradient(rgba(255, 255, 255, 0.1) 40%, rgba(8, 9, 10, 0.1) 100%)",
                    borderRadius: "8px",
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    boxShadow:
                      "inset 0 1.503px 5.261px rgba(255, 255, 255, 0.04), inset 0 -0.752px 0.752px rgba(255, 255, 255, 0.1)",
                    pointerEvents: "none",
                    zIndex: 10,
                  }}
                />

                <div
                  style={{
                    background: "linear-gradient(180deg, transparent 0%, #09090B 100%)",
                    height: "80%",
                    position: "absolute",
                    bottom: "-2px",
                    left: "-180px",
                    right: "-180px",
                    pointerEvents: "none",
                    zIndex: 11,
                  }}
                />

                {/* Input field */}
                <div className="bg-zinc-800/50 border border-zinc-700 rounded-t-xl px-5 py-4">
                  <span className="text-zinc-500 italic">Напишите пост о запуске нового продукта...</span>
                </div>

                {/* Dropdown options */}
                <div className="bg-zinc-900/80 border border-t-0 border-zinc-700 rounded-b-xl py-1">
                  {aiFeatures.map((item, index) => (
                    <div
                      key={item.name}
                      style={
                        item.selected
                          ? {
                              transform: "scale(1.04) rotateX(17deg)",
                              background: "linear-gradient(#343434 0%, #2d2d2d 100%)",
                              borderRadius: "6px",
                              height: "48px",
                              position: "relative",
                              boxShadow:
                                "inset 0 -2.75px 4.75px rgba(255, 255, 255, 0.14), inset 0 -0.752px 0.752px rgba(255, 255, 255, 0.1), 0 54px 73px 3px rgba(0, 0, 0, 0.5)",
                              zIndex: 20,
                              marginLeft: "-12px",
                              marginRight: "-12px",
                            }
                          : {
                              opacity: 1 - index * 0.15,
                              height: "42px",
                            }
                      }
                    >
                      <div
                        className="flex items-center justify-between h-full"
                        style={{ paddingLeft: "24px", paddingRight: "24px", gap: "12px" }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-orange-400 text-lg">{item.icon}</span>
                          <span className={item.selected ? "text-white font-medium" : "text-zinc-300"}>
                            {item.name}
                          </span>
                          {item.isAI && (
                            <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded border border-orange-500/20">AI</span>
                          )}
                        </div>
                        {item.selected && <Check className="w-4 h-4 text-orange-400" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom two columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16"
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left column */}
              <div className="border-t border-r border-b border-zinc-800/60 pt-12 pr-12 pb-16">
                <h3 className="text-zinc-200 font-medium text-xl mb-3">Автопилот для контента</h3>
                <p className="text-zinc-500 text-base mb-8">
                  Настройте расписание раз — и платформа будет публиковать посты автоматически.
                  RSS-авторепостер следит за источниками 24/7 и отправляет лучшее в ваши каналы.
                </p>
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 space-y-3">
                  {[
                    { label: "AI генерирует", value: "Пост о новинке", status: "orange" },
                    { label: "Планировщик", value: "Публикация завтра 10:00", status: "blue" },
                    { label: "Мультипостинг", value: "3 канала — готово", status: "green" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <span className="text-zinc-500 text-sm">{item.label}</span>
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${item.status === "orange" ? "bg-orange-400" : item.status === "blue" ? "bg-blue-400" : "bg-emerald-400"}`} />
                        <span className="text-zinc-300 text-sm">{item.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right column */}
              <div className="border-t border-b border-zinc-800/60 pt-12 pb-16 px-[5px]">
                <h3 className="text-zinc-200 font-medium text-xl mb-3">Командная работа</h3>
                <p className="text-zinc-500 text-base mb-8">
                  Добавляйте сотрудников, распределяйте задачи по каналам, согласовывайте посты
                  перед публикацией — всё в одном окне.
                </p>
                <div className="space-y-3">
                  {[
                    { name: "Анна", role: "Контент-менеджер", color: "bg-orange-500" },
                    { name: "Михаил", role: "Редактор", color: "bg-blue-500" },
                    { name: "Ирина", role: "SMM-специалист", color: "bg-purple-500" },
                  ].map((member) => (
                    <div key={member.name} className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${member.color} flex items-center justify-center`}>
                        <span className="text-white text-xs font-medium">{member.name[0]}</span>
                      </div>
                      <div>
                        <div className="text-zinc-200 text-sm font-medium">{member.name}</div>
                        <div className="text-zinc-500 text-xs">{member.role}</div>
                      </div>
                      <div className="ml-auto flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span className="text-zinc-500 text-xs">онлайн</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}