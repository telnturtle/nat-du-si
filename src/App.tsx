import { css } from '@emotion/react'
import { useEffect, useState } from 'react'
import { hangulTable, hangulTableColor } from './hangulTable'
import { toTableIndex } from './toTableIndex'
import { convertToFiveMinuteRepresentation } from './convertToFiveMinutes'
import { DecodedHM, encodeHM } from './encodeHM'
import { toTimeRep } from './toTimeRep'
import { useCss } from './useCss'

function App() {
  const [hour, setHour] = useState(0)
  const [minute, setMinute] = useState(0)
  const [second, setSecond] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      setHour(now.getHours())
      setMinute(now.getMinutes())
      setSecond(now.getSeconds())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const [h, m] = convertToFiveMinuteRepresentation(hour, minute, second)

  const _tableIndexes = toTableIndex(h, m)

  const tableIndexes = new Set((Object.values(_tableIndexes).flat(1) as DecodedHM[]).map(encodeHM))

  const csss = useCss({
    div: css`
      display: flex;
      flex: 1;
      flex-flow: column;
      justify-content: center;
      align-items: center;
      background-color: rgb(26 26 26);
      color: rgb(220 220 220);
    `,
    div1: css`
      font-size: 2rem;
      font-weight: 900;
      font-family: 'SUIT Variable', sans-serif;
      margin-bottom: 1rem;
      font-variant-numeric: tabular-nums;
      opacity: 0;

      animation: blink 12s ease 4s infinite;

      @keyframes blink {
        0% {
          opacity: 0;
        }
        20% {
          opacity: 0.88;
        }
        60% {
          opacity: 0.88;
        }
        80% {
          opacity: 0;
        }
        100% {
          opacity: 0;
        }
      }
    `,
    div2: css`
      width: 20rem;
      height: 20rem;
      display: grid;
      grid-template-rows: repeat(5, 1fr);
      grid-template-columns: repeat(5, 1fr);
      gap: 0.5rem;
      font-family: 'SUIT Variable', sans-serif;
      font-weight: 900;
      opacity: 0;

      animation: fadeIn 3.6s ease 1s forwards;
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      & span {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2rem;
        color: #555;
      }
    `,
  })

  return (
    <div css={csss.div}>
      <div css={csss.div1}>{toTimeRep(hour, minute, second)}</div>
      <div css={csss.div2}>
        {hangulTable.map((row, i) =>
          row.map((col, j) => (
            <span style={{ color: tableIndexes.has(encodeHM([i, j])) ? hangulTableColor[i][j] : undefined }}>
              {col}
            </span>
          )),
        )}
      </div>
    </div>
  )
}

export default App
