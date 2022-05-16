export const generateRandomAddr = (): string => {
  const l = 40
  const digit = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  return `0x${new Array(l).fill(0).map(() => digit[Math.floor(Math.random() * digit.length)]).join('')}`
}

