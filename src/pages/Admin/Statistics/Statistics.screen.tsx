import { FunctionComponent, useEffect, useState } from 'react'
import { Chart } from 'react-google-charts'
import RevenueStatistics from './RevenueStatistics'
import TicketStatistics from './TicketStatistics'
import { format, subYears } from 'date-fns'
import IBooking from '@/interfaces/booking/booking.interface'
import bookingsService from '@/services/bookings.service'
import Radio from './Radio'

interface StatisticsProps {}

const Statistics: FunctionComponent<StatisticsProps> = () => {
  const [from, setFrom] = useState<Date>(subYears(new Date(), 1))
  const [to, setTo] = useState<Date>(new Date())

  const [revenueBy, setRevenueBy] = useState<'month' | 'day'>('month')

  const [bookings, setBookings] = useState<IBooking[]>([])

  useEffect(() => {
    bookingsService.getByTimeRange({ from: from.toString(), to: to.toString() }).then((data) => {
      setBookings(
        (data as IBooking[]).filter(
          (booking) =>
            new Date(booking?.payment?.paidAt || '') <= new Date(to) &&
            new Date(booking?.payment?.paidAt || '') >= new Date(from),
        ),
      )
    })
  }, [from, to])

  const total = bookings.reduce((total, booking) => total + booking.totalPrice, 0)

  return (
    <div className='flex flex-col gap-4 p-8'>
      <div className='w-full overflow-hidden rounded-md bg-white'>
        <div className='flex justify-between gap-2 p-8'>
          <div className='col-span-4'>
            <span>Tổng doanh thu</span>
            <div>
              <span className='text-4xl font-bold'>{total?.toLocaleString()}</span>
              <span>vnđ</span>
            </div>
          </div>
          <div className='col-span-4 flex items-end gap-2'>
            <div className='flex flex-col gap-2'>
              <span>Từ</span>
              <div className='flex gap-2'>
                <input
                  type={revenueBy === 'day' ? 'date' : 'month'}
                  value={format(from, revenueBy === 'day' ? 'yyyy-MM-dd' : 'yyyy-MM')}
                  onChange={(e) => setFrom(new Date(e.target.value))}
                  className='block w-full rounded-md border-0 bg-transparent p-3 py-1.5 text-sm leading-6 text-gray-900 outline-primary ring-1  ring-inset ring-gray-300 placeholder:text-gray-400'
                />
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <span>đến</span>
              <div className='flex gap-2'>
                <input
                  type={revenueBy === 'day' ? 'date' : 'month'}
                  value={format(to, revenueBy === 'day' ? 'yyyy-MM-dd' : 'yyyy-MM')}
                  onChange={(e) => setTo(new Date(e.target.value))}
                  className='block w-full rounded-md border-0 bg-transparent p-3 py-1.5 text-sm leading-6 text-gray-900 outline-primary ring-1  ring-inset ring-gray-300 placeholder:text-gray-400'
                />
              </div>
            </div>
          </div>
          <div className='col-span-4 flex flex-col items-end'>
            <div className='flex flex-col gap-2'>
              <span>Doanh thu theo</span>
              <div className='flex gap-2'>
                <Radio
                  name='revenueBy'
                  displayName='Tháng'
                  value='month'
                  checked={revenueBy === 'month'}
                  onChange={() => setRevenueBy('month')}
                />
                <Radio
                  name='revenueBy'
                  displayName='Ngày'
                  value='day'
                  checked={revenueBy === 'day'}
                  onChange={() => setRevenueBy('day')}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-12'></div>
        <RevenueStatistics bookings={bookings} revenueBy={revenueBy} from={from} to={to} />
      </div>
      <TicketStatistics bookings={bookings} />
    </div>
  )
}

export default Statistics
