export const toTimeRep = (hour: number, minute: number, second: number): string => {
  const hh = String(hour).padStart(2, '0')
  const mm = String(minute).padStart(2, '0')
  const ss = String(second).padStart(2, '0')
  const timeRep = [hh, mm, ss].join(':')

  return timeRep
}
