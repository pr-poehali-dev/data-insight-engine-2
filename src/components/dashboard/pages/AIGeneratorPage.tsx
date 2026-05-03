import { useState } from "react"
import Icon from "@/components/ui/icon"

type Step = 1 | 2 | 3

const templates = ["Финансы и инвестиции", "Маркетинг и SMM", "Технологии и AI", "Бизнес и стартапы"]

const mockHeadlines = [
  "Что происходит в нише и почему за этим стоит следить",
  "Разбор темы канала простыми словами без лишней теории",
  "Практические советы, которые помогут быстро получить результат",
]

const mockPostText = `🚀 Рынок ломается не в отчётах — сначала это слышно в вопросах клиентов

Самая дорогая ошибка — принять тишину за стабильность. Обычно всё начинает меняться задолго до громких новостей и просадки в цифрах.

💡 Где сдвиг виден раньше всего

Не в красивых итоговых отчётах. А в том, как люди формулируют запрос, что их начинает смущать и как именно они сравнивают варианты.

Вопросы становятся точнее, возражения — жёстче, а решение о покупке уже не принимается «на автомате».

📋 Что стоит отслеживать уже сейчас

— Повторяющиеся возражения: какие сомнения стали звучать чаще
— На чём люди начали зависать перед покупкой`

export function AIGeneratorPage() {
  const [step, setStep] = useState<Step>(1)
  const [channelDesc, setChannelDesc] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [savedTemplates, setSavedTemplates] = useState<string[]>(templates)
  const [selectedHeadline, setSelectedHeadline] = useState<string | null>(null)
  const [customPost, setCustomPost] = useState("")
  const [postText, setPostText] = useState(mockPostText)
  const [channels, setChannels] = useState<string[]>(["tg"])
  const [scheduleType, setScheduleType] = useState<"now" | "later">("now")
  const [scheduleDate, setScheduleDate] = useState("")
  const [showSaveTemplate, setShowSaveTemplate] = useState(false)
  const [templateName, setTemplateName] = useState("")
  const [loading, setLoading] = useState(false)
  const [loadingMsg, setLoadingMsg] = useState("")
  const [headlinesCount, setHeadlinesCount] = useState(3)

  const toggleChannel = (ch: string) =>
    setChannels((prev) => (prev.includes(ch) ? prev.filter((c) => c !== ch) : [...prev, ch]))

  const goToStep2 = () => {
    setLoading(true)
    setLoadingMsg("Генерация заголовков...")
    setTimeout(() => { setLoading(false); setStep(2) }, 2000)
  }

  const goToStep3 = () => {
    setLoading(true)
    setLoadingMsg("Генерация поста...")
    setTimeout(() => { setLoading(false); setStep(3) }, 2500)
  }

  const saveTemplate = () => {
    if (templateName.trim()) {
      setSavedTemplates((prev) => [...prev, templateName.trim()])
    }
    setShowSaveTemplate(false)
    setTemplateName("")
  }

  const channelOptions = [
    { id: "tg", label: "Telegram", color: "border-blue-500 bg-blue-500/10 text-blue-400" },
    { id: "vk", label: "ВКонтакте", color: "border-indigo-500 bg-indigo-500/10 text-indigo-400" },
    { id: "max", label: "MAX", color: "border-orange-500 bg-orange-500/10 text-orange-400" },
  ]

  return (
    <div className="p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
            <Icon name="Sparkles" className="w-4 h-4 text-orange-400" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">AI Генератор постов</h1>
            <p className="text-zinc-500 text-sm">Создайте пост за 3 шага</p>
          </div>
        </div>

        {/* Stepper */}
        <div className="flex items-center mb-6">
          {[1, 2, 3].map((s, i) => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all ${
                    step > s
                      ? "bg-emerald-500 border-emerald-500 text-white"
                      : step === s
                      ? "bg-orange-500 border-orange-500 text-white"
                      : "border-zinc-700 text-zinc-600"
                  }`}
                >
                  {step > s ? <Icon name="Check" className="w-4 h-4" /> : s}
                </div>
                <span className={`text-[10px] mt-1 whitespace-nowrap ${step === s ? "text-orange-400" : "text-zinc-600"}`}>
                  {["О канале", "Заголовки", "Пост"][i]}
                </span>
              </div>
              {i < 2 && (
                <div className={`flex-1 h-px mx-2 mb-4 ${step > s ? "bg-emerald-500/50" : "bg-zinc-800"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 space-y-5">

          {/* Step 1 */}
          {step === 1 && (
            <>
              <div>
                <label className="text-zinc-300 text-sm font-medium mb-3 flex items-center gap-2">
                  <Icon name="Info" className="w-4 h-4 text-zinc-500" />
                  Опишите ваш канал
                </label>
                <textarea
                  value={channelDesc}
                  onChange={(e) => setChannelDesc(e.target.value)}
                  placeholder="Тематика, аудитория, стиль подачи материала..."
                  rows={4}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/60 resize-none"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-zinc-400 text-xs">Шаблоны</span>
                  <button
                    onClick={() => setShowSaveTemplate(true)}
                    className="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1"
                  >
                    <Icon name="Save" className="w-3 h-3" />
                    Сохранить шаблон
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {savedTemplates.map((t) => (
                    <button
                      key={t}
                      onClick={() => { setSelectedTemplate(t); setChannelDesc(t) }}
                      className={`px-3 py-1.5 rounded-lg text-xs border transition-all ${
                        selectedTemplate === t
                          ? "border-orange-500 bg-orange-500/10 text-orange-400"
                          : "border-zinc-700 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={goToStep2}
                disabled={!channelDesc.trim()}
                className="w-full py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Icon name="Zap" className="w-4 h-4" />
                Сгенерировать заголовки
              </button>
            </>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <>
              <div>
                <label className="text-zinc-300 text-sm font-medium mb-3 flex items-center gap-2">
                  <Icon name="List" className="w-4 h-4 text-orange-400" />
                  Выберите заголовок
                </label>
                <div className="space-y-2">
                  {mockHeadlines.slice(0, headlinesCount).map((h) => (
                    <button
                      key={h}
                      onClick={() => setSelectedHeadline(h)}
                      className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                        selectedHeadline === h
                          ? "border-orange-500 bg-orange-500/10 text-orange-300"
                          : "border-zinc-700 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-800/50"
                      }`}
                    >
                      {h}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setHeadlinesCount((n) => Math.min(n + 3, 20))}
                  className="mt-3 w-full py-2.5 border border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 text-sm rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Icon name="Plus" className="w-4 h-4" />
                  Предложить ещё заголовки
                </button>
                <div className="text-zinc-600 text-xs mt-2">{headlinesCount} / 20</div>
              </div>
              <div>
                <label className="text-zinc-400 text-xs mb-2 flex items-center gap-2">
                  <Icon name="Edit" className="w-3.5 h-3.5 text-orange-400" />
                  Или напишите свой пост
                </label>
                <textarea
                  value={customPost}
                  onChange={(e) => setCustomPost(e.target.value)}
                  placeholder="Напишите заголовок и что нужно раскрыть..."
                  rows={3}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/60 resize-none"
                />
              </div>
              <button
                onClick={goToStep3}
                disabled={!selectedHeadline && !customPost.trim()}
                className="w-full py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Icon name="Rocket" className="w-4 h-4" />
                Далее → генерировать пост
              </button>
            </>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <>
              {/* Formatting toolbar */}
              <div>
                <label className="text-zinc-300 text-sm font-medium mb-3 flex items-center gap-2">
                  <Icon name="FileText" className="w-4 h-4 text-orange-400" />
                  Оформление поста
                </label>
                <div className="flex items-center gap-1 mb-2 p-1 bg-zinc-900 border border-zinc-800 rounded-lg w-fit">
                  {["Bold", "Italic", "Underline", "List", "Link"].map((fmt) => (
                    <button
                      key={fmt}
                      className="px-2 py-1 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded text-xs font-medium transition-colors"
                    >
                      {fmt === "Bold" ? "B" : fmt === "Italic" ? "I" : fmt === "Underline" ? "U" : fmt === "List" ? "• Список" : "🔗 Ссылка"}
                    </button>
                  ))}
                </div>
                <textarea
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  rows={12}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500/60 resize-none"
                />
              </div>

              {/* Media */}
              <div>
                <label className="text-zinc-300 text-sm font-medium mb-2 flex items-center gap-2">
                  <Icon name="Image" className="w-4 h-4 text-orange-400" />
                  Медиа
                </label>
                <button className="flex items-center gap-2 px-4 py-2.5 border border-zinc-700 border-dashed text-zinc-400 hover:text-zinc-200 hover:border-zinc-500 text-sm rounded-xl transition-colors">
                  <Icon name="Paperclip" className="w-4 h-4" />
                  Загрузить файлы
                </button>
              </div>

              {/* Channels */}
              <div>
                <label className="text-zinc-300 text-sm font-medium mb-2 flex items-center gap-2">
                  <Icon name="Send" className="w-4 h-4 text-orange-400" />
                  Опубликовать в каналы
                </label>
                <div className="flex flex-wrap gap-2">
                  {channelOptions.map((ch) => (
                    <button
                      key={ch.id}
                      onClick={() => toggleChannel(ch.id)}
                      className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                        channels.includes(ch.id) ? ch.color : "border-zinc-700 text-zinc-500"
                      }`}
                    >
                      {ch.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Schedule */}
              <div>
                <label className="text-zinc-300 text-sm font-medium mb-2 flex items-center gap-2">
                  <Icon name="Clock" className="w-4 h-4 text-orange-400" />
                  Дата публикации
                </label>
                <div className="flex gap-2 mb-3">
                  <button
                    onClick={() => setScheduleType("now")}
                    className={`px-3 py-2 rounded-lg text-sm border transition-all ${
                      scheduleType === "now"
                        ? "border-orange-500 bg-orange-500/10 text-orange-400"
                        : "border-zinc-700 text-zinc-400"
                    }`}
                  >
                    Сейчас
                  </button>
                  <button
                    onClick={() => setScheduleType("later")}
                    className={`px-3 py-2 rounded-lg text-sm border transition-all ${
                      scheduleType === "later"
                        ? "border-orange-500 bg-orange-500/10 text-orange-400"
                        : "border-zinc-700 text-zinc-400"
                    }`}
                  >
                    Запланировать
                  </button>
                </div>
                {scheduleType === "later" && (
                  <input
                    type="datetime-local"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    className="bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500/60"
                  />
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-1">
                <button
                  onClick={() => { setLoading(true); setLoadingMsg("Генерация поста..."); setTimeout(() => setLoading(false), 2000) }}
                  className="flex items-center gap-2 px-4 py-3 border border-zinc-700 text-zinc-300 hover:bg-zinc-800 text-sm font-medium rounded-xl transition-colors whitespace-nowrap"
                >
                  <Icon name="RefreshCw" className="w-4 h-4" />
                  Сгенерировать заново
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium text-sm rounded-xl transition-colors">
                  <Icon name="Save" className="w-4 h-4" />
                  Сохранить в черновик
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Loading overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-[#141417] border border-zinc-800 rounded-2xl p-8 text-center max-w-xs mx-4">
            <div className="w-12 h-12 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-orange-400 font-medium">{loadingMsg}</p>
            <p className="text-zinc-500 text-sm mt-1">Не закрывайте это окно, идёт генерация</p>
          </div>
        </div>
      )}

      {/* Save template modal */}
      {showSaveTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="bg-[#141417] border border-zinc-800 rounded-2xl p-6 w-full max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Сохранить шаблон</h3>
              <button onClick={() => setShowSaveTemplate(false)} className="text-zinc-500 hover:text-white">
                <Icon name="X" className="w-5 h-5" />
              </button>
            </div>
            <input
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              placeholder="Название шаблона..."
              className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/60 mb-4"
            />
            <div className="flex gap-3">
              <button onClick={() => setShowSaveTemplate(false)} className="flex-1 py-2.5 border border-zinc-700 text-zinc-300 text-sm rounded-lg hover:bg-zinc-800">
                Отмена
              </button>
              <button onClick={saveTemplate} className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg">
                Сохранить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
