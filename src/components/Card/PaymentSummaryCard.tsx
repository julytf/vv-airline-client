import classNames from 'classnames'
import { FunctionComponent, PropsWithChildren, ReactNode, useState } from 'react'

interface PaymentSummaryCardProps {
  className?: string
}

const PaymentSummaryCard: FunctionComponent<PaymentSummaryCardProps> = ({ className }) => {
  return (
    <div className={className}>
      <div className=' overflow-hidden rounded-md shadow-md'>
        <div className='bg-primary p-6 px-8'>
          <span className='text-xl'>Chi Tiết Đặt Vé</span>
        </div>
        <div className=' '>
          <Row
            title={
              <div className='flex w-full justify-between'>
                <div>
                  <span className='pr-4'>
                    <i className='fa-duotone fa-plane'></i>
                  </span>
                  <span>HN</span>
                  <span className='px-4'>
                    <i className='fa-solid fa-arrow-right-arrow-left'></i>
                  </span>
                  <span>HCM</span>
                </div>
                <div className='flex items-start'>
                  <span>2.000.000</span>
                  <span className='text-xs'>VNĐ</span>
                </div>
              </div>
            }
          >
            <div className='flex flex-col gap-y-4 px-4 pt-4 text-sm'>
              <div>
                <div className='flex justify-between'>
                  <div className='bold'>
                    <span>HN</span>
                    <span className='px-4'>
                      <i className='fa-solid fa-arrow-right'></i>
                    </span>
                    <span>HCM</span>
                  </div>
                  <div className='flex items-start'>
                    <span>1.000.000</span>
                    <span className='text-xs'>VNĐ</span>
                  </div>
                </div>
                <div className='pl-4 pt-2 text-sm'>
                  <div>
                    Khởi Hành: <span className='bold'> 16:30, 25 tháng 6 2024</span>
                  </div>
                  <div>
                    Thời gian: <span className='bold'>6 tiếng 40 phút</span>
                  </div>
                  <div>
                    <span className='bold'>Bay Thẳng</span>
                  </div>
                  <div className='pl-4'>
                    <div>VN 210 - Boing 787</div>
                  </div>
                </div>
              </div>
              <div>
                <div className='flex justify-between'>
                  <div className='bold'>
                    <span>HCM</span>
                    <span className='px-4'>
                      <i className='fa-solid fa-arrow-right'></i>
                    </span>
                    <span>HN</span>
                  </div>
                  <div className='flex items-start'>
                    <span>1.000.000</span>
                    <span className='text-xs'>VNĐ</span>
                  </div>
                </div>
                <div className='pl-4 pt-2 text-sm'>
                  <div>
                    Khởi Hành: <span className='bold'> 16:30, 25 tháng 6 2024</span>
                  </div>
                  <div>
                    Thời gian: <span className='bold'>6 tiếng 40 phút</span>
                  </div>
                  <div>
                    <span className='bold'>Quá cảnh (HCM)</span>
                  </div>
                  <div className='pl-4'>
                    <div>VN 10 - Airbus A359</div>
                    <div>VN 144 - Boing 787</div>
                  </div>
                </div>
              </div>
            </div>
          </Row>
          <div className='mx-4 border-t'></div>
          <Row
            title={
              <div className='flex w-full justify-between'>
                <div>
                  <span className='pr-4'>
                    <i className='fa-duotone fa-person-seat-reclined'></i>
                  </span>
                  <span>Chỗ ngồi</span>
                </div>
                <div className='flex items-start'>
                  <span>680.000</span>
                  <span className='text-xs'>VNĐ</span>
                </div>
              </div>
            }
          >
            <div className='flex flex-col gap-y-4 px-4 pt-4 text-sm'>
              <div>
                <div className='bold'>
                  <span>HN</span>
                  <span className='px-4'>
                    <i className='fa-solid fa-arrow-right'></i>
                  </span>
                  <span>Paris</span>
                </div>
                <div className='pl-4 pt-2 text-sm'>
                  <div className='flex justify-between'>
                    <div>
                      <span className='bold mr-4'>A1</span>
                      <span>---</span>
                    </div>
                  </div>
                  <div className='flex justify-between'>
                    <div>
                      <span className='bold mr-4'>A2</span>
                      <span> 12C </span>
                    </div>
                    <div className='flex items-start'>
                      <span>340.000</span>
                      <span className='text-xs'>VNĐ</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className='bold'>
                  <span>HN</span>
                  <span className='px-4'>
                    <i className='fa-solid fa-arrow-right'></i>
                  </span>
                  <span>Paris</span>
                </div>
                <div className='pl-4 pt-2 text-sm'>
                  <div className='flex justify-between'>
                    <div>
                      <span className='bold mr-4'>A1</span>
                      <span>---</span>
                    </div>
                  </div>
                  <div className='flex justify-between'>
                    <div>
                      <span className='bold mr-4'>A2</span>
                      <span> 12C </span>
                    </div>
                    <div className='flex items-start'>
                      <span>340.000</span>
                      <span className='text-xs'>VNĐ</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Row>
          <div className='mx-4 border-t'></div>
          <Row
            title={
              <div className='flex w-full justify-between'>
                <div>
                  <span className='pr-4'>
                    <i className='fa-duotone fa-briefcase'></i>
                  </span>
                  <span>Dịch vụ bổ trợ</span>
                </div>
                <div className='flex items-start'>
                  <span>180.000</span>
                  <span className='text-xs'>VNĐ</span>
                </div>
              </div>
            }
          >
            <div className='flex flex-col gap-y-4 px-4 pt-4 text-sm'>Not Implemented!</div>
          </Row>
          <div className='mx-4 border-t'></div>
        </div>
        <div className='flex justify-between p-8'>
          <span className='text-lg'>Tổng tiền:</span>
          <div className='flex items-start'>
            <span className='text-2xl'>2.860.000</span>
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
    <div className=''>
      <button
        onClick={() => setIsExpaned((prev) => !prev)}
        className={classNames('flex w-full justify-between p-4', {
          'bg-gray-100': isExpaned,
        })}
      >
        {title}
        <div className='pl-4'>
          {isExpaned ? <i className='fa-regular fa-angle-up'></i> : <i className='fa-regular fa-angle-down'></i>}
        </div>
      </button>
      {isExpaned && <div className='p-4 pt-0'>{children}</div>}
    </div>
  )
}

export default PaymentSummaryCard
