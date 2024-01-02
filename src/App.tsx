import { useState } from 'react'
import styles from './App.module.scss'
// import styles from './App.module.css'

function App() {
  const [count, setCount] = useState(0)

  const n: number = 5
  console.log(n)

  return (
    <>
      <h1 className={styles.title}>Count</h1>
      <div>
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
      </div>
    </>
  )
}

export default App
