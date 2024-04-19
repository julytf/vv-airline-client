import Loading from '@/components/ui/Loading'
import { FlightType } from '@/enums/flight.enums'
import { FlightLegType } from '@/enums/flightLeg.enums'
import IBooking from '@/interfaces/booking/booking.interface'
import bookingsService from '@/services/bookings.service'
import classNames from 'classnames'
import { differenceInHours, differenceInMinutes, format } from 'date-fns'
import { FunctionComponent, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Flight from './Flight'
import ErrorText from '@/components/ui/ErrorText'
import PassengersInformation from './PassengersInformation'
import SeatsTable from './SeatsTable'

interface DetailProps {}

const Detail: FunctionComponent<DetailProps> = () => {
  const { id } = useParams<{ id: string }>()

  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [booking, setBooking] = useState<IBooking | null>(null)
  console.log(booking)

  const totalPassengers = booking?.passengers.length || 0

  const totalSeatsPrice =
    (booking?.flightsInfo[FlightType.OUTBOUND].price || 0) + (booking?.flightsInfo[FlightType.INBOUND]?.price || 0)

  const totalSurcharge = [
    ...(booking?.flightsInfo[FlightType.OUTBOUND].reservations[FlightLegType.DEPARTURE].map((obj) => obj.surcharge) ||
      []),
    ...(booking?.flightsInfo[FlightType.OUTBOUND].reservations[FlightLegType.TRANSIT].map((obj) => obj.surcharge) ||
      []),
    ...(booking?.flightsInfo[FlightType.INBOUND]?.reservations[FlightLegType.DEPARTURE].map((obj) => obj.surcharge) ||
      []),
    ...(booking?.flightsInfo[FlightType.INBOUND]?.reservations[FlightLegType.TRANSIT].map((obj) => obj.surcharge) ||
      []),
  ].reduce((acc, cur) => acc + cur, 0)

  useEffect(() => {
    setIsLoading(true)
    bookingsService.getBooking(id!).then((data) => {
      setBooking(data)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) {
    return <Loading />
  }

  if (!booking?.flightsInfo[FlightType.OUTBOUND].flight || !booking?.flightsInfo[FlightType.OUTBOUND].ticketClass)
    return <ErrorText />

  return (
    <div className='mx-auto my-8 w-full max-w-6xl'>
      <div className='text-center text-3xl font-bold'>Thông tin Chuyến bay đã đặt</div>
      <div className='my-8 flex  flex-col items-center justify-center gap-8'>
        <Flight
          flightInfo={{
            flight: booking?.flightsInfo[FlightType.OUTBOUND].flight,
            ticketClass: booking?.flightsInfo[FlightType.OUTBOUND].ticketClass,
            ticketType: booking?.flightsInfo[FlightType.OUTBOUND].ticketType,
            price: booking?.flightsInfo[FlightType.OUTBOUND].price,
          }}
        />
        {booking?.flightsInfo[FlightType.INBOUND] && (
          <Flight
            flightInfo={{
              flight: booking?.flightsInfo[FlightType.INBOUND].flight,
              ticketClass: booking?.flightsInfo[FlightType.INBOUND].ticketClass,
              ticketType: booking?.flightsInfo[FlightType.INBOUND].ticketType,
              price: booking?.flightsInfo[FlightType.INBOUND].price,
            }}
          />
        )}
      </div>
      <div className='mx-auto max-w-4xl'>
        <div className=''>
          <div className='p-4 text-xl font-bold'>Thông tin Liên hệ</div>
          {/* <div>
            Họ Tên: {booking.passengers[0].lastName} {booking.passengers[0].firstName}
          </div> */}
          <div>Số điện thoại: {booking.contactInfo.phoneNumber}</div>
          <div>email: {booking.contactInfo.email}</div>
        </div>
      </div>
      <div className='mx-auto max-w-4xl'>
        <PassengersInformation passengers={booking.passengers} />
      </div>
      <div className='mx-auto max-w-4xl'>
        <SeatsTable passengers={booking.passengers} flightsInfo={booking.flightsInfo} />
      </div>
      <div className='mx-auto max-w-4xl'>
        <div className=''>
          <div className='p-4 text-xl font-bold'>Chi phí</div>
          <div>
            Vé Máy bay: {totalSeatsPrice.toLocaleString()} vnđ x {totalPassengers} ={' '}
            {(totalSeatsPrice * totalPassengers).toLocaleString()} vnđ
          </div>
          <div>Phí Ghế: {totalSurcharge.toLocaleString()} vnđ</div>
          <div>
            {' '}
            Tổng: <span className='bold text-2xl'>{booking.totalPrice.toLocaleString()}</span> vnđ
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail
