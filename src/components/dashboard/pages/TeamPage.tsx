import { useState } from "react"
import Icon from "@/components/ui/icon"

type Tab = "notes" | "tasks" | "clients"

const mockNotes = [
  { id: 1, title: "Идеи для контент-плана на май", text: "Серия постов про AI, кейсы клиентов, сравнение с конкурентами", date: "3 мая" },
  { id: 2, title: "Брифинг с клиентом", text: "Обсудили стратегию на Q2, акцент на видео-контент", date: "1 мая" },
]

const mockTasks = [
  { id: 1, title: "Написать 5 постов для канала", desc: "Тема: AI в маркетинге", assignee: "Иван", deadline: "10 мая", done: false },
  { id: 2, title: "Настроить RSS для клиента", desc: "Подключить 3 источника по финансовой тематике", assignee: "Мария", deadline: "8 мая", done: false },
  { id: 3, title: "Анализ статистики за апрель", desc: "", assignee: "Иван", deadline: "5 мая", done: true },
]

const mockClients = [
  { id: 1, name: "Алексей Смирнов", channel: "ИнвестПро", url: "t.me/investpro", contact: "@alex_smirnov", note: "VIP-клиент, 3 канала" },
  { id: 2, name: "Марина Ковалёва", channel: "Маркетинг Live", url: "t.me/mktg_live", contact: "+7 999 123-45-67", note: "Ведём с января 2025" },
]

export function TeamPage() {
  const [tab, setTab] = useState<Tab>("notes")
  const [notes, setNotes] = useState(mockNotes)
  const [tasks, setTasks] = useState(mockTasks)
  const [clients, setClients] = useState(mockClients)
  const [showNoteModal, setShowNoteModal] = useState(false)
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [showClientModal, setShowClientModal] = useState(false)
  const [noteForm, setNoteForm] = useState({ title: "", text: "" })
  const [taskForm, setTaskForm] = useState({ title: "", desc: "", assignee: "", deadline: "" })
  const [clientForm, setClientForm] = useState({ name: "", channel: "", url: "", contact: "", note: "" })

  const addNote = () => {
    if (noteForm.title) {
      setNotes((p) => [...p, { id: Date.now(), ...noteForm, date: "Сегодня" }])
      setNoteForm({ title: "", text: "" })
      setShowNoteModal(false)
    }
  }

  const addTask = () => {
    if (taskForm.title) {
      setTasks((p) => [...p, { id: Date.now(), ...taskForm, done: false }])
      setTaskForm({ title: "", desc: "", assignee: "", deadline: "" })
      setShowTaskModal(false)
    }
  }

  const addClient = () => {
    if (clientForm.name) {
      setClients((p) => [...p, { id: Date.now(), ...clientForm }])
      setClientForm({ name: "", channel: "", url: "", contact: "", note: "" })
      setShowClientModal(false)
    }
  }

  const tabConfig = { notes: "📝 Записки", tasks: "✅ Задачи", clients: "👥 Клиенты" }

  return (
    <div className="p-4 md:p-6 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-white">Офис команды</h1>
          <p className="text-zinc-500 text-sm mt-0.5">Совместная работа, задачи и клиенты</p>
        </div>
        <button
          onClick={() => {
            if (tab === "notes") setShowNoteModal(true)
            if (tab === "tasks") setShowTaskModal(true)
            if (tab === "clients") setShowClientModal(true)
          }}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors whitespace-nowrap"
        >
          <Icon name="Plus" className="w-4 h-4" />
          Добавить
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-zinc-900/60 border border-zinc-800 rounded-xl p-1 w-fit">
        {(Object.entries(tabConfig) as [Tab, string][]).map(([t, label]) => (
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

      {/* Notes */}
      {tab === "notes" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {notes.map((note) => (
            <div key={note.id} className="bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 rounded-xl p-4 group transition-colors">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-white font-medium text-sm">{note.title}</h3>
                <button
                  onClick={() => setNotes((p) => p.filter((n) => n.id !== note.id))}
                  className="text-zinc-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Icon name="Trash2" className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed mb-3">{note.text}</p>
              <span className="text-zinc-600 text-xs flex items-center gap-1">
                <Icon name="Clock" className="w-3 h-3" />
                {note.date}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Tasks */}
      {tab === "tasks" && (
        <div className="space-y-2">
          {tasks.map((task) => (
            <div key={task.id} className={`flex items-center gap-4 bg-zinc-900/60 border rounded-xl px-4 py-3.5 transition-colors ${task.done ? "border-zinc-800/50 opacity-50" : "border-zinc-800 hover:border-zinc-700"}`}>
              <button
                onClick={() => setTasks((p) => p.map((t) => t.id === task.id ? { ...t, done: !t.done } : t))}
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${task.done ? "bg-emerald-500 border-emerald-500" : "border-zinc-600"}`}
              >
                {task.done && <Icon name="Check" className="w-3 h-3 text-white" />}
              </button>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${task.done ? "line-through text-zinc-500" : "text-white"}`}>{task.title}</p>
                {task.desc && <p className="text-zinc-500 text-xs mt-0.5">{task.desc}</p>}
              </div>
              <div className="hidden sm:flex items-center gap-3 shrink-0">
                <span className="text-xs text-zinc-500 flex items-center gap-1">
                  <Icon name="User" className="w-3 h-3" />
                  {task.assignee}
                </span>
                <span className="text-xs text-zinc-500 flex items-center gap-1">
                  <Icon name="Calendar" className="w-3 h-3" />
                  {task.deadline}
                </span>
              </div>
              <button
                onClick={() => setTasks((p) => p.filter((t) => t.id !== task.id))}
                className="text-zinc-600 hover:text-red-400 transition-colors"
              >
                <Icon name="Trash2" className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Clients */}
      {tab === "clients" && (
        <div className="space-y-2">
          {clients.map((client) => (
            <div key={client.id} className="flex items-center gap-4 bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 rounded-xl px-4 py-3.5 group transition-colors">
              <div className="w-9 h-9 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0">
                <span className="text-orange-400 font-semibold text-sm">{client.name[0]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium">{client.name}</p>
                <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                  <span className="text-zinc-500 text-xs">{client.channel}</span>
                  <span className="text-zinc-600 text-xs">{client.contact}</span>
                </div>
                {client.note && <p className="text-zinc-600 text-xs mt-0.5">{client.note}</p>}
              </div>
              <button
                onClick={() => setClients((p) => p.filter((c) => c.id !== client.id))}
                className="text-zinc-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
              >
                <Icon name="Trash2" className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Note modal */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="bg-[#141417] border border-zinc-800 rounded-2xl p-6 w-full max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Новая записка</h3>
              <button onClick={() => setShowNoteModal(false)} className="text-zinc-500 hover:text-white"><Icon name="X" className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              <input value={noteForm.title} onChange={(e) => setNoteForm((f) => ({ ...f, title: e.target.value }))} placeholder="Заголовок" className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/60" />
              <textarea value={noteForm.text} onChange={(e) => setNoteForm((f) => ({ ...f, text: e.target.value }))} placeholder="Текст записки..." rows={4} className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/60 resize-none" />
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={() => setShowNoteModal(false)} className="flex-1 py-2.5 border border-zinc-700 text-zinc-300 text-sm rounded-lg hover:bg-zinc-800">Отмена</button>
              <button onClick={addNote} className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg">Сохранить</button>
            </div>
          </div>
        </div>
      )}

      {/* Task modal */}
      {showTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="bg-[#141417] border border-zinc-800 rounded-2xl p-6 w-full max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Новая задача</h3>
              <button onClick={() => setShowTaskModal(false)} className="text-zinc-500 hover:text-white"><Icon name="X" className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              <input value={taskForm.title} onChange={(e) => setTaskForm((f) => ({ ...f, title: e.target.value }))} placeholder="Название задачи" className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/60" />
              <input value={taskForm.desc} onChange={(e) => setTaskForm((f) => ({ ...f, desc: e.target.value }))} placeholder="Описание (необязательно)" className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/60" />
              <input value={taskForm.assignee} onChange={(e) => setTaskForm((f) => ({ ...f, assignee: e.target.value }))} placeholder="Исполнитель" className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/60" />
              <input type="date" value={taskForm.deadline} onChange={(e) => setTaskForm((f) => ({ ...f, deadline: e.target.value }))} className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500/60" />
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={() => setShowTaskModal(false)} className="flex-1 py-2.5 border border-zinc-700 text-zinc-300 text-sm rounded-lg hover:bg-zinc-800">Отмена</button>
              <button onClick={addTask} className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg">Создать</button>
            </div>
          </div>
        </div>
      )}

      {/* Client modal */}
      {showClientModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="bg-[#141417] border border-zinc-800 rounded-2xl p-6 w-full max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Новый клиент</h3>
              <button onClick={() => setShowClientModal(false)} className="text-zinc-500 hover:text-white"><Icon name="X" className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              {[["name", "ФИО"], ["channel", "Название канала"], ["url", "Ссылка на канал"], ["contact", "Телефон или @telegram"], ["note", "Заметки"]].map(([key, label]) => (
                <input key={key} value={clientForm[key as keyof typeof clientForm]} onChange={(e) => setClientForm((f) => ({ ...f, [key]: e.target.value }))} placeholder={label} className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/60" />
              ))}
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={() => setShowClientModal(false)} className="flex-1 py-2.5 border border-zinc-700 text-zinc-300 text-sm rounded-lg hover:bg-zinc-800">Отмена</button>
              <button onClick={addClient} className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg">Добавить</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
