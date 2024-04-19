import SmartTable from '@/components/Table/SmartTable'
import Table, { TableData } from '@/components/Table/Table'
import Button from '@/components/ui/Button'
import { FlightLegType } from '@/enums/flightLeg.enums'
import { PassengerType } from '@/enums/passenger.enums'
import { TicketClass } from '@/enums/ticket.enums'
import IAircraft from '@/interfaces/aircraft/aircraft.interface'
import IAirport from '@/interfaces/flight/airport.interface'
import IFlightLeg from '@/interfaces/flight/flightLeg.interface'
import IFlightRoute from '@/interfaces/flight/flightRoute.interface'
import flightsService from '@/services/flights.service'
import { route } from '@/utils/helpers'
import { format } from 'date-fns'
import { FunctionComponent } from 'react'
import { NavLink } from 'react-router-dom'

interface FlightsIndexProps {}

const FlightsIndex: FunctionComponent<FlightsIndexProps> = () => {
  return (
    <div className='flex flex-wrap p-3 px-6'>
      <div className='w-full max-w-full flex-none'>
        <div className='flex justify-end py-3'>
          <NavLink to={route('/admin/flights/create')}>
            <Button>Thêm Chuyến Bay</Button>
          </NavLink>
        </div>
        <SmartTable
          title='Chuyến Bay'
          subTitle='Danh Sách Chuyến Bay'
          // data={flightsData}
          FetchDataFnc={flightsService.getFlightsPaginate.bind(flightsService)}
          queryKey='flights'
          renderOptions={[
            // {
            //   field: 'flightRoute',
            //   displayName: 'Điểm đi',
            //   renderFnc: (value: unknown) => {
            //     return <>{(value as IFlightRoute)?.departureAirport?.IATA}</>
            //   },
            // },
            // {
            //   field: 'flightRoute',
            //   displayName: 'Điểm đến',
            //   renderFnc: (value: unknown) => {
            //     return <>{(value as IFlightRoute)?.arrivalAirport?.IATA}</>
            //   },
            // },
            {
              field: 'flightRoute',
              displayName: 'Tuyến bay',
              renderFnc: (value) => {
                return (
                  <>
                    {(value as IFlightRoute)?.departureAirport?.IATA} - {(value as IFlightRoute)?.arrivalAirport?.IATA}
                  </>
                )
              },
            },
            {
              field: 'departureTime',
              displayName: 'Thời gian đi',
              renderFnc: (value: unknown) => {
                return <>{value ? format(value as Date, 'dd/MM/yyyy') : ''}</>
              },
            },
            {
              field: 'arrivalTime',
              displayName: 'Thời gian đến',
              renderFnc: (value: unknown) => {
                return <>{value ? format(value as Date, 'dd/MM/yyyy') : ''}</>
              },
            },
            {
              field: 'remainingSeats',
              displayName: 'Số ghế',
              renderFnc: (value: unknown) => {
                const remainingSeats = value as {
                  [TicketClass.BUSINESS]: number
                  [TicketClass.ECONOMY]: number
                }
                return (
                  <>
                    <div>BUSINESS: {remainingSeats[TicketClass.BUSINESS]}</div>
                    <div>ECONOMY: {remainingSeats[TicketClass.ECONOMY]}</div>
                  </>
                )
              },
            },
            {
              field: 'hasTransit',
              displayName: 'Quá cảnh',
              renderFnc: (value: unknown, data: TableData) => {
                const flightLegs = data.flightLegs as {
                  [FlightLegType.DEPARTURE]: IFlightLeg
                  [FlightLegType.TRANSIT]: IFlightLeg
                }

                return (
                  <>
                    {value ? (
                      <>
                        <span className='text-green-500'>Có </span>(
                        <span>{flightLegs[FlightLegType.DEPARTURE].flightRoute.arrivalAirport.IATA}</span>)
                      </>
                    ) : (
                      <span className='text-red-500'>Không</span>
                    )}
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
                    <NavLink to={route('/admin/flights/:id', { params: { id: String(data?._id) } })}>
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

export default FlightsIndex
