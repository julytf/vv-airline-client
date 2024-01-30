import { FunctionComponent, useEffect, useState } from 'react'
import WizardNavBar from '../../components/NavBar/WizardNavBar'
import { loadStripe } from '@stripe/stripe-js'
import config from '@/config'
import { Elements, PaymentElement } from '@stripe/react-stripe-js'
import Loading from '@/components/Loading/Loading'
import axiosClient from '@/services/api/axios.service'
import Button from '@/components/ui/Button'
import StripePaymentForm from '@/components/Payment/StripePaymentForm'
import { PaymentMethodEnums } from '@/enums/payment.enums'
import PaypalPaymentForm from '@/components/Payment/PaypalPaymentForm'
import PaymentSummaryCard from '@/components/Card/PaymentSummaryCard'

interface PaymentProps {}

const Payment: FunctionComponent<PaymentProps> = () => {
  const [loading, setLoading] = useState(true)
  const [paymentMethod, setPaymentMethod] = useState('')

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <div className=' my-16 grid grid-cols-12 gap-16'>
      <div className='col-span-8 flex flex-col gap-y-8'>
        <div className='border-2 shadow-md rounded-md'>
          <div className='border-b-2 p-4'>Phương thức thanh toán</div>
          <div>
            <label>
              <div className='p-4 '>
                <input
                  type='radio'
                  checked={paymentMethod === PaymentMethodEnums.CARD}
                  onChange={() => setPaymentMethod(PaymentMethodEnums.CARD)}
                />
                <span className='pl-4'>Credit Card/ Debit Card</span>
              </div>
            </label>
            <div className='mx-4 border-b'></div>
            <label>
              <div className='p-4 '>
                <input
                  type='radio'
                  checked={paymentMethod === PaymentMethodEnums.PAYPAL}
                  onChange={() => setPaymentMethod(PaymentMethodEnums.PAYPAL)}
                />
                <span className='pl-4'>Paypal</span>
              </div>
            </label>
          </div>
        </div>
        <div className='my-8 flex flex-col gap-y-8'>
          {paymentMethod === PaymentMethodEnums.CARD && <StripePaymentForm />}
          {paymentMethod === PaymentMethodEnums.PAYPAL && <PaypalPaymentForm />}
        </div>
      </div>
      <PaymentSummaryCard className='col-span-4' />
    </div>
  )
}

export default Payment
