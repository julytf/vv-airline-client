// import { lazy, Suspense } from 'react'
// import { AuthContextProvider } from 'utils/AuthContext'
// import { GlobalContextProvider } from 'utils/GlobalContext'

import { Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'

// const AuthMiddleware = lazy(() => import('middlewares/Auth'))
// const Home = lazy(() => import('pages/Home'))

function FallbackLoading() {
  return <p>Loading...</p>
}
const router = createBrowserRouter([
  {
    path: '',
    element: (
      <Suspense fallback={<FallbackLoading />}>
        {/* <AuthContextProvider>
          <GlobalContextProzvider> */}
        {/* <MainLayout /> */}
        {/* </GlobalContextProzvider>
        </AuthContextProvider> */}
      </Suspense>
    ),
    // {
    //   path: 'books',
    //   children: [
    //     { path: '', element: <Books /> },
    //     { path: ':bookId', element: <BookDetail /> },
    //   ],
    // },
  },
])
export default router
