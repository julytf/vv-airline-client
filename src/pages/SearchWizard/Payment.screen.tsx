import { FunctionComponent, useEffect, useState } from 'react'
import WizardNavBar from '../../components/NavBar/WizardNavBar'
import { loadStripe } from '@stripe/stripe-js'
import config from '@/config'
import { Elements, PaymentElement } from '@stripe/react-stripe-js'
import Loading from '@/components/Loading/Loading'
import axiosClient from '@/services/api/axios.service'
import Button from '@/components/ui/Button'

const stripePromise = loadStripe(config.stripe.publicKey)

interface PaymentProps {}

const Payment: FunctionComponent<PaymentProps> = () => {
  // console.log('pk', config.stripe.publicKey)

  const [clientSecret, setClientSecret] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axiosClient.get('/payment/intents').then((res) => {
      console.log(res)
      setClientSecret(res.data.data.paymentIntent.client_secret)
      setLoading(false)
    })
  }, [])

  const options = {
    clientSecret,
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className='mx-36 my-16 flex flex-col gap-y-8'>
      <div className='w-96 my-16 flex flex-col gap-y-8'>
        <Elements stripe={stripePromise} options={options}>
          <form className='flex flex-col gap-y-8'>
            <PaymentElement />
            <Button>Submit</Button>
          </form>
        </Elements>
      </div>
    </div>
  )
}

export default Payment
