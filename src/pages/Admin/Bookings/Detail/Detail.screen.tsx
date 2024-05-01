import Loading from '@/components/ui/Loading'
import Button from '@/components/ui/Button'
import { UserGender, UserRole } from '@/enums/user.enums'
import IAddress from '@/interfaces/address/address.interface'
import ICountry from '@/interfaces/address/country.interface'
import addressService from '@/services/address.service'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { FunctionComponent, useEffect, useState } from 'react'
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'
import IBooking from '@/interfaces/booking/booking.interface'
import bookingsService from '@/services/bookings.service'
import { FlightType } from '@/enums/flight.enums'
import { FlightLegType } from '@/enums/flightLeg.enums'
import ErrorText from '@/components/ui/ErrorText'
import Flight from './Flight'
import PassengersInformation from './PassengersInformation'
import SeatsTable from './SeatsTable'
import { NavLink } from 'react-router-dom'
import PrintModal from './PrintModal'
import ReactModal from 'react-modal'

interface DetailBookingProps {}

const DetailBooking: FunctionComponent<DetailBookingProps> = () => {
  const navigate = useNavigate()
  const { id } = useParams() as { id: string }

  const [isLoading, setIsLoading] = useState(true)
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false)

  const [booking, setBooking] = useState<IBooking | null>(null)

  const totalPassengers = booking?.passengers.length || 0

  const totalSeatsPrice =
    (booking?.flightsInfo[FlightType.OUTBOUND].price || 0) + (booking?.flightsInfo[FlightType.INBOUND]?.price || 0)

  const totalSurcharge = [
    ...(booking?.flightsInfo[FlightType.OUTBOUND].reservations.map(
      (obj) => obj[FlightLegType.DEPARTURE]?.surcharge || 0,
    ) || []),
    ...(booking?.flightsInfo[FlightType.OUTBOUND].reservations.map(
      (obj) => obj[FlightLegType.TRANSIT]?.surcharge || 0,
    ) || []),
    ...(booking?.flightsInfo[FlightType.INBOUND]?.reservations.map(
      (obj) => obj[FlightLegType.DEPARTURE]?.surcharge || 0,
    ) || []),
    ...(booking?.flightsInfo[FlightType.INBOUND]?.reservations.map(
      (obj) => obj[FlightLegType.TRANSIT]?.surcharge || 0,
    ) || []),
  ].reduce((acc, cur) => acc + cur, 0)

  useEffect(() => {
    bookingsService.getBooking(id).then((data) => {
      setBooking(data)
      setIsLoading(false)
    })
  }, [])

  const onPrintButtonClick = () => {
    setIsPrintModalOpen(true)
  }

  if (isLoading) {
    return <Loading />
  }

  if (!booking?.flightsInfo[FlightType.OUTBOUND].flight || !booking?.flightsInfo[FlightType.OUTBOUND].ticketClass)
    return <ErrorText />

  return (
    <>
      <div className='p-6'>
        <div className='mx-auto w-full max-w-6xl rounded-md bg-white p-8'>
          <div className='text-center text-3xl font-bold'>Thông tin Chuyến bay đã đặt</div>
          <div className='mx-auto max-w-4xl'>
            <div className=''>
              <div className='flex justify-between p-4 text-xl '>
                <span className='bold'>Thông tin Liên hệ</span>
                <span>
                  Mã đặt chỗ:
                  <span className='bold ml-2'>{booking.pnr}</span>
                </span>
              </div>
              {/* <div>
            Họ Tên: {booking.passengers[0].lastName} {booking.passengers[0].firstName}
          </div> */}
              <div>Số điện thoại: {booking.contactInfo.phoneNumber}</div>
              <div>email: {booking.contactInfo.email}</div>
            </div>
          </div>
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
          <div className='mx-auto mb-4 mt-16 flex max-w-4xl justify-end gap-4'>
            <button onClick={onPrintButtonClick} className='rounded-md border-2 p-4 active:scale-95'>
              In Vé
            </button>
            <NavLink
              to={`/admin/bookings/${id}/refund`}
              state={{
                pnr: booking.pnr,
                email: booking.contactInfo.email,
              }}
            >
              <button className='rounded-md border-2 p-4 active:scale-95'>Hoàn Vé</button>
            </NavLink>
          </div>
        </div>
      </div>
      {isPrintModalOpen && (
        <ReactModal
          isOpen={isPrintModalOpen}
          onRequestClose={() => setIsPrintModalOpen(false)}
          // ariaHideApp={false}
          style={{
            overlay: {
              background: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1000,
              padding: '32px'
            },
          }}
        >
          <PrintModal booking={booking} />
        </ReactModal>
      )}
    </>
  )
}

export default DetailBooking
