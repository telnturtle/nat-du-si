const f24 = (n: number) => (24 + n) % 24
const f60 = (n: number) => (60 + n) % 60

const convertToFiveMinuteRepresentation_ = (hour: number, minute: number, second: number): [number, number] => {
  if (minute === 57 && second >= 30) {
    return [hour + 1, 0]
  }
  if (minute > 57) {
    return [hour + 1, 0]
  }
  if (minute % 5 === 0) {
    return [hour, minute]
  }
  if (minute % 5 === 2) {
    if (second < 30) {
      return [hour, minute - 2]
    }
    if (second >= 30) {
      return [hour, minute + 3]
    }
  }
  if (minute % 5 === 1) {
    return [hour, minute - 1]
  }
  if (minute % 5 === 3) {
    return [hour, minute + 2]
  }
  if (minute % 5 === 4) {
    return [hour, minute + 1]
  }
  return [hour, minute]
}

export const convertToFiveMinuteRepresentation = (hour: number, minute: number, second: number): [number, number] => {
  const [h, m] = convertToFiveMinuteRepresentation_(hour, minute, second)
  return [f24(h), f60(m)]
}
