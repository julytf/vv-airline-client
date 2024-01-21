import { FunctionComponent, useEffect, useState } from 'react'
import WizardNavBar from '../../components/NavBar/WizardNavBar'
import classNames from 'classnames'
import Loading from '../../components/Loading/Loading'
import WizardBottomNavBar from '../../components/NavBar/WizardBottomNavBar'

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
    <div className='mx-auto my-16 flex flex-col gap-y-6 xl:max-w-screen-lg'>
      <Flight />
      <Flight />
      <WizardBottomNavBar forwardURL='/wizard/payment' isForwardEnabled={isValid} />
    </div>
  )
}

interface FlightProps {}

const Flight: FunctionComponent<FlightProps> = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className='w-full rounded-md border-2 shadow-md '>
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

          <div className='mt-1 flex flex-col gap-y-1 '>
            <span className='bold text-xs'>Airbus-A359</span>
            <div className='text-xs'>
              <span>1 tiếng 20 phút</span>
              {' - '}
              <span className='bold'>Bay thẳng</span>
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
        </div>
        <div className='col-span-4 grid grid-cols-6 gap-4'>
          <div className='col-span-3 flex items-center justify-center rounded-md border border-blue-400 bg-blue-100'>
            <div className='flex justify-start'>
              <span className='bold text-3xl'>15.000.000</span>
              <span>VNĐ</span>
            </div>
          </div>
          <div className='col-span-3 flex items-center justify-center rounded-md border border-yellow-500 bg-yellow-100'>
            <div className='flex justify-start'>
              <span className='bold text-3xl'>33.000.000</span>
              <span>VNĐ</span>
            </div>
          </div>
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
