const keyLeft = 0b10000000
const keyUp = 0b01000000
const keyDown = 0b00100000
const keyShift = 0b00010000
const keyPlay = 0b00001000
const keyRight = 0b00000100
const keyOpt = 0b00000010
const keyEdit = 0b00000001

export const isLeft = (frame: number) => !!(frame & keyLeft)
export const isUp = (frame: number) => !!(frame & keyUp)
export const isDown = (frame: number) => !!(frame & keyDown)
export const isShift = (frame: number) => !!(frame & keyShift)
export const isPlay = (frame: number) => !!(frame & keyPlay)
export const isRight = (frame: number) => !!(frame & keyRight)
export const isOpt = (frame: number) => !!(frame & keyOpt)
export const isEdit = (frame: number) => !!(frame & keyEdit)

export const pressKeys = ({
  left,
  right,
  up,
  down,
  shift,
  play,
  opt,
  edit,
}: {
  left?: boolean
  right?: boolean
  up?: boolean
  down?: boolean
  shift?: boolean
  play?: boolean
  opt?: boolean
  edit?: boolean
}) => {
  let state = 0x00
  if (left) {
    state |= keyLeft
  }
  if (right) {
    state |= keyRight
  }
  if (up) {
    state |= keyUp
  }
  if (down) {
    state |= keyDown
  }
  if (shift) {
    state |= keyShift
  }
  if (play) {
    state |= keyPlay
  }
  if (opt) {
    state |= keyOpt
  }
  if (edit) {
    state |= keyEdit
  }
  return state
}
