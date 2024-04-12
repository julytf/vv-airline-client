import { createContext, FunctionComponent, useState } from 'react'
import EmailInput from './EmailInput'
import OTPInput from './OTPInput'
import ResetPassword from './ResetPassword'
import PasswordRecovered from './PasswordRecoverd'

export const ForgotPasswordContext = createContext<{
  email: string | null
  setEmail: (email: string | null) => void
  OTP: string | null
  setOTP: (OTP: string | null) => void
  page: string | null
  setPage: (page: 'email' | 'otp' | 'reset' | 'recovered') => void
}>({
  email: null,
  setEmail: () => {},
  OTP: null,
  setOTP: () => {},
  page: null,
  setPage: () => {},
})

interface ForgotPasswordProps {}

const ForgotPassword: FunctionComponent<ForgotPasswordProps> = () => {
  const [email, setEmail] = useState<string | null>(null)
  const [OTP, setOTP] = useState<string | null>(null)
  const [page, setPage] = useState<'email' | 'otp' | 'reset' | 'recovered'>('email')

  return (
    <ForgotPasswordContext.Provider value={{ email, setEmail, OTP, setOTP, page, setPage }}>
      {page === 'email' && <EmailInput />}
      {page === 'otp' && <OTPInput />}
      {page === 'reset' && <ResetPassword />}
      {page === 'recovered' && <PasswordRecovered />}
    </ForgotPasswordContext.Provider>
  )
}

export default ForgotPassword
