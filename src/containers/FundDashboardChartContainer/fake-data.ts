const HOUR_IN_MS = 60 * 60 * 1000
const DAY_IN_MS = 24 * HOUR_IN_MS
const MONTH_IN_MS = 30 * DAY_IN_MS
const getRand = () => (Math.random() - 0.5) * 100
const getMonthDayShortName = (date: Date) => date.toLocaleString('default', { month: 'short', day: '2-digit' })
const getDayHourShortName = (date: Date) => date.toLocaleString('default', {
  month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit',
})

export const hour24data = [
  new Date(Date.now() - 24 * HOUR_IN_MS),
  new Date(Date.now() - 22 * HOUR_IN_MS),
  new Date(Date.now() - 20 * HOUR_IN_MS),
  new Date(Date.now() - 18 * HOUR_IN_MS),
  new Date(Date.now() - 16 * HOUR_IN_MS),
  new Date(Date.now() - 14 * HOUR_IN_MS),
  new Date(Date.now() - 12 * HOUR_IN_MS),
  new Date(Date.now() - 10 * HOUR_IN_MS),
  new Date(Date.now() - 8 * HOUR_IN_MS),
  new Date(Date.now() - 6 * HOUR_IN_MS),
  new Date(Date.now() - 4 * HOUR_IN_MS),
  new Date(Date.now() - 2 * HOUR_IN_MS),
  new Date(),
].map(d => ({ "xLabel": getDayHourShortName(d), "value": getRand() }))
export const day7data = [
  new Date(Date.now() - 6 * DAY_IN_MS),
  new Date(Date.now() - 5 * DAY_IN_MS),
  new Date(Date.now() - 4 * DAY_IN_MS),
  new Date(Date.now() - 3 * DAY_IN_MS),
  new Date(Date.now() - 2 * DAY_IN_MS),
  new Date(Date.now() - 1 * DAY_IN_MS),
  new Date(),
].map(d => ({ "xLabel": getMonthDayShortName(d), "value": getRand() }))
export const day30data = [
  new Date(Date.now() - 30 * DAY_IN_MS),
  new Date(Date.now() - 27 * DAY_IN_MS),
  new Date(Date.now() - 24 * DAY_IN_MS),
  new Date(Date.now() - 21 * DAY_IN_MS),
  new Date(Date.now() - 18 * DAY_IN_MS),
  new Date(Date.now() - 15 * DAY_IN_MS),
  new Date(Date.now() - 12 * DAY_IN_MS),
  new Date(Date.now() - 9 * DAY_IN_MS),
  new Date(Date.now() - 6 * DAY_IN_MS),
  new Date(Date.now() - 3 * DAY_IN_MS),
  new Date(),
].map(d => ({ "xLabel": getMonthDayShortName(d), "value": getRand() }))
export const day90data = [
  new Date(Date.now() - 2 * MONTH_IN_MS),
  new Date(Date.now() - 1.5 * MONTH_IN_MS),
  new Date(Date.now() - 1 * MONTH_IN_MS),
  new Date(Date.now() - 0.5 * MONTH_IN_MS),
  new Date(),
].map(d => ({ "xLabel": getMonthDayShortName(d), "value": getRand() }))
