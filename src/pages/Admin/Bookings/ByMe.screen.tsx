import SmartTable from '@/components/Table/SmartTable'
import Table, { TableData } from '@/components/Table/Table'
import Button from '@/components/ui/Button'
import { FlightType } from '@/enums/flight.enums'
import { PassengerType } from '@/enums/passenger.enums'
import { PaymentStatus } from '@/enums/payment.enums'
import { TicketClass } from '@/enums/ticket.enums'
import IBooking from '@/interfaces/booking/booking.interface'
import IUser from '@/interfaces/user.interface'
import bookingsService from '@/services/bookings.service'
import { route } from '@/utils/helpers'
import { FunctionComponent } from 'react'
import { NavLink } from 'react-router-dom'

interface BookingModelsIndexProps {}

const BookingModelsIndex: FunctionComponent<BookingModelsIndexProps> = () => {
  return (
    <div className='flex flex-wrap p-3 px-6'>
      <div className='w-full max-w-full flex-none'>
        {/* <div className='flex justify-end py-3'>
          <NavLink to={route('/admin/booking-models/create')}>
            <Button>Thêm Máy Bay</Button>
          </NavLink>
        </div> */}
        <SmartTable
          title='Đặt vé'
          subTitle='Danh Sách Đặt vé'
          // data={bookingData}
          FetchDataFnc={bookingsService.getBookingsByMePaginate.bind(bookingsService)}
          queryKey='bookings.byMe'
          renderOptions={[
            {
              field: 'user',
              displayName: 'Người Dùng',
              renderFnc: (value) => {
                return <>{(value as IUser)?.firstName ?? '---'}</>
              },
            },
            {
              field: 'flightsInfo',
              displayName: 'Chuyến Bay',
              renderFnc: (value, data) => {
                const booking = data as unknown as IBooking

                return (
                  <>
                    <div>
                      Đi:{' '}
                      <span>
                        {booking.flightsInfo[FlightType.OUTBOUND]?.flight?.flightRoute.departureAirport?.IATA} -{' '}
                        {booking.flightsInfo[FlightType.OUTBOUND]?.flight?.flightRoute.arrivalAirport?.IATA}
                      </span>
                    </div>
                    {booking.isRoundtrip && (
                      <div>
                        Về:{' '}
                        <span>
                          {booking.flightsInfo[FlightType.INBOUND]?.flight?.flightRoute.departureAirport?.IATA} -{' '}
                          {booking.flightsInfo[FlightType.INBOUND]?.flight?.flightRoute.arrivalAirport?.IATA}
                        </span>
                      </div>
                    )}
                  </>
                )
              },
            },
            {
              field: 'totalPrice',
              displayName: 'Tổng Tiền',
              renderFnc: (value) => {
                return <>{(value as number)?.toLocaleString()} vnđ</>
              },
            },
            {
              field: 'payment',
              displayName: 'Trạng Thái thanh toán',
              renderFnc: (value) => {
                return <>{(value as { status: PaymentStatus }).status}</>
              },
            },
            {
              field: '',
              displayName: 'Hành Khách',
              renderFnc: (value, data) => {
                const booking = data as unknown as IBooking
                return (
                  <>
                    <div>Người lớn: {booking.passengersQuantity[PassengerType.ADULT]}</div>
                    <div>Trẻ em: {booking.passengersQuantity[PassengerType.CHILD]}</div>
                  </>
                )
              },
            },
            {
              field: '',
              displayName: 'Chi Tiết',
              renderFnc: (value, data?: TableData) => {
                return (
                  <div className='flex gap-x-4'>
                    <NavLink to={route('/admin/bookings/:id', { params: { id: String(data?._id) } })}>
                      <span className='p-2'>
                        <i className='fa-regular fa-circle-info'></i>
                      </span>
                    </NavLink>
                  </div>
                )
              },
            },
          ]}
        />
      </div>
    </div>
  )
}

export default BookingModelsIndex
