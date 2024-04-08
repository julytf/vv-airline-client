import { FunctionComponent } from 'react'

interface BookingProps {}

const Booking: FunctionComponent<BookingProps> = () => {
  return (
    <div className='mx-auto grid grid-cols-12 rounded border-2 shadow-md hover:shadow-lg'>
      <div className='col-span-9 flex flex-col justify-between gap-y-4 border-r p-8'>
        <div className=' flex justify-between'>
          <div className='flex flex-col items-center justify-center'>
            <span className='bold text-2xl'>HAN</span>
            <span className=''>16:30 30/4/2024</span>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <i className='fa-duotone fa-plane'></i>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <span className='bold text-2xl'>HAN</span>
            <span className=''>16:30 30/4/2024</span>
          </div>
        </div>
        <div className=' flex justify-between'>
          <div className='flex flex-col items-center justify-center'>
            <span className='bold text-2xl'>HAN</span>
            <span className=''>16:30 30/4/2024</span>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <i className='fa-duotone fa-plane'></i>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <span className='bold text-2xl'>HAN</span>
            <span className=''>16:30 30/4/2024</span>
          </div>
        </div>
      </div>
      <div className='col-span-3 p-8'>
        <div>3 Người lớn</div>
        <div>2 Trẻ em</div>
      </div>
    </div>
  )
}

export default Booking
