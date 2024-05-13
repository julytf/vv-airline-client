import SmartTable from '@/components/Table/SmartTable'
import Table, { TableData } from '@/components/Table/Table'
import Button from '@/components/ui/Button'
import { TicketClass, TicketType } from '@/enums/ticket.enums'
import IAirport from '@/interfaces/flight/airport.interface'
import flightRoutesService from '@/services/flightRoutes.service'
import { route } from '@/utils/helpers'
import { FunctionComponent } from 'react'
import { NavLink } from 'react-router-dom'

interface FlightRoutesIndexProps {}

const FlightRoutesIndex: FunctionComponent<FlightRoutesIndexProps> = () => {
  return (
    <div className='flex flex-wrap p-3 px-6'>
      <div className='w-full max-w-full flex-none'>
        <div className='flex justify-end py-3'>
          <NavLink to={route('/admin/flight-routes/create')}>
            <Button>Thêm Tuyến Bay</Button>
          </NavLink>
        </div>
        <SmartTable
          title='Tuyến Bay'
          subTitle='Danh Sách Tuyến Bay'
          // data={flightRoutesData}
          FetchDataFnc={flightRoutesService.getFlightRoutesPaginate.bind(flightRoutesService)}
          queryKey='flightRoutes'
          renderOptions={[
            {
              field: 'departureAirport',
              displayName: 'Điểm đi',
              renderFnc: (value: unknown) => {
                return <>{(value as IAirport).IATA}</>
              },
            },
            {
              field: 'arrivalAirport',
              displayName: 'Điểm đến',
              renderFnc: (value: unknown) => {
                return <>{(value as IAirport).IATA}</>
              },
            },
            {
              field: 'distance',
              displayName: 'Khoảng cách',
              renderFnc: (value: unknown) => {
                return <>{value} Km</>
              },
            },
            {
              field: 'prices',
              displayName: 'Giá vé',
              renderFnc: (value: unknown) => {
                const prices = value as {
                  [TicketClass.ECONOMY]: {
                    [TicketType.BUDGET]: number
                    [TicketType.STANDARD]: number
                    [TicketType.FLEXIBLE]: number
                  }
                  [TicketClass.BUSINESS]: {
                    [TicketType.STANDARD]: number
                    [TicketType.FLEXIBLE]: number
                  }
                }
                return (
                  <>
                    <div>
                      {TicketClass.ECONOMY}:
                      <div className='ml-4'>
                        <div>
                          {TicketType.FLEXIBLE}: {prices[TicketClass.ECONOMY][TicketType.FLEXIBLE].toLocaleString()} vnđ
                        </div>
                        <div>
                          {TicketType.STANDARD}: {prices[TicketClass.ECONOMY][TicketType.STANDARD].toLocaleString()} vnđ
                        </div>
                        <div>
                          {TicketType.BUDGET}: {prices[TicketClass.ECONOMY][TicketType.BUDGET].toLocaleString()} vnđ
                        </div>
                      </div>
                    </div>
                    <div>
                      {TicketClass.BUSINESS}:
                      <div className='ml-2'>
                        <div>
                          {TicketType.FLEXIBLE}: {prices[TicketClass.BUSINESS][TicketType.FLEXIBLE].toLocaleString()}{' '}
                          vnđ
                        </div>
                        <div>
                          {TicketType.STANDARD}: {prices[TicketClass.BUSINESS][TicketType.STANDARD].toLocaleString()}{' '}
                          vnđ
                        </div>
                      </div>
                    </div>
                  </>
                )
              },
            },
            {
              field: '',
              displayName: 'Sửa đổi',
              renderFnc: (value: unknown, data?: TableData) => {
                return (
                  <div className='flex gap-x-4'>
                    <NavLink to={route('/admin/flight-routes/:id', { params: { id: String(data?._id) } })}>
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

export default FlightRoutesIndex
