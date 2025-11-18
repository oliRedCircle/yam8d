import { css } from '@linaria/core'
import './App.css'
import { type FC, useCallback, useState } from 'react'
import { Button } from './components/Button'
import type { ConnectedBus } from './features/connection/connection'
import { device } from './features/connection/device'
import { M8Player } from './features/M8View'

const appClass = css`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretch;
  align-items: stretch;

  gap: 32px;

  > ._buttons {
    display: flex;
  }
`

export const App: FC = () => {
  const [connectedBus, setConnectedBus] = useState<ConnectedBus>()
  const tryConnect = useCallback(() => {
    const res = device()

    ;(async () => {
      if (!res.connection.browserSupport) {
        console.error('No usb / serial support detected.')
        return
      }
      setConnectedBus(await res.connection.connect())
      await res.audio.connect()
    })()
  }, [])
  return (
    <div className={appClass}>
      <Button onClick={tryConnect}>Connect</Button>
      <M8Player bus={connectedBus} />
    </div>
  )
}
