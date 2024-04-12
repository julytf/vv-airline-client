import classNames from 'classnames'
import { addDays, addYears, startOfDay } from 'date-fns'
import { FunctionComponent } from 'react'

interface DateSelectProps {
  value: string
  onChange: (value: string) => void
}

const DateSelect: FunctionComponent<DateSelectProps> = ({ value, onChange }) => {
  const currentDate = new Date(value)
  const today = startOfDay(new Date())
  const dateLimit = addYears(today, 1)

  return (
    <div className='flex justify-between gap-4'>
      {new Array(3)
        .fill(null)
        .map((_, index) => {
          const date = addDays(currentDate, -(index + 1))
          return (
            <button
              key={index}
              onClick={() => onChange(date.toISOString())}
              className={classNames('flex h-16 w-32 flex-col items-center justify-center rounded-md border-2', {
                'text-gray-300': date < today || date > dateLimit,
              })}
              disabled={date < today || date > dateLimit}
            >
              <span>
                {date.toLocaleDateString('vi-VN', {
                  weekday: 'long',
                })}
              </span>
              <span className='bold text-xl'>
                {date.toLocaleDateString('vi-VN', {
                  month: 'numeric',
                  day: 'numeric',
                })}
              </span>
            </button>
          )
        })
        .reverse()}
      <div className='flex h-16 w-32 flex-col items-center justify-center rounded-md border-2 border-primary bg-sky-50'>
        <span>
          {currentDate.toLocaleDateString('vi-VN', {
            weekday: 'long',
          })}
        </span>
        <span className='bold text-xl'>
          {currentDate.toLocaleDateString('vi-VN', {
            month: 'numeric',
            day: 'numeric',
          })}
        </span>
      </div>
      {new Array(3).fill(null).map((_, index) => {
        const date = addDays(currentDate, index + 1)
        return (
          <button
            key={index}
            onClick={() => onChange(date.toISOString())}
            className={classNames('flex h-16 w-32 flex-col items-center justify-center rounded-md border-2', {
              'text-gray-300': date < today || date > dateLimit,
            })}
            disabled={date < today || date > dateLimit}
          >
            <span>
              {date.toLocaleDateString('vi-VN', {
                weekday: 'long',
              })}
            </span>
            <span className='bold text-xl'>
              {date.toLocaleDateString('vi-VN', {
                month: 'numeric',
                day: 'numeric',
              })}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export default DateSelect
