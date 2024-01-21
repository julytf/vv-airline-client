// import { lazy, Suspense } from 'react'
// import { AuthContextProvider } from 'utils/AuthContext'
// import { GlobalContextProvider } from 'utils/GlobalContext'

import { Suspense } from 'react'
import { Navigate, createBrowserRouter } from 'react-router-dom'
import Loading from '../components/Loading/Loading'
import MainLayout from '../layouts/Main.layout'
import HomeScreen from '../pages/Home.screen'
import LoginScreen from '../pages/Auth/Login.screen'
import RegisterScreen from '../pages/Auth/Register.screen'
import PaymentScreen from '../pages/SearchWizard/Payment.screen'
import SearchWizardLayout from '../layouts/SearchWizard.layout'
import FlightsSelectionScreen from '../pages/SearchWizard/FlightsSelection.screen'
import SeatsSelectionScreen from '../pages/SearchWizard/SeatsSelection.screen'
import PassengersInformationScreen from '../pages/SearchWizard/PassengersInformation.screen'

// const AuthMiddleware = lazy(() => import('middlewares/Auth'))
// const Home = lazy(() => import('pages/Home'))

const router = createBrowserRouter([
  {
    path: '',
    element: (
      <Suspense fallback={<Loading />}>
        {/* <AuthContextProvider>
        <GlobalContextProzvider> */}
        <MainLayout />
        {/* </GlobalContextProzvider>
      </AuthContextProvider> */}
      </Suspense>
    ),
    children: [
      {
        path: '',
        element: <HomeScreen />,
      },
      {
        path: 'login',
        element: <LoginScreen />,
      },
      {
        path: 'register',
        element: <RegisterScreen />,
      },
      // { path: 'forgot-password', element: <ForgotPassword /> },
      // { path: 'reset-password', element: <ResetPassword /> },
      // { path: 'profile', element: <Profile /> },
      // { path: 'settings', element: <Settings /> },
      // { path: '404', element: <NotFound /> },
      // { path: '500', element: <ServerError /> },
      // { path: '*', element: <Navigate to='/404' /> },
      {
        path: 'wizard',
        element: <SearchWizardLayout />,
        children: [
          {
            path: 'flights-selection',
            element: <FlightsSelectionScreen />,
          },
          {
            path: 'seats-selection',
            element: <SeatsSelectionScreen />,
          },
          {
            path: 'passengers-information',
            element: <PassengersInformationScreen />,
          },
          {
            path: 'payment',
            element: <PaymentScreen />,
          },

          // {
          //   path: 'passenger-info',
          //   element: <PassengerInfo />,
          // },
          // {
          //   path: 'confirmation',
          //   element: <Confirmation />,
          // },
        ],
      },
    ],
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

// export default routes
