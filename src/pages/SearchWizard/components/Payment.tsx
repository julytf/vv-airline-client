import { FunctionComponent, useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import config from '@/config'
import { Elements, PaymentElement } from '@stripe/react-stripe-js'
import Loading from '@/components/Loading/Loading'
import axiosClient from '@/services/api/axios.service'
import Button from '@/components/ui/Button'
import StripePaymentForm from '@/components/Payment/StripePaymentForm'
import { PaymentMethod } from '@/enums/payment.enums'
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

  const testSuccessPayment = async () => {
    // const response = await axiosClient.post('/payment/success', {
    //   amount: 100000,
    //   currency: 'usd',
    // })
    // console.log(response)
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className=' my-16 grid grid-cols-12 gap-16'>
      <div className='col-span-8 flex flex-col gap-y-8'>
        <button onClick={testSuccessPayment} className='text-2xl font-bold border-2 rounded-md p-8 py-4 active:scale-95'>
          Test Success Payment
        </button>
        {/* <div className='rounded-md border-2 shadow-md'>
          <div className='border-b-2 p-4'>Phương thức thanh toán</div>
          <div>
            <label>
              <div className='p-4 '>
                <input
                  type='radio'
                  checked={paymentMethod === PaymentMethod.CARD}
                  onChange={() => setPaymentMethod(PaymentMethod.CARD)}
                />
                <span className='pl-4'>Credit Card/ Debit Card</span>
              </div>
            </label>
            <div className='mx-4 border-b'></div>
            <label>
              <div className='p-4 '>
                <input
                  type='radio'
                  checked={paymentMethod === PaymentMethod.PAYPAL}
                  onChange={() => setPaymentMethod(PaymentMethod.PAYPAL)}
                />
                <span className='pl-4'>Paypal</span>
              </div>
            </label>
          </div>
        </div>
        <div className='my-8 flex flex-col gap-y-8'>
          {paymentMethod === PaymentMethod.CARD && <StripePaymentForm />}
          {paymentMethod === PaymentMethod.PAYPAL && <PaypalPaymentForm />}
        </div> */}
        <PaypalPaymentForm />
      </div>
      <PaymentSummaryCard className='col-span-4' />
    </div>
  )
}

export default Payment