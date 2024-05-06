import { TicketClass } from '@/enums/ticket.enums'
import { ICabinModel } from '@/interfaces/aircraft/aircraftModel.interface'
import { FunctionComponent } from 'react'
import Cabin from './Cabin'

interface SeatMapBuilderProps {
  value: ICabinModel[]
  onChange: (value: ICabinModel[]) => void
}

const SeatMapBuilder: FunctionComponent<SeatMapBuilderProps> = ({ value, onChange }) => {
  return (
    <div className='grid grid-cols-12 gap-4'>
      <div className='col-span-6 flex justify-between'>
        <label htmlFor='cabinQuantity'>Số lượng Cabin</label>
        <input
          type='number'
          id='cabinQuantity'
          min={0}
          max={10}
          value={value.length}
          onChange={(e) => {
            onChange(
              new Array(Number(e.target.value)).fill('').map((_, index) => {
                if (value[index]) return value[index]

                return {
                  class: TicketClass.ECONOMY,
                  noRow: 0,
                  noCol: 0,
                  aisleCol: [],
                  map: [],
                }
              }),
            )
          }}
          className='block rounded-md border-0 bg-transparent p-3 py-1.5 text-sm leading-6 text-gray-900 outline-primary ring-1  ring-inset ring-gray-300 placeholder:text-gray-400'
        />
      </div>
      <div className='col-span-12 flex flex-col gap-2 rounded-md border p-2'>
        {value.length === 0 ? (
          <div>Chưa có cabin nào</div>
        ) : (
          value.map((cabin, index) => (
            <Cabin
              key={index}
              value={cabin}
              onChange={(cabin) => {
                const newValue = [...value]
                newValue[index] = cabin
                onChange(newValue)
              }}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default SeatMapBuilder
