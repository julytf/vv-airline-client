import { Elements, PaymentElement } from '@stripe/react-stripe-js'
import Loading from '../Loading/Loading'
import { loadStripe } from '@stripe/stripe-js'
import config from '@/config'
import { FunctionComponent, useEffect, useState } from 'react'
import axiosClient from '@/services/api/axios.service'
import Button from '../ui/Button'
import classNames from 'classnames'

const stripePromise = loadStripe(config.stripe.publicKey)

interface StripePaymentFormProps {
  className?: string
}

const StripePaymentForm: FunctionComponent<StripePaymentFormProps> = ({ className }) => {
  const [clientSecret, setClientSecret] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axiosClient.get('/payment/intents').then((res) => {
      console.log(res)
      setClientSecret(res.data.data.paymentIntent.client_secret)
      // setLoading(false)
    })
  }, [])

  //   useEffect(() => {
  //     setTimeout(() => {
  //       setLoading(false)
  //     }, 500)
  //   }, [])

  const options = {
    clientSecret,
  }

  return (
    <>
      {loading && <Loading />}
      {clientSecret && (
        <div
          className={classNames(className, {
            hidden: loading,
          })}
        >
          <Elements stripe={stripePromise} options={options}>
            <form className='flex flex-col gap-y-8'>
              <PaymentElement onReady={() => setLoading(false)} />
              <Button>Submit</Button>
            </form>
          </Elements>
        </div>
      )}
    </>
  )
}

export default StripePaymentForm
