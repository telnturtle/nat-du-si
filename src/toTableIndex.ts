export const toTableIndex = (hour: number, minute: number) => {
  const timeRep = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
  const bamnat = []
  if (timeRep === '12:00') {
    bamnat.push([3, 1])
    bamnat.push([4, 1])
  } else if (timeRep < '06:30' || timeRep > '18:40') {
    bamnat.push([3, 0])
  } else {
    bamnat.push([0, 0])
  }

  const sibun = []
  if (timeRep !== '12:00') {
    sibun.push([2, 4])
  }
  if (minute !== 0) {
    sibun.push([4, 4])
  }

  const siRep = []
  const bunRep = []
  if (timeRep !== '12:00') {
    switch (hour) {
      case 0:
        siRep.push([1, 3])
        siRep.push([2, 3])
        break
      case 1:
        siRep.push([1, 4])
        break
      case 2:
        siRep.push([2, 3])
        break
      case 3:
        siRep.push([0, 3])
        break
      case 4:
        siRep.push([0, 4])
        break
      case 5:
        siRep.push([0, 1])
        siRep.push([1, 1])
        break
      case 6:
        siRep.push([1, 0])
        siRep.push([1, 1])
        break
      case 7:
        siRep.push([0, 2])
        siRep.push([1, 2])
        break
      case 8:
        siRep.push([1, 0])
        siRep.push([2, 0])
        break
      case 9:
        siRep.push([2, 1])
        siRep.push([2, 2])
        break
      case 10:
        siRep.push([1, 3])
        break
      case 11:
        siRep.push([1, 3])
        siRep.push([1, 4])
        break
      case 12:
        siRep.push([1, 3])
        siRep.push([2, 3])
        break
      case 13:
        siRep.push([1, 4])
        break
      case 14:
        siRep.push([2, 3])
        break
      case 15:
        siRep.push([0, 3])
        break
      case 16:
        siRep.push([0, 4])
        break
      case 17:
        siRep.push([0, 1])
        siRep.push([1, 1])
        break
      case 18:
        siRep.push([1, 0])
        siRep.push([1, 1])
        break
      case 19:
        siRep.push([0, 2])
        siRep.push([1, 2])
        break
      case 20:
        siRep.push([1, 0])
        siRep.push([2, 0])
        break
      case 21:
        siRep.push([2, 1])
        siRep.push([2, 2])
        break
      case 22:
        siRep.push([1, 3])
        break
      case 23:
        siRep.push([1, 3])
        siRep.push([1, 4])
        break
    }
    switch (minute) {
      case 5:
        bunRep.push([4, 3])
        break
      case 10:
        bunRep.push([4, 2])
        break
      case 15:
        bunRep.push([4, 2])
        bunRep.push([4, 3])
        break
      case 20:
        bunRep.push([3, 2])
        bunRep.push([4, 2])
        break
      case 25:
        bunRep.push([3, 2])
        bunRep.push([4, 2])
        bunRep.push([4, 3])
        break
      case 30:
        bunRep.push([3, 3])
        bunRep.push([3, 4])
        break
      case 35:
        bunRep.push([3, 3])
        bunRep.push([3, 4])
        bunRep.push([4, 3])
        break
      case 40:
        bunRep.push([4, 0])
        bunRep.push([4, 2])
        break
      case 45:
        bunRep.push([4, 0])
        bunRep.push([4, 2])
        bunRep.push([4, 3])
        break
      case 50:
        bunRep.push([4, 1])
        bunRep.push([4, 2])
        break
      case 55:
        bunRep.push([4, 1])
        bunRep.push([4, 2])
        bunRep.push([4, 3])
        break
    }
  }

  return { bamnat, siRep, bunRep, sibun }
}
