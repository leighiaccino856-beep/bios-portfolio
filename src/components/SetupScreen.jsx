import { useCallback, useEffect, useRef, useState } from 'react'
import { brand, profile, tabs } from '../data'

const pad = (value) => String(value).padStart(2, '0')

function formatClock(date) {
  return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()}  ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}

function RowValue({ row }) {
  if (row.type === 'bar') {
    return (
      <span className="row__value row__value--bar">
        <span className="row__bar" aria-hidden="true">
          <span className="row__bar-fill" style={{ width: `${row.value}%` }} />
        </span>
        <span className="row__pct">{row.value}%</span>
      </span>
    )
  }

  const isEnterAction = ['save', 'reboot', 'defaults'].includes(row.type)
  const isContact = row.type === 'copy' || row.type === 'link'

  return (
    <span
      className={`row__value${isEnterAction ? ' row__value--action' : ''}${
        isContact ? ' row__value--link' : ''
      }`}
    >
      {isEnterAction ? '<Enter>' : row.value}
    </span>
  )
}

function HelpPanel({ tab, row }) {
  if (!row) return null

  const hints = {
    copy: 'Enter — скопировать значение в буфер обмена.',
    link: 'Enter — открыть ссылку в новой вкладке.',
    denied: 'Доступ только для администратора системы.',
    save: 'Enter — сохранить изменения и перезагрузить систему.',
    reboot: 'Enter — перезагрузить без сохранения изменений.',
    defaults: 'Enter — вернуть заводские настройки.',
  }

  return (
    <aside className="help frame" aria-live="polite">
      <div className="help__head">
        <span className="help__title">Item Specific Help</span>
        <span className="help__path">
          {tab.label} / {row.id}
        </span>
      </div>

      <h2 className="help__name">{row.label}</h2>
      <p className="help__text">{row.help ?? 'Описание параметра отсутствует в этой версии BIOS.'}</p>

      {row.stack && row.stack.length > 0 && (
        <ul className="chips" aria-label="Технологии">
          {row.stack.map((item) => (
            <li className="chip" key={item}>
              {item}
            </li>
          ))}
        </ul>
      )}

      {row.url && (
        <a className="help__cta" href={row.url} target="_blank" rel="noreferrer">
          {row.cta ?? 'Открыть ↗'}
        </a>
      )}

      {hints[row.type] && <p className="help__hint">{hints[row.type]}</p>}
    </aside>
  )
}

export default function SetupScreen({ onReboot }) {
  const [tabIndex, setTabIndex] = useState(0)
  const [rowIndex, setRowIndex] = useState(0)
  const [status, setStatus] = useState('')
  const [clock, setClock] = useState(() => new Date())
  const rebootTimer = useRef(null)

  const tab = tabs[tabIndex]
  const rows = tab.rows
  const activeRow = rows[Math.min(rowIndex, rows.length - 1)]

  useEffect(() => {
    const timer = setInterval(() => setClock(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => () => clearTimeout(rebootTimer.current), [])

  const selectTab = useCallback((index) => {
    setTabIndex(index)
    setRowIndex(0)
    setStatus('')
  }, [])

  const moveTab = useCallback(
    (delta) => {
      setTabIndex((current) => {
        const next = (current + delta + tabs.length) % tabs.length
        return next
      })
      setRowIndex(0)
      setStatus('')
    },
    [],
  )

  const moveRow = useCallback((delta) => {
    setStatus('')
    setRowIndex((current) => {
      const total = rows.length
      return (current + delta + total) % total
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows.length])

  const copyValue = async (row) => {
    const text = String(row.copyValue ?? row.value)
    try {
      await navigator.clipboard.writeText(text)
      setStatus(`${row.label}: ${text} — скопировано в буфер обмена`)
    } catch {
      setStatus(`${row.label}: ${text}`)
    }
  }

  const activate = useCallback(
    (row) => {
      if (!row) return

      switch (row.type) {
        case 'copy':
          copyValue(row)
          break
        case 'link':
          window.open(row.url, '_blank', 'noopener,noreferrer')
          setStatus(`${row.label}: открываю ${row.url}`)
          break
        case 'denied':
          setStatus('ACCESS DENIED — неверный пароль администратора')
          break
        case 'save':
          setStatus('Изменения записаны в NVRAM. Перезагрузка ...')
          rebootTimer.current = setTimeout(onReboot, 900)
          break
        case 'reboot':
          onReboot()
          break
        case 'defaults':
          setStatus('Загружены настройки по умолчанию. Изменения не сохранены.')
          break
        default:
          setStatus(`${row.label}: ${row.value}`)
      }
    },
    [onReboot],
  )

  useEffect(() => {
    const handleKey = (event) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault()
          moveRow(1)
          break
        case 'ArrowUp':
          event.preventDefault()
          moveRow(-1)
          break
        case 'ArrowRight':
          event.preventDefault()
          moveTab(1)
          break
        case 'ArrowLeft':
          event.preventDefault()
          moveTab(-1)
          break
        case 'Enter':
          event.preventDefault()
          activate(activeRow)
          break
        case 'Escape':
          setStatus('')
          break
        case 'F10':
          event.preventDefault()
          selectTab(tabs.findIndex((item) => item.id === 'exit'))
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [activate, activeRow, moveRow, moveTab, selectTab])

  const statusTone = /denied|неверн/i.test(status) ? ' warn' : ''

  return (
    <div className="setup">
      <header className="setup__head">
        <div className="setup__head-row">
          <h1 className="setup__title">BIOS Setup Utility</h1>
          <span className="setup__id">
            <img
              className="setup__avatar"
              src={profile.avatar}
              alt={`Аватар ${profile.login}`}
              width="34"
              height="34"
            />
            <span className="setup__brand">
              {brand.name} {brand.version}
            </span>
          </span>
        </div>
        <div className="setup__rule" />
        <nav className="tabs" role="tablist" aria-label="Разделы BIOS">
          {tabs.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={index === tabIndex}
              className={`tab${index === tabIndex ? ' is-active' : ''}`}
              onClick={(event) => {
                event.currentTarget.blur()
                selectTab(index)
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="setup__meta">
          <span>{tab.title}</span>
          <span>{formatClock(clock)}</span>
        </div>
      </header>

      <div className="setup__body">
        <section
          className="rows frame"
          role="listbox"
          aria-label={tab.title}
          aria-activedescendant={`row-${tab.id}-${activeRow.id}`}
        >
          <div className="rows__head">
            <span>{tab.label}</span>
            <span>
              {pad(tabIndex + 1)} / {pad(tabs.length)}
            </span>
          </div>

          {rows.map((row, index) => (
            <div
              key={row.id}
              id={`row-${tab.id}-${row.id}`}
              role="option"
              aria-selected={index === rowIndex}
              className={`row${index === rowIndex ? ' is-selected' : ''}`}
              onMouseEnter={() => setRowIndex(index)}
              onClick={() => {
                setRowIndex(index)
                activate(row)
              }}
            >
              <span className="row__label">{row.label}</span>
              <span className="row__dots" aria-hidden="true" />
              <RowValue row={row} />
            </div>
          ))}
        </section>

        <HelpPanel tab={tab} row={activeRow} />
      </div>

      <footer className="setup__foot">
        <div className="keys" aria-hidden="true">
          <span className="key">
            <span className="kbd">↑↓</span> выбор
          </span>
          <span className="key">
            <span className="kbd">←→</span> раздел
          </span>
          <span className="key">
            <span className="kbd">Enter</span> изменить
          </span>
          <span className="key">
            <span className="kbd">Esc</span> отмена
          </span>
          <span className="key">
            <span className="kbd">F10</span> выход
          </span>
        </div>
        <p className={`status${statusTone}`} role="status">
          {status || 'Выберите параметр и нажмите Enter'}
        </p>
      </footer>

      <p className="setup__copyright">{brand.copyright}</p>
    </div>
  )
}
