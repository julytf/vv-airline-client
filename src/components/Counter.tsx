import { FC, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../services/state/store'
import { decrement, increment, incrementByAmount } from '../services/state/counter/counterSlice'

const Counter: FC = () => {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch<AppDispatch>()

  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <input type='number' ref={inputRef} />
      <button
        onClick={() => {
          return dispatch(incrementByAmount(parseInt(inputRef.current?.value ?? '0') || 0))
        }}
      >
        incrementByAmount
      </button>
    </div>
  )
}

export default Counter
