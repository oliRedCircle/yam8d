import { css, cx } from '@linaria/core'
import { forwardRef, useEffect, useRef } from 'react'
import { mergeRefs } from '../utils/mergeRefs'
import type { ConnectedBus } from './connection/connection'
import type { CharacterCommand, RectCommand, WaveCommand } from './connection/protocol'
import { renderer } from './rendering/renderer'

const _m8ScreenClass = css`
  font-family: monospace;
  min-width: 480px;
  min-height: 320px;

  width: 48vw;
  height: 32vw;
`

export const M8Screen = forwardRef<HTMLCanvasElement, { bus: ConnectedBus | undefined }>(function M8Screen({ bus }, ref) {
  const innerRef = useRef<HTMLCanvasElement | null>(null)
  const refs = mergeRefs([ref, innerRef])
  useEffect(() => {
    if (!innerRef.current) {
      return
    }
    const render = renderer(innerRef.current)
    const drawText = (data: CharacterCommand) => {
      render?.text.drawText({
        char: data.character,
        pos: {
          x: Math.floor(data.pos.x / 12),
          y: Math.floor(data.pos.y / 14),
        },
        color: data.foreground,
      })
    }

    const drawRect = (data: RectCommand) => {
      if (!data) {
        return
      }
      render?.rect.drawRect(data)
    }

    const drawWave = (data: WaveCommand) => {
      render?.wave.drawWave(data)
    }

    bus?.protocol.eventBus.on('text', drawText)
    bus?.protocol.eventBus.on('rect', drawRect)
    bus?.protocol.eventBus.on('wave', drawWave)
    return () => {
      bus?.protocol.eventBus.off('text', drawText)
      bus?.protocol.eventBus.off('rect', drawRect)
      bus?.protocol.eventBus.off('wave', drawWave)
    }
  }, [bus])
  /*
  useEffect(() => {
    const buffer: string[][] = []
    for (let y = 0; y < 24; y += 1) {
      const array = []
      for (let x = 0; x < 40; x += 1) [array.push(' ')]
      buffer.push(array)
    }
    const handler = (data: CharacterCommand) => {
      const idx_y = Math.floor(data.pos.y / 14)
      const idx_x = Math.floor(data.pos.x / 12)

      const char = data.character
      const screen = buffer
      if (idx_y > screen.length || idx_x > screen[idx_y].length) {
        console.log('OOB', idx_x, idx_y)
        return
      }

      // console.table(screenBuffer)
      buffer[idx_y][idx_x] = char
      let text = ''
      if (ref.current) {
        const screen = buffer
        for (let y = 0; y < screen.length; y += 1) {
          const row = buffer[y]
          for (let x = 0; x < row.length; x += 1) {
            const col = row[x]
            text += col
          }
          text += '\n'
        }
        console.log(text)
        ref.current.innerText = text
      }
    }

    bus?.protocol.eventBus.on('text', handler)
    return () => bus?.protocol.eventBus.off('text', handler)
  }, [bus])
*/
  return <canvas className={cx(_m8ScreenClass, 'element')} ref={refs} />
})
