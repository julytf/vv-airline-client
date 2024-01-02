import React from 'react'
import ReactDOM from 'react-dom/client'

import './main.scss'
import { RouterProvider } from 'react-router-dom'
import router from './routes/index.tsx'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './services/state/store.ts'
import Counter from './components/Counter.tsx'

// TODO: Remove this fallback loading
function FallbackLoading() {
  return <p>Loading...</p>
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      {/* <RouterProvider router={router} fallbackElement={<FallbackLoading />} /> */}
      <Counter></Counter>
    </ReduxProvider>
  </React.StrictMode>,
)
