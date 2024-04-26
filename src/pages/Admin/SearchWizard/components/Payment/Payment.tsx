import { FunctionComponent, useEffect, useState } from 'react'
import Loading from '@/components/ui/Loading'
import PaymentSummaryCard from '@/components/Card/PaymentSummaryCard'
import { PassengerType } from '@/enums/passenger.enums'
import { FlightType } from '@/enums/flight.enums'
import { FlightLegType } from '@/enums/flightLeg.enums'
import bookingService from '@/services/booking.service'
import { useSearchWizard } from '@/contexts/SearchWizard.context'
import classNames from 'classnames'
import paymentService from '@/services/payment.service'
import { useNavigate } from 'react-router'
import { route } from '@/utils/helpers'

interface PaymentProps {}

const Payment: FunctionComponent<PaymentProps> = () => {
  const navigate = useNavigate()

  const { data } = useSearchWizard()

  const [isLoading, setIsLoading] = useState(true)
  const [bookingId, setBookingId] = useState('')
  const [clientSecret, setClientSecret] = useState('')

  useEffect(() => {
    bookingService
      .createTempBooking({
        searchData: {
          departureAirportIATA: data.searchData.departureAirportIATA,
          arrivalAirportIATA: data.searchData.arrivalAirportIATA,

          departureDate: data.searchData.departureDate,
          returnDate: data.searchData.returnDate,

          isRoundTrip: data.searchData.isRoundTrip,

          passengersQuantity: data.searchData.passengersQuantity,
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
                ticketClass: data.flightsData[FlightType.INBOUND]!.ticketClass,
                ticketType: data.flightsData[FlightType.INBOUND]!.ticketType,
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
        // paymentService.getPaymentIntent(booking._id).then((paymentIntent) => {
        //   console.log(paymentIntent)
        //   setClientSecret(paymentIntent.client_secret)
        //   // setLoading(false)
        // })
      })
  }, [])

  const confirmBooking = () => {
    paymentService.paymentSuccessByStaff(bookingId).then((data) => {
      
      navigate(route('/admin/bookings/:id', { params: { id: bookingId } }))
    })
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className=' my-16 grid grid-cols-12 gap-16'>
      <div className='col-span-7 flex flex-col gap-y-8'>
        {isLoading && <Loading />}
        <div
          className={classNames('text-center', {
            hidden: isLoading,
          })}
        >
          <button
            onClick={confirmBooking}
            className='rounded-md border-2 border-green-300 bg-green-100 p-4 text-center shadow-md active:scale-95'
          >
            <div className='bold text-3xl'>Xác Nhận Đặt Vé</div>
            <div>( đã nhận tiền mặt của khách hàng )</div>
          </button>
        </div>
      </div>
      <PaymentSummaryCard className='col-span-5' seatsData={data.seatsData} />
    </div>
  )
}

export default Payment
