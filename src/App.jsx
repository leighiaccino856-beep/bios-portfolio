import { useCallback, useState } from 'react'
import BootScreen from './components/BootScreen'
import SetupScreen from './components/SetupScreen'

export default function App() {
  const [view, setView] = useState('boot')
  const enterSetup = useCallback(() => setView('setup'), [])
  const reboot = useCallback(() => setView('boot'), [])

  return (
    <div className="crt">
      <div className="crt__screen">
        {view === 'boot' ? (
          <BootScreen onDone={enterSetup} />
        ) : (
          <SetupScreen onReboot={reboot} />
        )}
      </div>
      <div className="crt__beam" aria-hidden="true" />
      <div className="crt__scanlines" aria-hidden="true" />
      <div className="crt__vignette" aria-hidden="true" />
      <div className="crt__flicker" aria-hidden="true" />
    </div>
  )
}
