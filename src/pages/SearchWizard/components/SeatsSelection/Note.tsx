import { SeatIcon } from '@/components/Icons'
import { FunctionComponent } from 'react'

interface NoteProps {}

const Note: FunctionComponent<NoteProps> = () => {
  return (
    <div className='col-span-6 flex flex-col gap-y-2'>
      <div className='mb-2 text-lg'>Chú Thích</div>
      <div className='flex justify-between'>
        <div className='flex '>
          <SeatIcon />
          <span className='ml-2'>Ghế không còn trống</span>
        </div>
        <div>0 vnđ</div>
      </div>
      <div className='flex justify-between'>
        <div className='flex '>
          <SeatIcon color='blue' />
          <span className='ml-2'>Ghế trống</span>
        </div>
        <div>0 vnđ</div>
      </div>
      <div className='flex justify-between'>
        <div className='flex '>
          <SeatIcon color='orange' />
          <span className='ml-2'>Ghế cửa sổ</span>
        </div>
        <div>0 vnđ</div>
      </div>
      <div className='flex'>
        <div className=' text-red-600'>
          <i className='fa-sharp fa-solid fa-caret-left m-2'></i>
        </div>
        <div className='-scale-x-100 text-red-600'>
          <i className='fa-sharp fa-solid fa-caret-left m-2'></i>
        </div>
        <span className='ml-2'>Cửa</span>
      </div>
    </div>
  )
}

export default Note
