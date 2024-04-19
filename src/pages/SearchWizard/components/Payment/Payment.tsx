import { FunctionComponent, useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import config from '@/config'
import { Elements, PaymentElement } from '@stripe/react-stripe-js'
import Loading from '@/components/ui/Loading'
import axiosClient from '@/services/api/axios.service'
import Button from '@/components/ui/Button'
import StripePaymentForm from '@/components/Payment/StripePaymentForm'
import { PaymentMethod } from '@/enums/payment.enums'
import PaypalPaymentForm from '@/components/Payment/PaypalPaymentForm'
import PaymentSummaryCard from '@/components/Card/PaymentSummaryCard'
import { PassengerType } from '@/enums/passenger.enums'
import { FlightType } from '@/enums/flight.enums'
import { TicketClass } from '@/enums/ticket.enums'
import { UserGender } from '@/enums/user.enums'
import { FlightLegType } from '@/enums/flightLeg.enums'
import bookingService from '@/services/booking.service'
import { useSearchWizard } from '@/contexts/SearchWizard.context'
import classNames from 'classnames'
import paymentService from '@/services/payment.service'

const stripePromise = loadStripe(config.stripe.publicKey)

interface PaymentProps {}

const Payment: FunctionComponent<PaymentProps> = () => {
  const { data } = useSearchWizard()

  const [isLoading, setIsLoading] = useState(true)
  const [bookingId, setBookingId] = useState('')
  const [clientSecret, setClientSecret] = useState('')

  useEffect(() => {}, [])

  const options = {
    clientSecret,
  }

  useEffect(() => {
    bookingService
      .createTempBooking({
        searchData: {
          departureAirportIATA: data.searchData.departureAirportIATA,
          arrivalAirportIATA: data.searchData.arrivalAirportIATA,

          departureDate: data.searchData.departureDate,
          returnDate: data.searchData.returnDate,

          isRoundTrip: data.searchData.isRoundTrip,

          passengers: data.searchData.passengers,
        },
        flightsData: {
          [FlightType.OUTBOUND]: {
            flight: data.flightsData[FlightType.OUTBOUND]!.flight._id,
            ticketClass: data.flightsData[FlightType.OUTBOUND]!.ticketClass,
            ticketType: data.flightsData[FlightType.OUTBOUND]!.ticketType,
            // khong gui price, server tu tinh price
          },
          [FlightType.INBOUND]: !data.searchData.isRoundTrip
            ? null
            : {
                flight: data.flightsData[FlightType.INBOUND]!.flight._id,
                ticketClass: data.flightsData[FlightType.OUTBOUND]!.ticketClass,
                ticketType: data.flightsData[FlightType.OUTBOUND]!.ticketType,
                // khong gui price, server tu tinh price
              },
        },
        passengersData: data.passengersData,
        seatsData: {
          [FlightType.OUTBOUND]: {
            [FlightLegType.DEPARTURE]: {
              [PassengerType.ADULT]: data.seatsData[FlightType.OUTBOUND][FlightLegType.DEPARTURE][
                PassengerType.ADULT
              ].map((seat) => seat._id),
              [PassengerType.CHILD]: data.seatsData[FlightType.OUTBOUND][FlightLegType.DEPARTURE][
                PassengerType.CHILD
              ].map((seat) => seat._id),
            },
            [FlightLegType.TRANSIT]: {
              [PassengerType.ADULT]: data.seatsData[FlightType.OUTBOUND][FlightLegType.TRANSIT][
                PassengerType.ADULT
              ].map((seat) => seat._id),
              [PassengerType.CHILD]: data.seatsData[FlightType.OUTBOUND][FlightLegType.TRANSIT][
                PassengerType.CHILD
              ].map((seat) => seat._id),
            },
          },
          [FlightType.INBOUND]: {
            [FlightLegType.DEPARTURE]: {
              [PassengerType.ADULT]: data.seatsData[FlightType.INBOUND][FlightLegType.DEPARTURE][
                PassengerType.ADULT
              ].map((seat) => seat._id),
              [PassengerType.CHILD]: data.seatsData[FlightType.INBOUND][FlightLegType.DEPARTURE][
                PassengerType.CHILD
              ].map((seat) => seat._id),
            },
            [FlightLegType.TRANSIT]: {
              [PassengerType.ADULT]: data.seatsData[FlightType.INBOUND][FlightLegType.TRANSIT][PassengerType.ADULT].map(
                (seat) => seat._id,
              ),
              [PassengerType.CHILD]: data.seatsData[FlightType.INBOUND][FlightLegType.TRANSIT][PassengerType.CHILD].map(
                (seat) => seat._id,
              ),
            },
          },
        },
      })
      .then((booking) => {
        setBookingId(booking._id)
        setIsLoading(false)
        paymentService.getPaymentIntent(booking._id).then((paymentIntent) => {
          console.log(paymentIntent)
          setClientSecret(paymentIntent.client_secret)
          // setLoading(false)
        })
      })
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className=' my-16 grid grid-cols-12 gap-16'>
      <div className='col-span-8 flex flex-col gap-y-8'>
        {/* <button
          onClick={testSuccessPayment}
          className='rounded-md border-2 p-8 py-4 text-2xl font-bold active:scale-95'
        >
          Test Success Payment
        </button> */}
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
        {/* <PaypalPaymentForm /> */}
        {isLoading && <Loading />}
        {clientSecret && (
          <div
            className={classNames({
              hidden: isLoading,
            })}
          >
            <Elements stripe={stripePromise} options={options}>
              <StripePaymentForm bookingId={bookingId} />
            </Elements>
          </div>
        )}
      </div>
      <PaymentSummaryCard className='col-span-4' seatsData={data.seatsData} />
    </div>
  )
}

export default Payment
