import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div
      css={{
        width: '99vw',
        margin: '0 auto',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <h1 css={{ textTransform: 'capitalize' }}>
        {['vite', 'react', 'TS'].join(' + ')}
      </h1>
      <h2 css={{ textTransform: 'capitalize' }}>
        {['', 'ant design', 'ant design icon', 'emotion', 'prettier', 'ESLint'].join(
          ' + ',
        )}
      </h2>
      <p>
        <time>2023-08-05</time>
      </p>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </div>
  )
}

export default App
