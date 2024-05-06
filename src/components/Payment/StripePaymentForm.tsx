import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import Loading from '../ui/Loading'
import { loadStripe } from '@stripe/stripe-js'
import config from '@/config'
import { FormEventHandler, FunctionComponent, useEffect, useState } from 'react'
import axiosClient from '@/services/api/axios.service'
import Button from '../ui/Button'
import classNames from 'classnames'
import paymentService from '@/services/payment.service'
import { useNavigate } from 'react-router'
import { route } from '@/utils/helpers'
import { SpinningCircle } from '../Icons'
import IBooking from '@/interfaces/booking/booking.interface'

interface StripePaymentFormProps {
  bookingId: string
  className?: string
}

const StripePaymentForm: FunctionComponent<StripePaymentFormProps> = ({ bookingId, className }) => {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true)
  const [isPaymentInProgress, setIsPaymentInProgress] = useState(false)

  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }
    setIsPaymentInProgress(true)

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: undefined,
      redirect: 'if_required',
    })

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message)
    } else {
      const booking: IBooking = await paymentService.paymentSuccess(bookingId)
      navigate(route(`/bookings/${bookingId}`), {
        state: { pnr: booking.pnr, email: booking.contactInfo.email },
      })
    }
    setIsPaymentInProgress(false)
  }

  return (
    <>
      {isLoading && <Loading />}
      {
        <div
          className={classNames(className, {
            hidden: isLoading,
          })}
        >
          {/*  <Elements stripe={stripePromise} options={options}> */}
          <form onSubmit={handleSubmit} className='flex flex-col gap-y-8'>
            <PaymentElement onReady={() => setIsLoading(false)} />
            <Button disabled={isPaymentInProgress}>{isPaymentInProgress ? <SpinningCircle /> : 'Thanh Toán'}</Button>
          </form>
          {/* </Elements> */}
        </div>
      }
    </>
  )
}

export default StripePaymentForm
