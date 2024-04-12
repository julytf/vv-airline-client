import Pagination from '@/components/Pagination/Pagination'
import IBooking from '@/interfaces/booking/booking.interface'
import bookingsService from '@/services/bookings.service'
import { route } from '@/utils/helpers'
import classNames from 'classnames'
import { FunctionComponent, useState } from 'react'
import { useQuery } from 'react-query'
import { NavLink } from 'react-router-dom'
import Booking from './Booking'
import Loading from '@/components/ui/Loading'

interface IndexProps {
  className?: string
}

const Index: FunctionComponent<IndexProps> = (props) => {
  const [page, setPage] = useState<number>(() => Number(new URLSearchParams(location.search).get('page')) || 1)

  const { data, isLoading } = useQuery({
    queryKey: ['bookings', { page }],
    queryFn: () => bookingsService.getBookingsPaginate({ page, perPage: 12 }),
  })

  const { docs: bookings = [], lastPage } = (data as { docs: IBooking[]; lastPage: number }) || {}
  console.log('bookings', bookings)

  if (isLoading) return <Loading />

  if (!bookings.length) return <div className='text-center text-2xl'>Bạn chưa đặt chuyến bay nào</div>

  return (
    <div className={classNames('mx-auto max-w-3xl px-6 py-8 md:px-12 xl:px-6', props.className)}>
      <div className='relative mb-12 space-y-2 text-center'>
        <h2 className='text-3xl font-bold text-gray-800 md:text-4xl dark:text-white'>Chuyến Bay Đã Đặt</h2>
        <p className='text-gray-600 lg:mx-auto lg:w-6/12 dark:text-gray-300'></p>
      </div>
      <div className='mx-auto flex max-w-5xl  flex-col gap-8'>
        {bookings.map((booking, index) => (
          <NavLink key={index} to={route('/bookings/:id', { params: { id: booking._id! } })} className='col-span-3'>
            <Booking booking={booking}/>
          </NavLink>
        ))}
      </div>
      <div className='flex justify-end py-8'>
        <Pagination page={page} lastPage={lastPage} onPageChange={setPage} />
      </div>
    </div>
  )
}

export default Index
