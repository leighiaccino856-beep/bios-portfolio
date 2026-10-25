import { useEffect, useRef, useState } from 'react'
import { bootLines, brand, profile } from '../data'

const TOTAL_MEMORY = 32768
const MEMORY_STEP = 1024

function memoryLabel(kb) {
  return `${String(kb).padStart(5, '0')}K OK`
}

export default function BootScreen({ onDone }) {
  const [memory, setMemory] = useState(0)
  const [shown, setShown] = useState(1)
  const doneRef = useRef(false)

  const finish = () => {
    if (doneRef.current) return
    doneRef.current = true
    onDone()
  }

  useEffect(() => {
    const memoryTimer = setInterval(() => {
      setMemory((value) =>
        value >= TOTAL_MEMORY ? value : Math.min(TOTAL_MEMORY, value + MEMORY_STEP),
      )
    }, 45)

    const linesTimer = setInterval(() => {
      setShown((value) => (value >= bootLines.length ? value : value + 1))
    }, 130)

    return () => {
      clearInterval(memoryTimer)
      clearInterval(linesTimer)
    }
  }, [])

  const finished = shown >= bootLines.length && memory >= TOTAL_MEMORY

  useEffect(() => {
    if (!finished) return undefined
    const timer = setTimeout(finish, 2200)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished])

  useEffect(() => {
    const skip = () => finish()
    window.addEventListener('keydown', skip)
    window.addEventListener('pointerdown', skip)
    return () => {
      window.removeEventListener('keydown', skip)
      window.removeEventListener('pointerdown', skip)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="boot">
      <div className="boot__bar">
        <span>POST — Power On Self Test</span>
        <span>{brand.version}</span>
      </div>

      <div className="boot__logo">
        <div className="boot__emblem">
          <img src={profile.avatar} alt={`Аватар ${profile.login}`} width="88" height="88" />
          <span>OEM</span>
        </div>
        <div className="boot__logo-text">
          <strong>{brand.name}</strong>
          <span>{brand.edition} · Setup Utility</span>
          <span className="boot__login">github.com/{profile.login}</span>
        </div>
      </div>

      <div className="boot__lines" aria-live="polite">
        {bootLines.slice(0, shown).map((line, index) => (
          <p className={`boot__line boot__line--${line.tone ?? 'base'}`} key={index}>
            {line.text.replace('{mem}', '')}
            {line.text.includes('{mem}') && memoryLabel(memory)}
          </p>
        ))}
        {!finished && <p className="boot__line boot__cursor-line"><span className="boot__cursor" /></p>}
      </div>

      <div className={`boot__prompt${finished ? ' is-visible' : ''}`}>
        <p>
          Press <span className="kbd">DEL</span> to enter SETUP
          <span className="boot__prompt-sep">·</span>
          <span className="boot__blink">нажмите любую клавишу</span>
        </p>
        <p className="boot__footnote">{brand.copyright}</p>
      </div>
    </div>
  )
}
