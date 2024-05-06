import { TicketClass } from '@/enums/ticket.enums'
import { ICabinModel, IRowModel } from '@/interfaces/aircraft/aircraftModel.interface'
import { Fragment, FunctionComponent } from 'react'
import Seat from './Seat'
import { numberToAlphabet } from '@/utils/helpers'
import { SeatStatus, SeatType } from '@/enums/seat.enums'
import Shell from './Shell'
import React from 'react'
import classNames from 'classnames'

interface CabinProps {
  value: ICabinModel
  onChange: (value: ICabinModel) => void
}

const Cabin: FunctionComponent<CabinProps> = ({ value, onChange }) => {
  const onUpdateSize = ({ noRow, noCol }: { noRow: number; noCol: number }) => {
    const map: IRowModel[] = new Array(Number(noRow)).fill('').map((_, index) => {
      // keep old data when resize
      // if (value.map[index]) return value.map[index]

      const row = index + 1
      return {
        // TODO: fix index
        index,
        hasExit: value.map[index]?.hasExit || false,
        seats: new Array(noCol).fill('').map((_, index) => {
          // keep old data when resize
          if (value.map[index]?.seats[index]) return value.map[index].seats[index]

          const col = numberToAlphabet(index + 1)
          return {
            code: `${col}${row}`,
            col,
            row,
            seatType: index === 0 || index === noCol - 1 ? SeatType.WINDOW : SeatType.NORMAL,
            ticketClass: value.class,
            status: SeatStatus.AVAILABLE,
          }
        }),
      }
    })
    onChange({ ...value, noRow, noCol, map })
  }
  return (
    <div className='grid grid-cols-12 gap-4 rounded-md border p-6'>
      <div className='col-span-6 flex justify-between'>
        <label htmlFor='noRow'>Số hàng</label>
        <input
          id='noRow'
          type='number'
          min={0}
          max={200}
          value={value.noRow}
          onChange={(e) => {
            onUpdateSize({ noRow: Number(e.target.value), noCol: value.noCol })
          }}
          className='block rounded-md border-0 bg-transparent p-3 py-1.5 text-sm leading-6 text-gray-900 outline-primary ring-1  ring-inset ring-gray-300 placeholder:text-gray-400'
        />
      </div>
      <div className='col-span-6 flex justify-between'>
        <label htmlFor='noCol'>Số cột</label>
        <input
          id='noCol'
          type='number'
          min={0}
          max={20}
          value={value.noCol}
          onChange={(e) => {
            onUpdateSize({ noRow: value.noRow, noCol: Number(e.target.value) })
          }}
          className='block rounded-md border-0 bg-transparent p-3 py-1.5 text-sm leading-6 text-gray-900 outline-primary ring-1  ring-inset ring-gray-300 placeholder:text-gray-400'
        />
      </div>
      <div className='col-span-6 flex justify-between'>
        <label htmlFor='class'>Hạng Cabin</label>
        <select
          id='class'
          className='block rounded-md border-0 bg-transparent p-3 py-1.5 text-sm leading-6 text-gray-900 outline-primary ring-1  ring-inset ring-gray-300 placeholder:text-gray-400'
          onChange={(e) => {
            onChange({ ...value, class: e.target.value as TicketClass })
          }}
        >
          <option value={TicketClass.ECONOMY}>Economy</option>
          <option value={TicketClass.BUSINESS}>Business</option>
        </select>
      </div>
      {/* <div className='col-span-6 flex justify-between'>
        <label htmlFor='aisleCol'>Lối đi</label>
        <select
          multiple
          id='aisleCol'
          className='block rounded-md border-0 bg-transparent p-3 py-1.5 text-sm leading-6 text-gray-900 outline-primary ring-1  ring-inset ring-gray-300 placeholder:text-gray-400'
          onChange={(e) => {
            onChange({ ...value, aisleCol: Array.from(e.target.selectedOptions).map((option) => Number(option.value)) })  
          }}
        >
          {new Array(value.noCol).fill('').map((_, index) => (
            <option key={index} value={index}>
              {index + 1}
            </option>
          ))}
        </select>
      </div> */}
      <div className='col-span-12 flex'>
        <div className=' flex-1'>
          <div className='flex justify-center'>
            {new Array(value.noCol).fill(null).map((_, index) => {
              if (index === value.noCol - 1) return

              const isAisle = value.aisleCol.includes(index + 1)
              return (
                <Fragment key={index}>
                  {isAisle && <div className='h-10 w-10'></div>}
                  <div
                    key={index}
                    className={classNames('flex h-10 w-10 items-center justify-center', {
                      'translate-x-1/2': !isAisle,
                    })}
                  >
                    <label>
                      <span className={isAisle ? 'text-sky-500' : 'text-gray-500'}>
                        <i className='fa-solid fa-road'></i>
                      </span>
                      <input
                        hidden
                        type='checkbox'
                        checked={isAisle}
                        onChange={(e) => {
                          onChange({
                            ...value,
                            aisleCol: e.target.checked
                              ? [...value.aisleCol, index + 1]
                              : value.aisleCol.filter((aisle) => aisle !== index + 1),
                          })
                        }}
                      />
                    </label>
                  </div>
                </Fragment>
              )
            })}
            <div className='h-10 w-10'></div>
          </div>
          <div className='flex justify-center rounded-md border'>
            <div>
              <Shell side='left' />
              {value.map.map((row, rowIndex) => {
                return <Shell key={rowIndex} side='left' exit={row.hasExit} />
              })}
            </div>
            <div>
              <div className='flex justify-between text-center'>
                {new Array(value.noCol).fill(0).map((_, index) => (
                  <Fragment key={index}>
                    <div className='bold aspect-square w-10'>{numberToAlphabet(index + 1)}</div>
                    {value.aisleCol.includes(index + 1) && <div className='bold aspect-square w-10'></div>}
                  </Fragment>
                ))}
              </div>
              {value.map.map((row, rowIndex) => (
                <div key={rowIndex} className='flex justify-between'>
                  {row.seats.map((seat, seatIndex) => {
                    return (
                      <Fragment key={seatIndex}>
                        <Seat
                          value={seat}
                          onChange={(seat) => {
                            const map = [...value.map]
                            map[rowIndex].seats[seatIndex] = seat
                            onChange({ ...value, map })
                          }}
                        />
                        {value.aisleCol.includes(seatIndex + 1) && (
                          <div className='aspect-square w-10 p-1 text-center'>{row.index + 1}</div>
                        )}
                      </Fragment>
                    )
                  })}
                </div>
              ))}
            </div>
            <div>
              <Shell side='right' />
              {value.map.map((row, rowIndex) => {
                return <Shell key={rowIndex} side='right' exit={row.hasExit} />
              })}
            </div>
          </div>
        </div>
        <div className='flex w-10 flex-col items-center justify-between'>
          <div className='h-10 w-10'></div>
          <div className='h-10 w-10'></div>
          {value.map.map((row, rowIndex) => {
            return (
              <div key={rowIndex} className='flex h-10 w-10 items-center justify-center'>
                <label>
                  <span className={row.hasExit ? 'text-red-600' : 'text-gray-500'}>
                    <i className='fa-solid fa-person-to-door'></i>
                  </span>
                  <input
                    hidden
                    type='checkbox'
                    checked={row.hasExit}
                    onChange={(e) => {
                      const map = [...value.map]
                      map[rowIndex] = { ...row, hasExit: e.target.checked }
                      onChange({ ...value, map })
                    }}
                  />
                </label>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Cabin
