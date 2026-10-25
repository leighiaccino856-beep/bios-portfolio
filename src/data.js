export const brand = {
  name: 'LEIGH-BIOS',
  version: 'v4.2.0',
  edition: 'GitHub Edition',
  vendor: 'Leigh Systems, Inc.',
  copyright: 'Copyright (C) 1984–2026, Leigh Systems, Inc.',
}

/** Снимок публичного профиля GitHub на 25.10.2026. */
export const profile = {
  login: 'leighiaccino856-beep',
  url: 'https://github.com/leighiaccino856-beep',
  avatar: `${import.meta.env.BASE_URL}avatar.png`,
  email: 'leighiaccino856@gmail.com',
  joined: '13.07.2026',
  publicRepos: 1,
  followers: 0,
  lastPush: '25.10.2026',
}

export const featuredRepo = {
  name: 'tg-conv',
  url: 'https://github.com/leighiaccino856-beep/tg-conv',
}

/**
 * Всё содержимое сайта живёт здесь.
 * type: 'info' | 'bar' | 'copy' | 'link' | 'denied' | 'save' | 'reboot' | 'defaults'
 */
export const tabs = [
  {
    id: 'main',
    label: 'Main',
    title: 'System Information',
    rows: [
      {
        id: 'name',
        label: 'Имя владельца',
        value: 'leighiaccino856-beep',
        type: 'info',
        help: 'GitHub-логин владельца сборки. В профиле не заполнены имя, био и локация, поэтому прошивка подписана логином — без выдуманных данных.\n\nАккаунт зарегистрирован 13.07.2026.',
      },
      {
        id: 'role',
        label: 'Профессия',
        value: 'Python-разработчик · Telegram-боты',
        type: 'info',
        help: 'Публичный профиль содержит один проект — tg-conv. По его README видно: Python 3.12+, aiogram 3, PyAV (H.264/AAC), asyncio, Docker и long polling.\n\nДругих проектов в профиле нет, поэтому прошивка не придумывает опыт.',
      },
      {
        id: 'bios',
        label: 'BIOS Version',
        value: `${brand.name} ${brand.version}`,
        type: 'info',
        help: 'Версия прошивки этого сайта. GitHub Edition собрана 25.10.2026 под профиль leighiaccino856-beep: POST-экран, Setup, CRT-эффекты и навигация с клавиатуры.',
      },
      {
        id: 'build',
        label: 'Дата сборки',
        value: '25.10.2026',
        type: 'info',
        help: 'Дата сборки. Совпадает с датой последнего push в tg-conv — свежее данных в профиле нет.',
      },
      {
        id: 'repos',
        label: 'Публичные репозитории',
        value: '1 · tg-conv',
        type: 'info',
        help: 'Один публичный репозиторий: tg-conv. 0 форков, 0 звёзд, лицензия MIT, основной язык — Python (53 509 байт, 99.5% кода).',
      },
      {
        id: 'activity',
        label: 'Активность',
        value: 'push 25.10.2026',
        type: 'info',
        help: 'Репозиторий tg-conv создан 24.10.2026, последний push — 25.10.2026. Профиль зарегистрирован 13.07.2026.',
      },
      {
        id: 'about',
        label: 'О системе',
        value: brand.edition,
        type: 'info',
        help: 'Прошивка собрана по публичному профилю GitHub leighiaccino856-beep. В нём нет имени, био и локации — только один репозиторий tg-conv: бот на aiogram 3 + PyAV, который превращает видео в кружок Telegram, не записывая ничего на диск.\n\nВсе данные в этом BIOS взяты из GitHub API 25.10.2026: язык, лицензия, стек, даты. Ничего не додумано.\n\nНавигация: ↑ ↓ — параметры, ← → — разделы, Enter — действие. Контент редактируется в src/data.js.',
      },
    ],
  },
  {
    id: 'advanced',
    label: 'Advanced',
    title: 'Detected Software',
    rows: [
      {
        id: 'python',
        label: 'Python',
        value: 99.5,
        type: 'bar',
        help: 'Основной язык профиля: 53 509 байт кода по статистике GitHub — 99.5% всего кода. Версия 3.12+ нужна из-за PyAV 19.',
      },
      {
        id: 'dockerfile',
        label: 'Dockerfile',
        value: 0.5,
        type: 'bar',
        help: 'Оставшиеся 254 байта — Dockerfile. Образ собирается через docker compose, токен передаётся через env_file и в образ не попадает.',
      },
      {
        id: 'aiogram',
        label: 'aiogram 3.x',
        value: 'Enabled',
        type: 'info',
        help: 'Фреймворк бота: хендлеры, прогресс конвертации, ограничение одновременных задач. long polling с повтором при обрывах связи.',
      },
      {
        id: 'pyav',
        label: 'PyAV · H.264/AAC',
        value: 'Enabled',
        type: 'info',
        help: 'Кодирование без внешнего ffmpeg: libav и libx264 приходят в колесе PyAV. Входной файл читается из BytesIO, результат собирается в памяти.',
      },
      {
        id: 'ram',
        label: 'RAM-only pipeline',
        value: '0 байт на диск',
        type: 'info',
        help: 'Ни исходник, ни промежуточные файлы, ни готовый кружок не пишутся на диск. Входной файл — до 20 МБ в RAM, результат — до 5 МБ (откат до 1 МБ).',
      },
      {
        id: 'media',
        label: 'Медиа-конвейер',
        value: '640×640 · 60 c',
        type: 'info',
        help: 'Центральный кроп до квадрата, scale до 640 px, 30 fps, yuv420p. Поворот из display matrix учитывается, длина обрезается до 60 секунд, битрейт подбирается под лимит.',
      },
      {
        id: 'retry',
        label: 'Сеть и ретраи',
        value: 'retry backoff',
        type: 'info',
        help: 'Бот переживает недоступность Telegram: пишет предупреждение, ждёт и повторяет попытку, увеличивая паузу до минуты. Поддерживаются прокси и прямой IP для api.telegram.org.',
      },
      {
        id: 'license',
        label: 'Лицензия',
        value: 'MIT',
        type: 'info',
        help: 'Репозиторий tg-conv распространяется по лицензии MIT — можно использовать, изменять и распространять с сохранением копирайта.',
      },
    ],
  },
  {
    id: 'boot',
    label: 'Boot',
    title: 'Boot Device Priority',
    rows: [
      {
        id: 'tgconv',
        label: 'TG-CONV',
        value: 'Приоритет 1',
        type: 'info',
        stack: ['Python 3.12+', 'aiogram 3', 'PyAV'],
        url: featuredRepo.url,
        cta: 'Открыть на GitHub ↗',
        help: 'Бот на aiogram 3 + PyAV: принимает видео, GIF, файл или готовый кружок и возвращает видеосообщение 640×640 (H.264/AAC). Вся обработка — в RAM: ни исходник, ни промежуточные файлы не попадают на диск.\n\nОбрезка по центру, лимит 60 секунд, поворот из метаданных, автоподбор битрейта и откат до 1 МБ, если Telegram отказал.',
      },
      {
        id: 'bios-site',
        label: 'BIOS-PORTFOLIO',
        value: 'Приоритет 2',
        type: 'info',
        stack: ['React', 'Vite', 'CSS'],
        help: 'Этот сайт: BIOS Setup вместо обычного лендинга. React + Vite, ноль UI-библиотек, CRT-оверлеи и навигация с клавиатуры.\n\nЛокальная сборка — публичного репозитория пока нет.',
      },
    ],
  },
  {
    id: 'security',
    label: 'Security',
    title: 'Security & Contact',
    rows: [
      {
        id: 'github',
        label: 'GitHub',
        value: 'leighiaccino856-beep',
        type: 'link',
        url: profile.url,
        help: 'Публичный профиль: 1 репозиторий, 0 подписчиков, аккаунт создан 13.07.2026. Enter — открыть в новой вкладке.',
      },
      {
        id: 'email',
        label: 'Email',
        value: profile.email,
        type: 'copy',
        help: 'Почта владельца из локального git-конфига. Enter — скопировать адрес в буфер обмена.',
      },
      {
        id: 'joined',
        label: 'Профиль создан',
        value: profile.joined,
        type: 'info',
        help: 'Дата регистрации аккаунта на GitHub. Имя, био и локация в профиле не заполнены — прошивка ничего не придумывает.',
      },
      {
        id: 'password',
        label: 'Пароль администратора',
        value: '••••••••',
        type: 'denied',
        help: 'Раздел защищён. Изменение пароля администратора запрещено политикой безопасности BIOS.',
        copyValue: 'hunter2',
      },
    ],
  },
  {
    id: 'exit',
    label: 'Exit',
    title: 'Exit Options',
    rows: [
      {
        id: 'save',
        label: 'Save Changes and Exit',
        value: '<Enter>',
        type: 'save',
        help: 'Записать изменения в NVRAM и перезагрузить систему. Все ответы скопированы в энергонезависимую память.',
      },
      {
        id: 'discard',
        label: 'Discard Changes and Exit',
        value: '<Enter>',
        type: 'reboot',
        help: 'Перезагрузить систему без сохранения изменений. Настройки вернутся к предыдущему состоянию.',
      },
      {
        id: 'defaults',
        label: 'Load Setup Defaults',
        value: '<Enter>',
        type: 'defaults',
        help: 'Вернуть заводские настройки. Контент сайта при этом останется на месте — обещаем.',
      },
    ],
  },
]

export const bootLines = [
  { text: 'Copyright (C) 1984–2026, Leigh Systems, Inc.', tone: 'dim' },
  { text: 'LEIGH-BIOS v4.2.0 — GitHub Edition', tone: 'bright' },
  { text: '' },
  { text: 'CPU  : Python 3.12 @ aiogram 3', tone: 'bright' },
  { text: 'MEMORY TEST : {mem}', tone: 'bright' },
  { text: '' },
  { text: 'Detecting IDE drives ...' },
  { text: '  Primary Master   : TG-CONV-HDD', tone: 'ok' },
  { text: '  Primary Slave    : MEDIA-CACHE', tone: 'ok' },
  { text: '  Secondary Master : GITHUB-NET', tone: 'ok' },
  { text: '' },
  { text: 'Keyboard ......... OK', tone: 'ok' },
  { text: 'Mouse ............ OK', tone: 'ok' },
  { text: 'CRT .............. OK', tone: 'ok' },
  { text: 'License .......... MIT', tone: 'ok' },
  { text: '' },
  { text: 'Booting from TG-CONV-HDD ...', tone: 'bright' },
]
