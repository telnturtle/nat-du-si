import { expect, test } from 'vitest'
import { toTableIndex } from './toTableIndex'
import { hangulTable } from './hangulTable'

const toBeTested = toTableIndex

const toTimeRep = (ns: number[]) =>
  ns
    .map(String)
    .map((s) => s.padStart(2, '0'))
    .join(':')

const testSet = [
  { params: [0, 0], result: '밤 열두 시' },
  { params: [0, 5], result: '밤 열두 시 오 분' },
  { params: [0, 10], result: '밤 열두 시 십 분' },
  { params: [0, 15], result: '밤 열두 시 십오 분' },
  { params: [0, 20], result: '밤 열두 시 이십 분' },
  { params: [0, 25], result: '밤 열두 시 이십오 분' },
  { params: [0, 30], result: '밤 열두 시 삼십 분' },
  { params: [0, 35], result: '밤 열두 시 삼십오 분' },
  { params: [0, 40], result: '밤 열두 시 사십 분' },
  { params: [0, 45], result: '밤 열두 시 사십오 분' },
  { params: [0, 50], result: '밤 열두 시 오십 분' },
  { params: [0, 55], result: '밤 열두 시 오십오 분' },
  { params: [1, 0], result: '밤 한 시' },
  { params: [1, 5], result: '밤 한 시 오 분' },
  { params: [1, 10], result: '밤 한 시 십 분' },
  { params: [1, 15], result: '밤 한 시 십오 분' },
  { params: [1, 20], result: '밤 한 시 이십 분' },
  { params: [1, 25], result: '밤 한 시 이십오 분' },
  { params: [1, 30], result: '밤 한 시 삼십 분' },
  { params: [1, 35], result: '밤 한 시 삼십오 분' },
  { params: [1, 40], result: '밤 한 시 사십 분' },
  { params: [1, 45], result: '밤 한 시 사십오 분' },
  { params: [1, 50], result: '밤 한 시 오십 분' },
  { params: [1, 55], result: '밤 한 시 오십오 분' },
  { params: [2, 0], result: '밤 두 시' },
  { params: [2, 5], result: '밤 두 시 오 분' },
  { params: [2, 10], result: '밤 두 시 십 분' },
  { params: [2, 15], result: '밤 두 시 십오 분' },
  { params: [2, 20], result: '밤 두 시 이십 분' },
  { params: [2, 25], result: '밤 두 시 이십오 분' },
  { params: [2, 30], result: '밤 두 시 삼십 분' },
  { params: [2, 35], result: '밤 두 시 삼십오 분' },
  { params: [2, 40], result: '밤 두 시 사십 분' },
  { params: [2, 45], result: '밤 두 시 사십오 분' },
  { params: [2, 50], result: '밤 두 시 오십 분' },
  { params: [2, 55], result: '밤 두 시 오십오 분' },
  { params: [3, 0], result: '밤 세 시' },
  { params: [3, 5], result: '밤 세 시 오 분' },
  { params: [3, 10], result: '밤 세 시 십 분' },
  { params: [3, 15], result: '밤 세 시 십오 분' },
  { params: [3, 20], result: '밤 세 시 이십 분' },
  { params: [3, 25], result: '밤 세 시 이십오 분' },
  { params: [3, 30], result: '밤 세 시 삼십 분' },
  { params: [3, 35], result: '밤 세 시 삼십오 분' },
  { params: [3, 40], result: '밤 세 시 사십 분' },
  { params: [3, 45], result: '밤 세 시 사십오 분' },
  { params: [3, 50], result: '밤 세 시 오십 분' },
  { params: [3, 55], result: '밤 세 시 오십오 분' },
  { params: [4, 0], result: '밤 네 시' },
  { params: [4, 5], result: '밤 네 시 오 분' },
  { params: [4, 10], result: '밤 네 시 십 분' },
  { params: [4, 15], result: '밤 네 시 십오 분' },
  { params: [4, 20], result: '밤 네 시 이십 분' },
  { params: [4, 25], result: '밤 네 시 이십오 분' },
  { params: [4, 30], result: '밤 네 시 삼십 분' },
  { params: [4, 35], result: '밤 네 시 삼십오 분' },
  { params: [4, 40], result: '밤 네 시 사십 분' },
  { params: [4, 45], result: '밤 네 시 사십오 분' },
  { params: [4, 50], result: '밤 네 시 오십 분' },
  { params: [4, 55], result: '밤 네 시 오십오 분' },
  { params: [5, 0], result: '밤 다섯 시' },
  { params: [5, 5], result: '밤 다섯 시 오 분' },
  { params: [5, 10], result: '밤 다섯 시 십 분' },
  { params: [5, 15], result: '밤 다섯 시 십오 분' },
  { params: [5, 20], result: '밤 다섯 시 이십 분' },
  { params: [5, 25], result: '밤 다섯 시 이십오 분' },
  { params: [5, 30], result: '밤 다섯 시 삼십 분' },
  { params: [5, 35], result: '밤 다섯 시 삼십오 분' },
  { params: [5, 40], result: '밤 다섯 시 사십 분' },
  { params: [5, 45], result: '밤 다섯 시 사십오 분' },
  { params: [5, 50], result: '밤 다섯 시 오십 분' },
  { params: [5, 55], result: '밤 다섯 시 오십오 분' },
  { params: [6, 0], result: '밤 여섯 시' },
  { params: [6, 5], result: '밤 여섯 시 오 분' },
  { params: [6, 10], result: '밤 여섯 시 십 분' },
  { params: [6, 15], result: '밤 여섯 시 십오 분' },
  { params: [6, 20], result: '밤 여섯 시 이십 분' },
  { params: [6, 25], result: '밤 여섯 시 이십오 분' },
  { params: [6, 30], result: '낮 여섯 시 삼십 분' },
  { params: [6, 35], result: '낮 여섯 시 삼십오 분' },
  { params: [6, 40], result: '낮 여섯 시 사십 분' },
  { params: [6, 45], result: '낮 여섯 시 사십오 분' },
  { params: [6, 50], result: '낮 여섯 시 오십 분' },
  { params: [6, 55], result: '낮 여섯 시 오십오 분' },
  { params: [7, 0], result: '낮 일곱 시' },
  { params: [7, 5], result: '낮 일곱 시 오 분' },
  { params: [7, 10], result: '낮 일곱 시 십 분' },
  { params: [7, 15], result: '낮 일곱 시 십오 분' },
  { params: [7, 20], result: '낮 일곱 시 이십 분' },
  { params: [7, 25], result: '낮 일곱 시 이십오 분' },
  { params: [7, 30], result: '낮 일곱 시 삼십 분' },
  { params: [7, 35], result: '낮 일곱 시 삼십오 분' },
  { params: [7, 40], result: '낮 일곱 시 사십 분' },
  { params: [7, 45], result: '낮 일곱 시 사십오 분' },
  { params: [7, 50], result: '낮 일곱 시 오십 분' },
  { params: [7, 55], result: '낮 일곱 시 오십오 분' },
  { params: [8, 0], result: '낮 여덟 시' },
  { params: [8, 5], result: '낮 여덟 시 오 분' },
  { params: [8, 10], result: '낮 여덟 시 십 분' },
  { params: [8, 15], result: '낮 여덟 시 십오 분' },
  { params: [8, 20], result: '낮 여덟 시 이십 분' },
  { params: [8, 25], result: '낮 여덟 시 이십오 분' },
  { params: [8, 30], result: '낮 여덟 시 삼십 분' },
  { params: [8, 35], result: '낮 여덟 시 삼십오 분' },
  { params: [8, 40], result: '낮 여덟 시 사십 분' },
  { params: [8, 45], result: '낮 여덟 시 사십오 분' },
  { params: [8, 50], result: '낮 여덟 시 오십 분' },
  { params: [8, 55], result: '낮 여덟 시 오십오 분' },
  { params: [9, 0], result: '낮 아홉 시' },
  { params: [9, 5], result: '낮 아홉 시 오 분' },
  { params: [9, 10], result: '낮 아홉 시 십 분' },
  { params: [9, 15], result: '낮 아홉 시 십오 분' },
  { params: [9, 20], result: '낮 아홉 시 이십 분' },
  { params: [9, 25], result: '낮 아홉 시 이십오 분' },
  { params: [9, 30], result: '낮 아홉 시 삼십 분' },
  { params: [9, 35], result: '낮 아홉 시 삼십오 분' },
  { params: [9, 40], result: '낮 아홉 시 사십 분' },
  { params: [9, 45], result: '낮 아홉 시 사십오 분' },
  { params: [9, 50], result: '낮 아홉 시 오십 분' },
  { params: [9, 55], result: '낮 아홉 시 오십오 분' },
  { params: [10, 0], result: '낮 열 시' },
  { params: [10, 5], result: '낮 열 시 오 분' },
  { params: [10, 10], result: '낮 열 시 십 분' },
  { params: [10, 15], result: '낮 열 시 십오 분' },
  { params: [10, 20], result: '낮 열 시 이십 분' },
  { params: [10, 25], result: '낮 열 시 이십오 분' },
  { params: [10, 30], result: '낮 열 시 삼십 분' },
  { params: [10, 35], result: '낮 열 시 삼십오 분' },
  { params: [10, 40], result: '낮 열 시 사십 분' },
  { params: [10, 45], result: '낮 열 시 사십오 분' },
  { params: [10, 50], result: '낮 열 시 오십 분' },
  { params: [10, 55], result: '낮 열 시 오십오 분' },
  { params: [11, 0], result: '낮 열한 시' },
  { params: [11, 5], result: '낮 열한 시 오 분' },
  { params: [11, 10], result: '낮 열한 시 십 분' },
  { params: [11, 15], result: '낮 열한 시 십오 분' },
  { params: [11, 20], result: '낮 열한 시 이십 분' },
  { params: [11, 25], result: '낮 열한 시 이십오 분' },
  { params: [11, 30], result: '낮 열한 시 삼십 분' },
  { params: [11, 35], result: '낮 열한 시 삼십오 분' },
  { params: [11, 40], result: '낮 열한 시 사십 분' },
  { params: [11, 45], result: '낮 열한 시 사십오 분' },
  { params: [11, 50], result: '낮 열한 시 오십 분' },
  { params: [11, 55], result: '낮 열한 시 오십오 분' },
  { params: [12, 0], result: '정오' },
  { params: [12, 5], result: '낮 열두 시 오 분' },
  { params: [12, 10], result: '낮 열두 시 십 분' },
  { params: [12, 15], result: '낮 열두 시 십오 분' },
  { params: [12, 20], result: '낮 열두 시 이십 분' },
  { params: [12, 25], result: '낮 열두 시 이십오 분' },
  { params: [12, 30], result: '낮 열두 시 삼십 분' },
  { params: [12, 35], result: '낮 열두 시 삼십오 분' },
  { params: [12, 40], result: '낮 열두 시 사십 분' },
  { params: [12, 45], result: '낮 열두 시 사십오 분' },
  { params: [12, 50], result: '낮 열두 시 오십 분' },
  { params: [12, 55], result: '낮 열두 시 오십오 분' },
  { params: [13, 0], result: '낮 한 시' },
  { params: [13, 5], result: '낮 한 시 오 분' },
  { params: [13, 10], result: '낮 한 시 십 분' },
  { params: [13, 15], result: '낮 한 시 십오 분' },
  { params: [13, 20], result: '낮 한 시 이십 분' },
  { params: [13, 25], result: '낮 한 시 이십오 분' },
  { params: [13, 30], result: '낮 한 시 삼십 분' },
  { params: [13, 35], result: '낮 한 시 삼십오 분' },
  { params: [13, 40], result: '낮 한 시 사십 분' },
  { params: [13, 45], result: '낮 한 시 사십오 분' },
  { params: [13, 50], result: '낮 한 시 오십 분' },
  { params: [13, 55], result: '낮 한 시 오십오 분' },
  { params: [14, 0], result: '낮 두 시' },
  { params: [14, 5], result: '낮 두 시 오 분' },
  { params: [14, 10], result: '낮 두 시 십 분' },
  { params: [14, 15], result: '낮 두 시 십오 분' },
  { params: [14, 20], result: '낮 두 시 이십 분' },
  { params: [14, 25], result: '낮 두 시 이십오 분' },
  { params: [14, 30], result: '낮 두 시 삼십 분' },
  { params: [14, 35], result: '낮 두 시 삼십오 분' },
  { params: [14, 40], result: '낮 두 시 사십 분' },
  { params: [14, 45], result: '낮 두 시 사십오 분' },
  { params: [14, 50], result: '낮 두 시 오십 분' },
  { params: [14, 55], result: '낮 두 시 오십오 분' },
  { params: [15, 0], result: '낮 세 시' },
  { params: [15, 5], result: '낮 세 시 오 분' },
  { params: [15, 10], result: '낮 세 시 십 분' },
  { params: [15, 15], result: '낮 세 시 십오 분' },
  { params: [15, 20], result: '낮 세 시 이십 분' },
  { params: [15, 25], result: '낮 세 시 이십오 분' },
  { params: [15, 30], result: '낮 세 시 삼십 분' },
  { params: [15, 35], result: '낮 세 시 삼십오 분' },
  { params: [15, 40], result: '낮 세 시 사십 분' },
  { params: [15, 45], result: '낮 세 시 사십오 분' },
  { params: [15, 50], result: '낮 세 시 오십 분' },
  { params: [15, 55], result: '낮 세 시 오십오 분' },
  { params: [16, 0], result: '낮 네 시' },
  { params: [16, 5], result: '낮 네 시 오 분' },
  { params: [16, 10], result: '낮 네 시 십 분' },
  { params: [16, 15], result: '낮 네 시 십오 분' },
  { params: [16, 20], result: '낮 네 시 이십 분' },
  { params: [16, 25], result: '낮 네 시 이십오 분' },
  { params: [16, 30], result: '낮 네 시 삼십 분' },
  { params: [16, 35], result: '낮 네 시 삼십오 분' },
  { params: [16, 40], result: '낮 네 시 사십 분' },
  { params: [16, 45], result: '낮 네 시 사십오 분' },
  { params: [16, 50], result: '낮 네 시 오십 분' },
  { params: [16, 55], result: '낮 네 시 오십오 분' },
  { params: [17, 0], result: '낮 다섯 시' },
  { params: [17, 5], result: '낮 다섯 시 오 분' },
  { params: [17, 10], result: '낮 다섯 시 십 분' },
  { params: [17, 15], result: '낮 다섯 시 십오 분' },
  { params: [17, 20], result: '낮 다섯 시 이십 분' },
  { params: [17, 25], result: '낮 다섯 시 이십오 분' },
  { params: [17, 30], result: '낮 다섯 시 삼십 분' },
  { params: [17, 35], result: '낮 다섯 시 삼십오 분' },
  { params: [17, 40], result: '낮 다섯 시 사십 분' },
  { params: [17, 45], result: '낮 다섯 시 사십오 분' },
  { params: [17, 50], result: '낮 다섯 시 오십 분' },
  { params: [17, 55], result: '낮 다섯 시 오십오 분' },
  { params: [18, 0], result: '낮 여섯 시' },
  { params: [18, 5], result: '낮 여섯 시 오 분' },
  { params: [18, 10], result: '낮 여섯 시 십 분' },
  { params: [18, 15], result: '낮 여섯 시 십오 분' },
  { params: [18, 20], result: '낮 여섯 시 이십 분' },
  { params: [18, 25], result: '낮 여섯 시 이십오 분' },
  { params: [18, 30], result: '낮 여섯 시 삼십 분' },
  { params: [18, 35], result: '낮 여섯 시 삼십오 분' },
  { params: [18, 40], result: '낮 여섯 시 사십 분' },
  { params: [18, 45], result: '밤 여섯 시 사십오 분' },
  { params: [18, 50], result: '밤 여섯 시 오십 분' },
  { params: [18, 55], result: '밤 여섯 시 오십오 분' },
  { params: [19, 0], result: '밤 일곱 시' },
  { params: [19, 5], result: '밤 일곱 시 오 분' },
  { params: [19, 10], result: '밤 일곱 시 십 분' },
  { params: [19, 15], result: '밤 일곱 시 십오 분' },
  { params: [19, 20], result: '밤 일곱 시 이십 분' },
  { params: [19, 25], result: '밤 일곱 시 이십오 분' },
  { params: [19, 30], result: '밤 일곱 시 삼십 분' },
  { params: [19, 35], result: '밤 일곱 시 삼십오 분' },
  { params: [19, 40], result: '밤 일곱 시 사십 분' },
  { params: [19, 45], result: '밤 일곱 시 사십오 분' },
  { params: [19, 50], result: '밤 일곱 시 오십 분' },
  { params: [19, 55], result: '밤 일곱 시 오십오 분' },
  { params: [20, 0], result: '밤 여덟 시' },
  { params: [20, 5], result: '밤 여덟 시 오 분' },
  { params: [20, 10], result: '밤 여덟 시 십 분' },
  { params: [20, 15], result: '밤 여덟 시 십오 분' },
  { params: [20, 20], result: '밤 여덟 시 이십 분' },
  { params: [20, 25], result: '밤 여덟 시 이십오 분' },
  { params: [20, 30], result: '밤 여덟 시 삼십 분' },
  { params: [20, 35], result: '밤 여덟 시 삼십오 분' },
  { params: [20, 40], result: '밤 여덟 시 사십 분' },
  { params: [20, 45], result: '밤 여덟 시 사십오 분' },
  { params: [20, 50], result: '밤 여덟 시 오십 분' },
  { params: [20, 55], result: '밤 여덟 시 오십오 분' },
  { params: [21, 0], result: '밤 아홉 시' },
  { params: [21, 5], result: '밤 아홉 시 오 분' },
  { params: [21, 10], result: '밤 아홉 시 십 분' },
  { params: [21, 15], result: '밤 아홉 시 십오 분' },
  { params: [21, 20], result: '밤 아홉 시 이십 분' },
  { params: [21, 25], result: '밤 아홉 시 이십오 분' },
  { params: [21, 30], result: '밤 아홉 시 삼십 분' },
  { params: [21, 35], result: '밤 아홉 시 삼십오 분' },
  { params: [21, 40], result: '밤 아홉 시 사십 분' },
  { params: [21, 45], result: '밤 아홉 시 사십오 분' },
  { params: [21, 50], result: '밤 아홉 시 오십 분' },
  { params: [21, 55], result: '밤 아홉 시 오십오 분' },
  { params: [22, 0], result: '밤 열 시' },
  { params: [22, 5], result: '밤 열 시 오 분' },
  { params: [22, 10], result: '밤 열 시 십 분' },
  { params: [22, 15], result: '밤 열 시 십오 분' },
  { params: [22, 20], result: '밤 열 시 이십 분' },
  { params: [22, 25], result: '밤 열 시 이십오 분' },
  { params: [22, 30], result: '밤 열 시 삼십 분' },
  { params: [22, 35], result: '밤 열 시 삼십오 분' },
  { params: [22, 40], result: '밤 열 시 사십 분' },
  { params: [22, 45], result: '밤 열 시 사십오 분' },
  { params: [22, 50], result: '밤 열 시 오십 분' },
  { params: [22, 55], result: '밤 열 시 오십오 분' },
  { params: [23, 0], result: '밤 열한 시' },
  { params: [23, 5], result: '밤 열한 시 오 분' },
  { params: [23, 10], result: '밤 열한 시 십 분' },
  { params: [23, 15], result: '밤 열한 시 십오 분' },
  { params: [23, 20], result: '밤 열한 시 이십 분' },
  { params: [23, 25], result: '밤 열한 시 이십오 분' },
  { params: [23, 30], result: '밤 열한 시 삼십 분' },
  { params: [23, 35], result: '밤 열한 시 삼십오 분' },
  { params: [23, 40], result: '밤 열한 시 사십 분' },
  { params: [23, 45], result: '밤 열한 시 사십오 분' },
  { params: [23, 50], result: '밤 열한 시 오십 분' },
  { params: [23, 55], result: '밤 열한 시 오십오 분' },
]

const processResult = ({
  bamnat,
  siRep,
  bunRep,
  sibun,
}: ReturnType<typeof toBeTested>): string => {
  if (bamnat[0][0] === 3 && bamnat[0][1] === 1) {
    return '정오'
  }

  const results = []

  if (bamnat) {
    for (const bn of bamnat) {
      const [i, j] = bn
      results.push(hangulTable[i][j])
    }
  }

  if (sibun[0]) {
    const r = []
    for (let index = 0; index < siRep.length; index++) {
      const [i, j] = siRep[index]
      r.push(hangulTable[i][j])
    }
    results.push(r.join(''))
    const [i, j] = sibun[0]
    results.push(hangulTable[i][j])
  }
  if (sibun[1]) {
    const r = []
    for (let index = 0; index < bunRep.length; index++) {
      const [i, j] = bunRep[index]
      r.push(hangulTable[i][j])
    }
    results.push(r.join(''))
    const [i, j] = sibun[1]
    results.push(hangulTable[i][j])
  }

  return results.join(' ')
}

testSet.forEach(({ params, result }) => {
  test(toTimeRep(params) + ' -> ' + result, () => {
    expect(processResult(toBeTested(params[0], params[1]))).toBe(result)
  })
})
