import SmartTable from '@/components/Table/SmartTable'
import Table, { TableData } from '@/components/Table/Table'
import Button from '@/components/ui/Button'
import { SeatClass } from '@/enums/seat.enums'
import IAircraft from '@/interfaces/aircraft/aircraft.interface'
import IAirport from '@/interfaces/flight/airport.interface'
import IFlightRoute from '@/interfaces/flight/flightRoute.interface'
import flightLegsService from '@/services/flightLegs.service'
import { route } from '@/utils/helpers'
import { format } from 'date-fns'
import { FunctionComponent } from 'react'
import { NavLink } from 'react-router-dom'

interface FlightLegsIndexProps {}

const FlightLegsIndex: FunctionComponent<FlightLegsIndexProps> = () => {
  return (
    <div className='flex flex-wrap p-3 px-6'>
      <div className='w-full max-w-full flex-none'>
        <div className='flex justify-end py-3'>
          <NavLink to={route('/admin/flight-legs/create')}>
            <Button>Thêm Chặng Bay</Button>
          </NavLink>
        </div>
        <SmartTable
          title='Chặng Bay'
          subTitle='Danh Sách Chặng Bay'
          // data={flightLegsData}
          FetchDataFnc={flightLegsService.getFlightLegsPaginate.bind(flightLegsService)}
          queryKey='flightLegs'
          renderOptions={[
            {
              field: 'flightRoute',
              displayName: 'Điểm đi',
              renderFnc: (value) => {
                return <>{(value as IFlightRoute)?.departureAirport?.IATA}</>
              },
            },
            {
              field: 'flightRoute',
              displayName: 'Điểm đến',
              renderFnc: (value) => {
                return <>{(value as IFlightRoute)?.arrivalAirport?.IATA}</>
              },
            },
            {
              field: 'departureTime',
              displayName: 'Thời gian đi',
              renderFnc: (value) => {
                return <>{format(value as Date, 'dd/MM/yyyy')}</>
              },
            },
            {
              field: 'arrivalTime',
              displayName: 'Thời gian đến',
              renderFnc: (value) => {
                return <>{format(value as Date, 'dd/MM/yyyy')}</>
              },
            },
            {
              field: 'remainingSeats',
              displayName: 'Số ghế',
              renderFnc: (value: unknown) => {
                const remainingSeats = value as {
                  [SeatClass.BUSINESS]: number
                  [SeatClass.ECONOMY]: number
                }
                return (
                  <>
                    <div>BUSINESS: {remainingSeats[SeatClass.BUSINESS]}</div>
                    <div>ECONOMY: {remainingSeats[SeatClass.ECONOMY]}</div>
                  </>
                )
              },
            },
            {
              field: 'status',
              displayName: 'Trạng thái',
              renderFnc: (value) => {
                return <>{value}</>
              },
            },
            {
              field: 'aircraft',
              displayName: 'Máy bay',
              renderFnc: (value) => {
                return <>{(value as IAircraft)?.name}</>
              },
            },
            {
              field: '',
              displayName: 'Sửa đổi',
              renderFnc: (value, data?: TableData) => {
                return (
                  <div className='flex gap-x-4'>
                    <NavLink to={route('/admin/flight-legs/:id', { params: { id: String(data?._id) } })}>
                      <i className='fa-regular fa-pen-to-square'></i>
                    </NavLink>
                  </div>
                )
              },
            },
          ]}
        />
      </div>
    </div>
  )
}

export default FlightLegsIndex
