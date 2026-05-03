import { useState } from "react"
import Icon from "@/components/ui/icon"

type Tab = "video" | "text" | "wiki"

const textInstructions = [
  {
    platform: "Telegram",
    icon: "Send",
    color: "border-blue-500/30 bg-blue-500/5",
    iconColor: "text-blue-400",
    steps: [
      "Добавьте бота @RaketaPostBot в канал как администратора",
      "Выдайте право «Публиковать сообщения»",
      "В разделе «Каналы» нажмите «Подключить канал» и укажите @username",
      "После проверки канал появится в кабинете — можно планировать посты",
    ],
    link: "К каналам",
  },
  {
    platform: "MAX",
    icon: "Tv",
    color: "border-orange-500/30 bg-orange-500/5",
    iconColor: "text-orange-400",
    steps: [
      "Зарегистрируйтесь в MAX для бизнеса и пройдите проверку (ИП/юрлицо)",
      "Создайте чат-бота в кабинете MAX и дождитесь модерации",
      "Создайте канал для бизнеса и добавьте бота администратором",
      "Вставьте CHAT_ID и токен бота в форму подключения в РакетаПост",
    ],
    link: "К каналам",
  },
  {
    platform: "ВКонтакте",
    icon: "Globe",
    color: "border-indigo-500/30 bg-indigo-500/5",
    iconColor: "text-indigo-400",
    steps: [
      "Создайте сообщество ВКонтакте (если его ещё нет)",
      "Управление → Работа с API → создайте ключ с правами на стену",
      "Скопируйте ID сообщества (club...) и токен в форму РакетаПост",
    ],
    link: "К каналам",
  },
]

const videos = [
  { title: "Быстрый старт: первые шаги в РакетаПост", duration: "5:24", icon: "Play" },
  { title: "AI Генератор: создаём пост за 10 секунд", duration: "3:48", icon: "Play" },
  { title: "RSS Репостер: полная настройка", duration: "8:12", icon: "Play" },
  { title: "Биржа рекламы: как продавать и покупать", duration: "6:05", icon: "Play" },
  { title: "Аналитика: читаем статистику правильно", duration: "4:30", icon: "Play" },
  { title: "Офис команды: совместная работа", duration: "7:15", icon: "Play" },
]

const wiki = [
  { section: "Основы", items: ["Что такое контент-план", "Как работает AI генератор", "Форматы постов"] },
  { section: "Публикация", items: ["Автопостинг", "Мультипостинг", "RSS репостер"] },
  { section: "Монетизация", items: ["Биржа рекламы", "Тарифы", "Оплата"] },
  { section: "Аналитика", items: ["Метрики охвата", "Вовлечённость (ER)", "CTR и клики"] },
]

export function InstructionsPage() {
  const [tab, setTab] = useState<Tab>("text")

  return (
    <div className="p-4 md:p-6 space-y-5">
      <div>
        <h1 className="text-xl font-semibold text-white">Инструкция</h1>
        <p className="text-zinc-500 text-sm mt-0.5">Видеоуроки, текстовые руководства и энциклопедия</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-zinc-900/60 border border-zinc-800 rounded-xl p-1 w-fit">
        {([["video", "Видеоинструкции"], ["text", "Текстовые инструкции"], ["wiki", "Энциклопедия"]] as [Tab, string][]).map(([t, label]) => (
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

      {/* Video */}
      {tab === "video" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((v) => (
            <div key={v.title} className="bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 rounded-xl overflow-hidden cursor-pointer group transition-colors">
              <div className="aspect-video bg-zinc-800 flex items-center justify-center relative">
                <div className="w-12 h-12 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center group-hover:bg-orange-500/30 transition-colors">
                  <Icon name="Play" className="w-5 h-5 text-orange-400 ml-0.5" />
                </div>
                <span className="absolute bottom-2 right-2 text-xs text-white bg-black/60 px-1.5 py-0.5 rounded">{v.duration}</span>
              </div>
              <div className="p-3">
                <p className="text-zinc-200 text-sm font-medium">{v.title}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Text */}
      {tab === "text" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {textInstructions.map((inst) => (
            <div key={inst.platform} className={`border rounded-xl p-5 ${inst.color}`}>
              <div className="flex items-center gap-2 mb-4">
                <Icon name={inst.icon} className={`w-5 h-5 ${inst.iconColor}`} />
                <h3 className="text-white font-semibold">Подключение {inst.platform}</h3>
              </div>
              <ol className="space-y-2.5 mb-5">
                {inst.steps.map((step, i) => (
                  <li key={i} className="flex gap-2.5">
                    <span className={`w-5 h-5 rounded-full ${inst.iconColor} bg-current/10 text-[10px] flex items-center justify-center shrink-0 mt-0.5 font-bold`}>
                      {i + 1}
                    </span>
                    <span className="text-zinc-400 text-sm leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
              <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors">
                {inst.link}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Wiki */}
      {tab === "wiki" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {wiki.map((section) => (
            <div key={section.section} className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4">
              <h3 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                <Icon name="BookOpen" className="w-4 h-4 text-orange-400" />
                {section.section}
              </h3>
              <ul className="space-y-1.5">
                {section.items.map((item) => (
                  <li key={item}>
                    <button className="text-zinc-400 hover:text-orange-400 text-sm transition-colors text-left flex items-center gap-1.5">
                      <Icon name="ChevronRight" className="w-3 h-3 shrink-0" />
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
