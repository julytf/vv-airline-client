import React, { FunctionComponent, useEffect } from 'react'
import ReactDOM from 'react-dom/client'

import { RouterProvider, useLocation } from 'react-router-dom'
import { Provider as ReduxProvider, useDispatch } from 'react-redux'
import { AppDispatch, store } from './services/state/store.ts'
import Counter from './components/Counter.tsx'
import { route } from './utils/helpers.ts'
import * as auth from '@/services/state/auth/authSlice'

import './base.scss'
import authService from './services/auth.service.ts'
import userRouter from './routers/user.router.tsx'
import adminRouter from './routers/admin.router.tsx'

interface AppProps {}

const App: FunctionComponent<AppProps> = () => {
  // console.log(window.location.pathname)
  // console.log(window.location.pathname.startsWith('/admin'))
  if (window.location.pathname.startsWith('/admin')) return <AdminApp />

  return <UserApp />
}

interface UserAppProps {}

const UserApp: FunctionComponent<UserAppProps> = () => {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    ;(async () => {
      const tokenName = 'userAccessToken'
      const accessToken = localStorage.getItem(tokenName)
      if (!accessToken)
        return dispatch(auth.initialize({ isAuthenticated: false, user: null, accessToken: null, tokenName }))

      try {
        const user = await authService.getProfile(accessToken)
        dispatch(auth.initialize({ isAuthenticated: true, user, accessToken: accessToken, tokenName }))
      } catch (error) {
        dispatch(auth.initialize({ isAuthenticated: false, user: null, accessToken: null, tokenName }))
      }
    })()
  }, [])
  return (
    <>
      <RouterProvider router={userRouter} />
    </>
  )
}

interface AdminAppProps {}

const AdminApp: FunctionComponent<AdminAppProps> = () => {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    ;(async () => {
      const tokenName = 'adminAccessToken'
      const accessToken = localStorage.getItem(tokenName)
      if (!accessToken)
        return dispatch(auth.initialize({ isAuthenticated: false, user: null, accessToken: null, tokenName }))

      try {
        const user = await authService.getProfile(accessToken)
        dispatch(auth.initialize({ isAuthenticated: true, user, accessToken: accessToken, tokenName }))
      } catch (error) {
        dispatch(auth.initialize({ isAuthenticated: false, user: null, accessToken: null, tokenName }))
      }
    })()
  }, [])
  return (
    <>
      <RouterProvider router={adminRouter} />
    </>
  )
}

export default App
