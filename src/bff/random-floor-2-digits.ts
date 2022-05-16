export const randomFloor2digits = (max: number): number => {
  return Math.floor(Math.random() * max * 100) / 100
}
