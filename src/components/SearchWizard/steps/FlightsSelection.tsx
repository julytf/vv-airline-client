import { FunctionComponent, useEffect, useState } from 'react'
import WizardNavBar from '../NavBar/WizardNavBar'
import classNames from 'classnames'
import Loading from '../../Loading/Loading'
import WizardBottomNavBar from '../NavBar/WizardBottomNavBar'
import SearchCard from '@/components/Card/SearchCard'
import { SeatClass } from '@/enums/seat.enums'

interface FlightsSelectionProps {}

const FlightsSelection: FunctionComponent<FlightsSelectionProps> = () => {
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
    <div className='mx-auto my-16 flex max-w-screen-xl flex-col items-center justify-center gap-y-6'>
      <SearchCard className='shadow-lg' />
      <div className='mt-16 flex w-full max-w-screen-xl flex-col gap-y-8'>
        <div className='flex w-full flex-col gap-y-4 overflow-hidden rounded-md border shadow-inner'>
          <div className='flex border-b p-4 px-8'>
            <div className='pr-4 pt-2 text-4xl'>
              <i className='fa-light fa-plane'></i>
            </div>
            <div className='flex flex-col'>
              <span className='text-2xl'>Hồ Chí Minh(HCM) - Hà Nội(HN)</span>
              <span>Thứ 3, 23/01/2024</span>
            </div>
          </div>
          <div>
            <SelectedFlight />
          </div>
          <div className='flex hidden flex-col gap-y-8 p-8'>
            <Flight />
            <Flight />
          </div>
        </div>
        <div className='flex w-full flex-col gap-y-4 rounded-md border shadow-inner'>
          <div className='flex border-b p-4 px-8'>
            <div className='pr-4 pt-2 text-4xl'>
              <i className='fa-light fa-plane'></i>
            </div>
            <div className='flex flex-col'>
              <span className='text-2xl'>Hà Nội(HN) - Hồ Chí Minh(HCM)</span>
              <span>Thứ 6, 23/01/2024</span>
            </div>
          </div>
          <div className='flex flex-col gap-y-8 p-8'>
            <Flight />
            <Flight />
          </div>
        </div>
        <WizardBottomNavBar forwardURL='/wizard/passengers-information' isForwardEnabled={isValid} />
      </div>
    </div>
  )
}

interface FlightProps {}

const Flight: FunctionComponent<FlightProps> = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className={classNames('w-full rounded-md border-2 shadow-md ', {})}>
      <div className='grid grid-cols-6 gap-6  p-4'>
        <div className='col-span-2'>
          <div className='flex justify-between'>
            <div className='flex flex-col items-center'>
              <span className='text-2xl text-primary'>06:00</span>
              <span className='text-xl'>HCM</span>
            </div>
            <div className='flex items-center justify-center'>
              <i className='fa-duotone fa-plane'></i>
            </div>
            <div className=' flex flex-col items-center'>
              <span className='text-2xl text-primary'>08:00</span>
              <span className='text-xl'>HAN</span>
            </div>
          </div>

          <div className='mt-1 flex justify-between gap-x-4'>
            <div className='flex flex-col gap-y-1 '>
              <div className='text-xs'>
                <span>1 tiếng 20 phút</span>
                {' - '}
                <span className='bold'>Quá Cảnh (HCM)</span>
              </div>
              <button className='inline-block' onClick={() => setIsExpanded((prev) => !prev)}>
                <span>Chi tiết </span>
                {isExpanded ? (
                  <i className='fa-solid fa-caret-up text-primary'></i>
                ) : (
                  <i className='fa-solid fa-caret-down text-primary'></i>
                )}
              </button>
            </div>
            <div className='flex flex-col items-end'>
              <span className='bold text-xs'>VN 10 - Airbus A359</span>
              <span className='bold text-xs'>VN 144 - Boing 787</span>
            </div>
          </div>
        </div>
        <div className='col-span-4 grid grid-cols-6 gap-4'>
          <button
            className={classNames(
              'col-span-3 flex items-center justify-center rounded-md border border-blue-400 bg-blue-100 active:scale-95',
              {},
            )}
          >
            <div className='flex flex-col justify-center'>
              <span>PHỔ THÔNG</span>
              <div className='flex justify-start'>
                <span className='bold text-3xl'>15.000.000</span>
                <span>VNĐ</span>
              </div>
            </div>
          </button>
          <button
            className={classNames(
              'col-span-3 flex items-center justify-center rounded-md border border-yellow-400 bg-yellow-100 active:scale-95',
              {},
            )}
          >
            <div className='flex flex-col justify-center'>
              <span>THƯƠNG GIA</span>
              <div className='flex justify-start'>
                <span className='bold text-3xl'>33.000.000</span>
                <span>VNĐ</span>
              </div>
            </div>
          </button>
        </div>
      </div>
      <div
        className={classNames('flex flex-col gap-12 border-t bg-gray-50 p-16', {
          hidden: !isExpanded,
        })}
      >
        <div>
          <div className='flex gap-x-6'>
            <div className='flex flex-col items-center'>
              <div>
                <div className='flex aspect-square w-12 items-center justify-center rounded-full border border-primary text-primary'>
                  <i className='fa-light fa-plane-departure'></i>
                </div>
              </div>
              <div className='h-full w-0 border border-primary'></div>
            </div>
            <div className='pb-8'>
              <div className='flex flex-col '>
                <span className='text-2xl text-primary'>08/01/2024, 06:00 Hồ Chí Minh</span>
                <span className='text-lg'>HCM, Việt Nam</span>
              </div>
              <div className='mt-4 flex flex-col gap-y-2 text-sm'>
                <div>
                  <span className='bold'>Máy bay: </span>
                  <span>Airbus-A359</span>
                </div>
                <div>
                  <span className='bold'>Thời gian bay: </span>
                  <span>1 tiếng 20 phút</span>
                </div>
              </div>
            </div>
          </div>
          <div className='flex gap-x-6'>
            <div className='flex flex-col items-center'>
              <div>
                <div className='flex aspect-square w-12 items-center justify-center rounded-full border border-primary text-primary'>
                  <i className='fa-light fa-plane-arrival'></i>
                </div>
              </div>
            </div>
            <div>
              <div className='flex flex-col '>
                <span className='text-2xl text-primary'>08/01/2024, 06:00 Hồ Chí Minh</span>
                <span className='text-lg'>Hà Nội, Việt Nam</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <span className='rounded-full border-2 border-primary bg-sky-50 p-4 px-6'>
            Thời gian nối chuyến: 2 tiếng 30 phút
          </span>
        </div>
        <div className=''>
          <div className='flex gap-x-6'>
            <div className='flex flex-col items-center'>
              <div>
                <div className='flex aspect-square w-12 items-center justify-center rounded-full border border-primary text-primary'>
                  <i className='fa-light fa-plane-departure'></i>
                </div>
              </div>
              <div className='h-full w-0 border border-primary'></div>
            </div>
            <div className='pb-8'>
              <div className='flex flex-col '>
                <span className='text-2xl text-primary'>08/01/2024, 06:00 Hồ Chí Minh</span>
                <span className='text-lg'>HCM, Việt Nam</span>
              </div>
              <div className='mt-4 flex flex-col gap-y-2 text-sm'>
                <div>
                  <span className='bold'>Máy bay: </span>
                  <span>Airbus-A359</span>
                </div>
                <div>
                  <span className='bold'>Thời gian bay: </span>
                  <span>1 tiếng 20 phút</span>
                </div>
              </div>
            </div>
          </div>
          <div className='flex gap-x-6'>
            <div className='flex flex-col items-center'>
              <div>
                <div className='flex aspect-square w-12 items-center justify-center rounded-full border border-primary text-primary'>
                  <i className='fa-light fa-plane-arrival'></i>
                </div>
              </div>
            </div>
            <div>
              <div className='flex flex-col '>
                <span className='text-2xl text-primary'>08/01/2024, 06:00 Hà Nội</span>
                <span className='text-lg'>Hà Nội, Việt Nam</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface SelectedFlightProps {}

const SelectedFlight: FunctionComponent<SelectedFlightProps> = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className={classNames('w-full', {})}>
      <div className='relative grid grid-cols-12  gap-6 p-4'>
        <div className='col-span-4'>
          <div className='flex justify-between'>
            <div className='flex flex-col items-center'>
              <span className='text-2xl text-primary'>06:00</span>
              <span className='text-xl'>HCM</span>
            </div>
            <div className='flex items-center justify-center'>
              <i className='fa-duotone fa-plane'></i>
            </div>
            <div className=' flex flex-col items-center'>
              <span className='text-2xl text-primary'>08:00</span>
              <span className='text-xl'>HAN</span>
            </div>
          </div>

          <div className='mt-1 flex justify-between gap-x-4'>
            <div className='flex flex-col gap-y-1 '>
              <div className='text-xs'>
                <span>1 tiếng 20 phút</span>
                {' - '}
                <span className='bold'>Quá Cảnh (HCM)</span>
              </div>
              <button className='inline-block' onClick={() => setIsExpanded((prev) => !prev)}>
                <span>Chi tiết </span>
                {isExpanded ? (
                  <i className='fa-solid fa-caret-up text-primary'></i>
                ) : (
                  <i className='fa-solid fa-caret-down text-primary'></i>
                )}
              </button>
            </div>
            <div className='flex flex-col items-end'>
              <span className='bold text-xs'>VN 10 - Airbus A359</span>
              <span className='bold text-xs'>VN 144 - Boing 787</span>
            </div>
          </div>
        </div>
        <div className='relative col-span-8 flex justify-center gap-4'>
          <button
            className={classNames(
              'col-span-3 flex w-1/2 items-center justify-center rounded-md border border-blue-400 bg-blue-100 active:scale-95',
              {},
            )}
          >
            <div className='flex flex-col justify-center'>
              <span>PHỔ THÔNG</span>
              <div className='flex justify-start'>
                <span className='bold text-3xl'>15.000.000</span>
                <span>VNĐ</span>
              </div>
            </div>
          </button>
          <button
            className={classNames(
              'col-span-3  flex hidden w-1/2 items-center justify-center rounded-md border border-yellow-400 bg-yellow-100  active:scale-95',
              {},
            )}
          >
            <div className='flex flex-col justify-center'>
              <span>THƯƠNG GIA</span>
              <div className='flex justify-start'>
                <span className='bold text-3xl'>33.000.000</span>
                <span>VNĐ</span>
              </div>
            </div>
          </button>
          <button className='absolute right-0 p-10 text-gray-400 active:scale-95'>Hủy</button>
        </div>
      </div>
      <div
        className={classNames('flex flex-col gap-12 border-t bg-gray-50 p-16', {
          hidden: !isExpanded,
        })}
      >
        <div>
          <div className='flex gap-x-6'>
            <div className='flex flex-col items-center'>
              <div>
                <div className='flex aspect-square w-12 items-center justify-center rounded-full border border-primary text-primary'>
                  <i className='fa-light fa-plane-departure'></i>
                </div>
              </div>
              <div className='h-full w-0 border border-primary'></div>
            </div>
            <div className='pb-8'>
              <div className='flex flex-col '>
                <span className='text-2xl text-primary'>08/01/2024, 06:00 Hồ Chí Minh</span>
                <span className='text-lg'>HCM, Việt Nam</span>
              </div>
              <div className='mt-4 flex flex-col gap-y-2 text-sm'>
                <div>
                  <span className='bold'>Máy bay: </span>
                  <span>Airbus-A359</span>
                </div>
                <div>
                  <span className='bold'>Thời gian bay: </span>
                  <span>1 tiếng 20 phút</span>
                </div>
              </div>
            </div>
          </div>
          <div className='flex gap-x-6'>
            <div className='flex flex-col items-center'>
              <div>
                <div className='flex aspect-square w-12 items-center justify-center rounded-full border border-primary text-primary'>
                  <i className='fa-light fa-plane-arrival'></i>
                </div>
              </div>
            </div>
            <div>
              <div className='flex flex-col '>
                <span className='text-2xl text-primary'>08/01/2024, 06:00 Hồ Chí Minh</span>
                <span className='text-lg'>Hà Nội, Việt Nam</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <span className='rounded-full border-2 border-primary bg-sky-50 p-4 px-6'>
            Thời gian nối chuyến: 2 tiếng 30 phút
          </span>
        </div>
        <div className=''>
          <div className='flex gap-x-6'>
            <div className='flex flex-col items-center'>
              <div>
                <div className='flex aspect-square w-12 items-center justify-center rounded-full border border-primary text-primary'>
                  <i className='fa-light fa-plane-departure'></i>
                </div>
              </div>
              <div className='h-full w-0 border border-primary'></div>
            </div>
            <div className='pb-8'>
              <div className='flex flex-col '>
                <span className='text-2xl text-primary'>08/01/2024, 06:00 Hồ Chí Minh</span>
                <span className='text-lg'>HCM, Việt Nam</span>
              </div>
              <div className='mt-4 flex flex-col gap-y-2 text-sm'>
                <div>
                  <span className='bold'>Máy bay: </span>
                  <span>Airbus-A359</span>
                </div>
                <div>
                  <span className='bold'>Thời gian bay: </span>
                  <span>1 tiếng 20 phút</span>
                </div>
              </div>
            </div>
          </div>
          <div className='flex gap-x-6'>
            <div className='flex flex-col items-center'>
              <div>
                <div className='flex aspect-square w-12 items-center justify-center rounded-full border border-primary text-primary'>
                  <i className='fa-light fa-plane-arrival'></i>
                </div>
              </div>
            </div>
            <div>
              <div className='flex flex-col '>
                <span className='text-2xl text-primary'>08/01/2024, 06:00 Hà Nội</span>
                <span className='text-lg'>Hà Nội, Việt Nam</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default FlightsSelection
