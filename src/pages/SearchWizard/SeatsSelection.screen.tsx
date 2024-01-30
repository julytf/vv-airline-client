import { FunctionComponent, useEffect, useState } from 'react'
import { OccupiedSeatIcon, OpenSeatIcon, PartitionIcon } from '../../components/Icons'
import classNames from 'classnames'
import Loading from '../../components/Loading/Loading'
import WizardBottomNavBar from '../../components/NavBar/WizardBottomNavBar'
import PaymentSummaryCard from '@/components/Card/PaymentSummaryCard'

interface SeatsSelectionProps {}

const SeatsSelection: FunctionComponent<SeatsSelectionProps> = () => {
  const [isValid, setIsValid] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <div className=' my-16 grid grid-cols-12 gap-16'>
      <div className='col-span-8 flex flex-col gap-y-8'>
        <div>
          <div className='pb-8 text-xl font-semibold'>Chọn vị trí ngồi cho chuyến bay của bạn</div>
          <div className=' flex gap-2'>
            <div className='rounded-t border-2 border-b-0 border-dashed p-2 px-4 text-xl font-bold text-gray-400'>
              HN - HCM
            </div>
            <div className='-mb-0.5 rounded-t border-2 border-b-0 border-primary bg-white p-2 px-4 text-xl font-bold text-primary'>
              HCM - HN
            </div>
          </div>
          <div className=' rounded border-2 p-8 shadow-md'>
            <div className='pb-8 text-lg'>Hồ Chí Minh (HCM) - Hà Nội (HN)</div>
            <div className='grid grid-cols-6 gap-16'>
              <div className='col-span-3 flex flex-col gap-y-2'>
                <div className='mb-2 text-xl'>Hành Khách</div>
                <div className='flex justify-between rounded-md border-2 border-primary bg-sky-100 p-2 px-4'>
                  <span>Vu Lam</span>
                  <span className='text-primary'>(chưa chọn ghế)</span>
                </div>
                <div className='flex justify-between rounded-md border-2 p-2 px-4'>
                  <span>Vu Lam2</span>
                  <span className='text-primary'>(chưa chọn ghế)</span>
                </div>
              </div>
              <div className='col-span-2 col-start-5 flex flex-col gap-y-2'>
                <div className='mb-2 text-lg'>Chú Thích</div>
                <div className='flex'>
                  <OpenSeatIcon />
                  <span className='ml-2'>Ghế không còn trống</span>
                </div>
                <div className='flex'>
                  <OccupiedSeatIcon />
                  <span className='ml-2'>Ghế trống</span>
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
            </div>
            <div className='mt-16 flex justify-center'>
              <SeatMap />
            </div>
          </div>
        </div>
        <WizardBottomNavBar forwardURL='/wizard/payment' isForwardEnabled={isValid} />
      </div>

      <PaymentSummaryCard className='col-span-4' />
    </div>
  )
}

interface SeatMapProps {}

const SeatMap: FunctionComponent<SeatMapProps> = () => {
  return (
    <div className='flex'>
      <div>
        {new Array(5).fill(0).map((_, i) => (
          <Shell side='left' />
        ))}
        <Shell side='left' exit />
        {new Array(5).fill(0).map((_, i) => (
          <Shell side='left' />
        ))}
        <Shell side='left' wing='top' />
        {new Array(6).fill(0).map((_, i) => (
          <Shell side='left' wing='middle' />
        ))}
        <Shell side='left' wing='bottom' />
        {new Array(14).fill(0).map((_, i) => (
          <Shell side='left' />
        ))}
      </div>
      <div>
        <div className='inline-block  px-2  text-center '>
          <div className='my-4 h-8 text-center text-lg'>BOING-737</div>
          <div className='flex'>
            <div className='bold aspect-square w-8'>A</div>
            <div className='bold aspect-square w-8'>B</div>
            <div className='bold aspect-square w-8'>C</div>
            <div className='bold aspect-square w-8'></div>
            <div className='bold aspect-square w-8'>D</div>
            <div className='bold aspect-square w-8'>E</div>
            <div className='bold aspect-square w-8'>F</div>
          </div>
          {new Array(30).fill(0).map((_, i) => (
            <div className='flex'>
              <Seat />
              <Seat />
              <Seat />
              <div className='aspect-square w-8 p-1'>{i + 1}</div>
              <Seat />
              <Seat />
              <Seat />
            </div>
          ))}
        </div>
        <div className='z-50 h-8 -translate-y-2 bg-white'></div>
      </div>
      <div>
        {new Array(11).fill(0).map((_, i) => (
          <Shell side='right' />
        ))}
        <Shell side='right' wing='top' />
        {new Array(6).fill(0).map((_, i) => (
          <Shell side='right' wing='middle' />
        ))}
        <Shell side='right' wing='bottom' />
        {new Array(14).fill(0).map((_, i) => (
          <Shell side='right' />
        ))}
      </div>
    </div>
  )
}

interface ShellProps {
  side?: 'left' | 'right'
  wing?: 'top' | 'middle' | 'bottom'
  exit?: boolean
}

const Shell: FunctionComponent<ShellProps> = (props) => {
  return (
    <div
      className={classNames('flex', {
        '-scale-x-100': props.side === 'left',
      })}
    >
      <div
        className={classNames('h-8 border-2', {
          'border-gray-500': !props.exit,
          'border-red-600': props.exit,
        })}
      ></div>
      <div className='aspect-square w-8'>
        {props.wing ? <img src={`/src/assets/images/aircraft/wing-${props.wing}.png`} /> : null}
        {props.exit ? (
          <span className=' text-red-600'>
            <i className='fa-sharp fa-solid fa-caret-left m-2'></i>
          </span>
        ) : null}
      </div>
    </div>
  )
}

interface SeatProps {}

const Seat: FunctionComponent<SeatProps> = () => {
  return (
    <div className='aspect-square w-8 p-1 hover:bg-sky-100 hover:ring'>
      <OccupiedSeatIcon />
    </div>
  )
}

export default SeatsSelection
