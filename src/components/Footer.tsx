import Icon from "@/components/ui/icon"

export function Footer() {
  const footerLinks = {
    "Возможности": ["AI Генератор", "Контент-план", "Мультипостинг", "Авторепостер (RSS)", "AI Аналитика", "Биржа рекламы", "Командный доступ"],
    "Продукт": ["Тарифы", "Для агентств", "Для блогеров", "Для SMM-специалистов", "История изменений", "API"],
    "Компания": ["О нас", "Блог", "Карьера", "Пресса", "Контакты"],
    "Поддержка": ["Документация", "Статус сервиса", "Сообщество", "Telegram-канал", "Конфиденциальность", "Условия"],
  }

  return (
    <footer className="border-t border-zinc-800 py-16 px-6" style={{ backgroundColor: "#09090B" }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Logo */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Icon name="Rocket" className="w-5 h-5 text-orange-500" />
              <span className="text-white font-semibold">РакетаПост</span>
            </div>
            <p className="text-zinc-500 text-xs leading-relaxed">
              AI-платформа для управления контентом в Telegram, MAX и ВКонтакте.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-medium text-sm mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-zinc-500 hover:text-zinc-300 transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-800/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-zinc-600 text-sm">© 2025 РакетаПост. Все права защищены.</span>
          <div className="flex items-center gap-4">
            <a href="#" className="text-zinc-500 hover:text-zinc-300 transition-colors text-sm">Telegram</a>
            <a href="#" className="text-zinc-500 hover:text-zinc-300 transition-colors text-sm">ВКонтакте</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
