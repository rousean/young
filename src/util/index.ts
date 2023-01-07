// 返回UUID
export const UUID = (): string => crypto.randomUUID()

export const debounce = <T extends (...args: any) => any>(fn: T, time?: number, immediate?: boolean): ((...args: any) => any) => {
  let timeoutId: null | number
  let defaultImmediate = immediate || false
  const delay = time || 300
  return (...args: any) => {
    if (defaultImmediate) {
      fn.apply(this, args)
      defaultImmediate = false
      return
    }
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      fn.apply(this, args)
      timeoutId = null
    }, delay)
  }
}