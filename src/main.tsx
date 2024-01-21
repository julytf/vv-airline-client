import React from 'react'
import ReactDOM from 'react-dom/client'

import { RouterProvider } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './services/state/store.ts'
import Counter from './components/Counter.tsx'
import router from './routes/index.tsx'
import { route } from './utils/helpers.ts'

import './base.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <ReduxProvider store={store}>
    <RouterProvider router={router} />
    {/* <Counter></Counter> */}
  </ReduxProvider>,
  // </React.StrictMode>
)
