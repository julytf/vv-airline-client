import { FlightType } from '@/enums/flight.enums'
import { FlightLegType } from '@/enums/flightLeg.enums'
import { PaymentStatus } from '@/enums/payment.enums'
import IBooking from '@/interfaces/booking/booking.interface'
import { FunctionComponent } from 'react'
import Chart from 'react-google-charts'

interface TicketStatisticsProps {
  bookings: IBooking[]
}

const TicketStatistics: FunctionComponent<TicketStatisticsProps> = ({ bookings }) => {
  const getDataFromBooking = (booking: IBooking) => {
    const passengerQuantity = booking?.passengers?.length || 0

    const totalPrice = booking.totalPrice
    let totalQuantity = 0
    let totalRefundQuantity = 0

    booking?.flightsInfo[FlightType.OUTBOUND]?.reservations.forEach((reservation) => {
      const quantity = reservation[FlightLegType.TRANSIT] ? 2 : 1

      totalQuantity += quantity
      if (reservation.paymentStatus === PaymentStatus.REFUNDED) {
        totalRefundQuantity += quantity
      }
    })

    return {
      totalPrice,
      totalQuantity,
      totalRefundQuantity,
    }
  }

  const data = bookings.reduce<{ totalPrice: number; totalQuantity: number; totalRefundQuantity: number }>(
    (data, booking) => {
      const newData = getDataFromBooking(booking)

      data.totalPrice += newData.totalPrice
      data.totalQuantity += newData.totalQuantity
      data.totalRefundQuantity += newData.totalRefundQuantity

      return data
    },
    { totalPrice: 0, totalQuantity: 0, totalRefundQuantity: 0 },
  )

  return (
    <div className='grid w-full grid-cols-12  gap-2 overflow-hidden rounded-md bg-white p-4'>
      <div className='col-span-4 flex flex-col items-center justify-center'>
        <div>
          <span>Tổng số Vé đã đặt</span>
          <div>
            <span className='text-4xl font-bold'>{data.totalQuantity?.toLocaleString()}</span>
            <span>Vé</span>
          </div>
        </div>
      </div>
      <div className='col-span-4 flex flex-col items-center justify-center'>
        <div>
          <span>Số tiền trung bình mỗi vé</span>
          <div>
            <span className='text-4xl font-bold'>{(data.totalPrice / data.totalQuantity)?.toLocaleString()}</span>
            <span>vnđ</span>
          </div>
        </div>
      </div>
      <div className='col-span-4'>
        <span>Tỉ lệ hoàn vé</span>
        <div>
          <Chart
            chartType='PieChart'
            data={[
              ['Tình trạng', 'Số lượng'],
              ['Không hoàn', data.totalQuantity - data.totalRefundQuantity],
              ['Đã hoàn', data.totalRefundQuantity],
            ]}
            width='100%'
            height='200px'
            legendToggle
            options={{
              //   legend: 'none',
              pieSliceText: '',
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default TicketStatistics
