import classNames from 'classnames'
import { FunctionComponent, PropsWithChildren, ReactNode, useState } from 'react'

interface PaymentSummaryCardProps {
  className?: string
}

const PaymentSummaryCard: FunctionComponent<PaymentSummaryCardProps> = ({ className }) => {
  return (
    <div className={className}>
      <div className=' shadow-md'>
        <div className='bg-gray-100 p-8'>Summary</div>
        <div className=' '>
          <Row
            title={
              <>
                <span>HN</span>
                <span className='px-4'>
                  <i className='fa-solid fa-arrow-right-arrow-left'></i>
                </span>
                <span>HCM</span>
              </>
            }
          >
            <div className='p-4'>test content</div>
          </Row>
          <div className='mx-4 border-t'></div>
          <Row title={'test'}>
            <div className='p-4'>test content</div>
          </Row>
          <div className='mx-4 border-t'></div>
          {/* <div className='flex justify-between p-4'>
            <div>
              <span>HN</span>
              <span className='px-4'>
                <i className='fa-solid fa-arrow-right-arrow-left'></i>
              </span>
              <span>HCM</span>
            </div>
            <div>
              <i className='fa-regular fa-angle-down'></i>
            </div>
          </div>
          <div className='mx-4 border-t'></div> */}
        </div>
        <div className='flex justify-between p-8'>
          <span className='text-lg'>Tổng tiền:</span>
          <div className='flex items-start'>
            <span className='text-xl'>1.000.000</span>
            <span className='text-xs'>VNĐ</span>
          </div>
        </div>
      </div>
    </div>
  )
}

interface RowProps extends PropsWithChildren {
  title?: ReactNode
}

const Row: FunctionComponent<RowProps> = ({ children, title }) => {
  const [isExpaned, setIsExpaned] = useState(false)
  return (
    <div>
      <div
        className={classNames('flex justify-between p-4', {
          'bg-sky-100': isExpaned,
        })}
      >
        <div>{title}</div>
        <button onClick={() => setIsExpaned((prev) => !prev)}>
          {isExpaned ? <i className='fa-regular fa-angle-up'></i> : <i className='fa-regular fa-angle-down'></i>}
        </button>
      </div>
      {isExpaned && children}
    </div>
  )
}

export default PaymentSummaryCard
