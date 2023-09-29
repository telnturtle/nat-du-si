import { css } from '@emotion/react'
import { useCallback, useEffect, useState } from 'react'
import { convertToFiveMinuteRepresentation } from './convertToFiveMinutes'
import { DecodedHM, encodeHM } from './encodeHM'
import { hangulTable, hangulTableColor } from './hangulTable'
import { toTableIndex } from './toTableIndex'
import { toTimeRep } from './toTimeRep'
import { useCss } from './useCss'

function App() {
  // 실제 시간

  const [currentHour, setCurrentHour] = useState(0)
  const [currentMinute, setCurrentMinute] = useState(0)
  const [currentSecond, setCurrentSecond] = useState(0)

  // 실제 시간을 1초마다 업데이트

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      setCurrentHour(now.getHours())
      setCurrentMinute(now.getMinutes())
      setCurrentSecond(now.getSeconds())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // controlled time or real time

  const [useControlledTime, setUseControlledTime] = useState(false)

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setUseControlledTime(e.currentTarget.checked)
  }, [])

  // controlled 시간

  const [controlledHour, setControlledHour] = useState(14)
  const [controlledMinute, setControlledMinute] = useState(0)

  const handleChangeRange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value)
    const newHour = Math.floor(value / 12)
    const newMinute = (value % 12) * 5
    setControlledHour(newHour)
    setControlledMinute(newMinute)
  }

  const handleClickButton: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const { name } = e.currentTarget as HTMLButtonElement

    if (name === '-h') {
      // minus an hour, but not less than 0
      setControlledHour((h) => (h + 24 - 1) % 24)
    } else if (name === '-5m') {
      // minus 5 minutes, but not less than 0
      setControlledMinute((m) => (m + 60 - 5) % 60)
      controlledMinute === 0 && setControlledHour((h) => (h + 24 - 1) % 24)
    } else if (name === 'now') {
      // set to now
      setControlledHour(currentHour)
      setControlledMinute(currentMinute)
    } else if (name === '+5m') {
      // plus 5 minutes, but not more than 59
      setControlledMinute((m) => (m + 5) % 60)
      controlledMinute === 55 && setControlledHour((h) => (h + 1) % 24)
    } else {
      // plus an hour, but not more than 23
      setControlledHour((h) => (h + 1) % 24)
    }
  }

  // 보여줄 시간

  const hour = useControlledTime ? controlledHour : currentHour
  const minute = useControlledTime ? controlledMinute : currentMinute
  const second = useControlledTime ? 0 : currentSecond

  // 테이블 인덱스

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
      position: relative;
    `,
    div1: css`
      font-size: 2.5rem;
      font-weight: 900;
      font-family: 'SUIT Variable', sans-serif;
      margin-bottom: 1rem;
      font-variant-numeric: tabular-nums;
      opacity: 1;
      position: absolute;
      transform: translate(0, -14rem);

      &.blink {
        animation: 7.4s ease-out 4.4s alternate infinite blink;
        opacity: 0;
      }

      @keyframes blink {
        0%,
        16% {
          opacity: 0;
        }
        84%,
        100% {
          opacity: 0.88;
        }
      }
    `,
    div2: css`
      width: 21rem;
      height: 21rem;
      display: grid;
      grid-template-rows: repeat(5, 1fr);
      grid-template-columns: repeat(5, 1fr);
      gap: 0.5rem;
      font-family: 'SUIT Variable', sans-serif;
      font-weight: 850;
      opacity: 0;

      animation: fade-in 3.6s ease 1s forwards;
      @keyframes fade-in {
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
        font-size: 3rem;
        color: rgb(50 50 50);
      }
    `,
    div3: css`
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;
      position: absolute;
      transform: translate(0, calc(14rem + 50%));
      gap: 1rem;

      & input[type='checkbox'] {
        transform: scale(2);
      }

      &.almost-invisible {
        opacity: 0.02;
      }

      & input[type='range'] {
        width: 95vw;
      }

      & .invisible {
        display: none;
      }

      & .buttons:not(.invisible) {
        display: flex;
        gap: 0.5rem;

        & button {
          color: initial;
        }
      }
    `,
  })

  return (
    <div css={csss.div}>
      <div className={useControlledTime ? '' : 'blink'} css={csss.div1}>
        {toTimeRep(hour, minute, second)}
      </div>
      <div css={csss.div2}>
        {hangulTable.map((row, i) =>
          row.map((col, j) => (
            <span
              key={`${i}.${j}`}
              style={{ color: tableIndexes.has(encodeHM([i, j])) ? hangulTableColor[i][j] : undefined }}
            >
              {col}
            </span>
          )),
        )}
      </div>
      <div {...(useControlledTime ? null : { className: 'almost-invisible' })} css={csss.div3}>
        <input type="checkbox" onChange={handleChange} />
        <div {...(useControlledTime ? null : { className: 'invisible' })}>
          <input type="range" min={0} max={287} value={hour * 12 + minute / 5} onChange={handleChangeRange} />
        </div>
        <div className={`buttons ${useControlledTime ? '' : 'invisible'}`}>
          {[
            ['-h', '← hour'],
            ['-5m', '← 5 minute'],
            ['now', 'now'],
            ['+5m', '5 minute →'],
            ['+h', 'hour →'],
          ].map(([name, text]) => (
            <button key={name} onClick={handleClickButton} name={name}>
              {text}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
