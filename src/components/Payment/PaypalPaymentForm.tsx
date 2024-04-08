import { Elements, PaymentElement } from '@stripe/react-stripe-js'
import Loading from '../ui/Loading'
import { loadStripe } from '@stripe/stripe-js'
import config from '@/config'
import { FunctionComponent, useEffect, useState } from 'react'
import axiosClient from '@/services/api/axios.service'
import Button from '../ui/Button'
import { PayPalButtons, PayPalScriptProvider, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { CreateOrderActions, CreateOrderData, OnApproveActions, OnApproveData } from '@paypal/paypal-js'
import classNames from 'classnames'

interface PaypalPaymentFormProps {
  className?: string
}

const PaypalPaymentForm: FunctionComponent<PaypalPaymentFormProps> = ({ className }) => {
  const [loading, setLoading] = useState(true)

  const initialOptions = {
    clientId: config.paypal.clientId,
    currency: 'USD',
    intent: 'capture',
  }
  useEffect(() => {
    // axiosClient.get('/payment/intents').then((res) => {
    //   console.log(res)
    //   setClientSecret(res.data.data.paymentIntent.client_secret)
    //   setLoading(false)
    // })
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <div className={className}>
      <PayPalScriptProvider options={initialOptions}>
        <Checkout />
      </PayPalScriptProvider>
    </div>
  )
}

interface CheckoutProps {}

const Checkout: FunctionComponent<CheckoutProps> = () => {
  const [loading, setLoading] = useState(true)
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer()
  const [currency, setCurrency] = useState(options.currency)

  const onCreateOrder = (data: CreateOrderData, actions: CreateOrderActions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: '8.99',
          },
        },
      ],
    })
  }

  const onApproveOrder = (data: OnApproveData, actions: OnApproveActions) => {
    return actions!.order!.capture().then((details) => {
      const name = details!.payer!.name!.given_name
      alert(`Transaction completed by ${name}`)
    })
  }

  return (
    <>
      {/* {loading && <Loading />} */}
      <div
        className={classNames({
          // hidden: loading,
        })}
      >
        <PayPalButtons
          style={{ layout: 'vertical' }}
          // fundingSource='card'
          onInit={() => setLoading(false)}
          createOrder={(data, actions) => onCreateOrder(data, actions)}
          onApprove={(data, actions) => onApproveOrder(data, actions)}
        />
      </div>
    </>
  )
}

export default PaypalPaymentForm
