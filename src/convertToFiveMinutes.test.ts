import { expect, test } from 'vitest'
import { convertToFiveMinuteRepresentation } from './convertToFiveMinutes.ts'

const toBeTested = convertToFiveMinuteRepresentation

const toTimeRep = (ns: number[]) =>
  ns
    .map(String)
    .map((s) => s.padStart(2, '0'))
    .join(':')

const testSet_: {
  params: Parameters<typeof toBeTested>
  result: ReturnType<typeof toBeTested>
}[] = [
  { params: [0, 0, 0], result: [0, 0] },
  { params: [0, 2, 29], result: [0, 0] },
  { params: [0, 2, 30], result: [0, 5] },
  { params: [0, 5, 0], result: [0, 5] },
  { params: [0, 7, 29], result: [0, 5] },
  { params: [0, 7, 30], result: [0, 10] },
  { params: [0, 10, 0], result: [0, 10] },
  { params: [0, 12, 29], result: [0, 10] },
  { params: [0, 12, 30], result: [0, 15] },
  { params: [0, 15, 0], result: [0, 15] },
  { params: [0, 17, 29], result: [0, 15] },
  { params: [0, 17, 30], result: [0, 20] },
  { params: [0, 20, 0], result: [0, 20] },
  { params: [0, 22, 29], result: [0, 20] },
  { params: [0, 22, 30], result: [0, 25] },
  { params: [0, 25, 0], result: [0, 25] },
  { params: [0, 27, 29], result: [0, 25] },
  { params: [0, 27, 30], result: [0, 30] },
  { params: [0, 30, 0], result: [0, 30] },
  { params: [0, 32, 29], result: [0, 30] },
  { params: [0, 32, 30], result: [0, 35] },
  { params: [0, 35, 0], result: [0, 35] },
  { params: [0, 37, 29], result: [0, 35] },
  { params: [0, 37, 30], result: [0, 40] },
  { params: [0, 40, 0], result: [0, 40] },
  { params: [0, 42, 29], result: [0, 40] },
  { params: [0, 42, 30], result: [0, 45] },
  { params: [0, 45, 0], result: [0, 45] },
  { params: [0, 47, 29], result: [0, 45] },
  { params: [0, 47, 30], result: [0, 50] },
  { params: [0, 50, 0], result: [0, 50] },
  { params: [0, 52, 29], result: [0, 50] },
  { params: [0, 52, 30], result: [0, 55] },
  { params: [0, 55, 0], result: [0, 55] },
  { params: [0, 57, 29], result: [0, 55] },
  { params: [0, 57, 30], result: [1, 0] },
]

const oneToTwentyThree = Array(24)
  .fill(0)
  .map((_, i) => i)
  .slice(1)

const testSet = oneToTwentyThree
  .map((diff) =>
    testSet_.map(({ params, result }) => {
      const [h, m, s] = params
      const [h_, m_] = result
      return {
        params: [(h + diff) % 24, m, s],
        result: [(h_ + diff) % 24, m_],
      }
    }),
  )
  .flat(1)

testSet.forEach(({ params, result }) => {
  test(toTimeRep(params) + ' -> ' + toTimeRep(result), () => {
    expect(toBeTested(params[0], params[1], params[2])).toEqual(result)
  })
})
