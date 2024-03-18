import { FunctionComponent, useEffect, useState } from 'react'
import classNames from 'classnames'
import PaymentSummaryCard from '@/components/Card/PaymentSummaryCard'
import Loading from '@/components/Loading/Loading'
import { OccupiedSeatIcon, OpenSeatIcon } from '@/components/Icons'
import WizardBottomNavBar from '@/components/SearchWizard/NavBar/WizardBottomNavBar'
import IAircraftModel, { IAircraftSeatMap, ICabinModel } from '@/interfaces/aircraft/aircraftModel.interface'
import { SeatsData, useSearchWizard } from '@/contexts/SearchWizard.context'
import { countNonEmpty, numberToAlphabet } from '@/utils/helpers'
import { FlightType } from '@/enums/flight.enums'
import { FlightLegType } from '@/enums/flightLeg.enums'
import { PassengerType } from '@/enums/passenger.enums'
import ISeat from '@/interfaces/aircraft/seat.interface'

interface SeatsSelectionProps {}

const SeatsSelection: FunctionComponent<SeatsSelectionProps> = () => {
  const { data, setData, actions } = useSearchWizard()

  const [flightType, setFlightType] = useState<FlightType>(FlightType.OUTBOUND)
  const [flightLegType, setFlightLegType] = useState<FlightLegType>(FlightLegType.DEPARTURE)

  const [passengerType, setPassengerType] = useState<PassengerType>(PassengerType.ADULT)
  const [passengerIndex, setPassengerIndex] = useState(0)

  const [seatsData, setSeatsData] = useState<SeatsData>({
    [FlightType.OUTBOUND]: {
      [FlightLegType.DEPARTURE]: {
        [PassengerType.ADULT]: [],
        [PassengerType.CHILD]: [],
      },
      [FlightLegType.TRANSIT]: {
        [PassengerType.ADULT]: [],
        [PassengerType.CHILD]: [],
      },
    },
    [FlightType.INBOUND]: {
      [FlightLegType.DEPARTURE]: {
        [PassengerType.ADULT]: [],
        [PassengerType.CHILD]: [],
      },
      [FlightLegType.TRANSIT]: {
        [PassengerType.ADULT]: [],
        [PassengerType.CHILD]: [],
      },
    },
  })

  // const [isValid, setIsValid] = useState(true)
  // const [loading, setLoading] = useState(true)

  const flight = data.flightsData[flightType]?.flight

  const flightLeg =
    flightLegType === FlightLegType.DEPARTURE
      ? flight?.flightLegs[FlightLegType.DEPARTURE]
      : flight?.flightLegs[FlightLegType.TRANSIT]

  const aircraftModel = flightLeg?.aircraft?.aircraftModel

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false)
  //   }, 500)
  // }, [])

  // if (loading) {
  //   return <Loading />
  // }

  const selectSeat = (seat: ISeat) => {
    console.log('seat', seat)

    setSeatsData((prev) => {
      prev[flightType][flightLegType][passengerType][passengerIndex] = seat
      return { ...prev }
    })
  }

  const isOutboundDepartureFlightSeatsValid =
    countNonEmpty(seatsData[FlightType.OUTBOUND][FlightLegType.DEPARTURE][PassengerType.ADULT]) ===
      data.searchData.passengers[PassengerType.ADULT] &&
    countNonEmpty(seatsData[FlightType.OUTBOUND][FlightLegType.DEPARTURE][PassengerType.CHILD]) ===
      data.searchData.passengers[PassengerType.CHILD]

  const isOutboundTranSitFlightSeatsValid =
    countNonEmpty(seatsData[FlightType.OUTBOUND][FlightLegType.TRANSIT][PassengerType.ADULT]) ===
      data.searchData.passengers[PassengerType.ADULT] &&
    countNonEmpty(seatsData[FlightType.OUTBOUND][FlightLegType.TRANSIT][PassengerType.CHILD]) ===
      data.searchData.passengers[PassengerType.CHILD]

  const isInboundDepartureFlightSeatsValid =
    countNonEmpty(seatsData[FlightType.INBOUND][FlightLegType.DEPARTURE][PassengerType.ADULT]) ===
      data.searchData.passengers[PassengerType.ADULT] &&
    countNonEmpty(seatsData[FlightType.INBOUND][FlightLegType.DEPARTURE][PassengerType.CHILD]) ===
      data.searchData.passengers[PassengerType.CHILD]

  const isInboundTranSitFlightSeatsValid =
    countNonEmpty(seatsData[FlightType.INBOUND][FlightLegType.TRANSIT][PassengerType.ADULT]) ===
      data.searchData.passengers[PassengerType.ADULT] &&
    countNonEmpty(seatsData[FlightType.INBOUND][FlightLegType.TRANSIT][PassengerType.CHILD]) ===
      data.searchData.passengers[PassengerType.CHILD]

  const isOutboundFlightSeatsValid =
    isOutboundDepartureFlightSeatsValid &&
    (!data.flightsData[FlightType.OUTBOUND]?.flight.hasTransit || isOutboundTranSitFlightSeatsValid)

  const isInboundFlightSeatsValid =
    !data.searchData.isRoundTrip ||
    (isInboundDepartureFlightSeatsValid &&
      (!data.flightsData[FlightType.INBOUND]?.flight.hasTransit || isInboundTranSitFlightSeatsValid))

  const isForwardAble = isOutboundFlightSeatsValid && isInboundFlightSeatsValid

  console.log('----------------')
  console.log('----------------')
  console.log('----------------')
  console.log('isOutboundDepartureFlightSeatsValid', isOutboundDepartureFlightSeatsValid)
  console.log('isOutboundTranSitFlightSeatsValid', isOutboundTranSitFlightSeatsValid)
  console.log('isInboundDepartureFlightSeatsValid', isInboundDepartureFlightSeatsValid)
  console.log('isInboundTranSitFlightSeatsValid', isInboundTranSitFlightSeatsValid)
  console.log('----------------')
  console.log('isOutboundFlightSeatsValid', isOutboundFlightSeatsValid)
  console.log('isInboundFlightSeatsValid', isInboundFlightSeatsValid)
  console.log('----------------')
  console.log('isForwardAble', isForwardAble)

  const onForward = () => {
    setData((prev) => {
      prev.seatsData = seatsData
      return { ...prev }
    })
    actions.nextStep()
  }

  return (
    <div className=' my-16 grid grid-cols-12 gap-16'>
      <div className='col-span-8 flex flex-col gap-y-8'>
        <div>
          <div className='pb-8 text-xl font-semibold'>Chọn vị trí ngồi cho chuyến bay của bạn</div>
          <div className=' flex gap-2'>
            {/* <div className='rounded-t border-2 border-b-0 p-2 px-4 text-xl font-bold text-gray-400'>
              HN - HCM
            </div> */}
            {/* <div className='-mb-0.5 rounded-t border-2 border-b-0 border-primary bg-white p-2 px-4 text-xl font-bold text-primary'>
              HCM - HN
            </div> */}
            <button
              onClick={() => {
                setFlightType(FlightType.OUTBOUND)
                setFlightLegType(FlightLegType.DEPARTURE)
              }}
              className={classNames('rounded-t border-2 border-b-0 p-2 px-4 text-xl font-bold text-gray-400', {
                '-mb-0.5 border-primary bg-white text-primary':
                  flightType === FlightType.OUTBOUND && flightLegType === FlightLegType.DEPARTURE,
                'border-dashed': flightType !== FlightType.OUTBOUND || flightLegType !== FlightLegType.DEPARTURE,
              })}
            >
              {
                data.flightsData[FlightType.OUTBOUND]?.flight.flightLegs[FlightLegType.DEPARTURE].flightRoute
                  .departureAirport.IATA
              }
              {' - '}
              {
                data.flightsData[FlightType.OUTBOUND]?.flight.flightLegs[FlightLegType.DEPARTURE].flightRoute
                  .arrivalAirport.IATA
              }
            </button>

            {data.flightsData[FlightType.OUTBOUND]?.flight.hasTransit && (
              <>
                <button
                  onClick={() => {
                    setFlightType(FlightType.OUTBOUND)
                    setFlightLegType(FlightLegType.TRANSIT)
                  }}
                  className={classNames('rounded-t border-2 border-b-0 p-2 px-4 text-xl font-bold text-gray-400', {
                    '-mb-0.5 border-primary bg-white text-primary':
                      flightType === FlightType.OUTBOUND && flightLegType === FlightLegType.TRANSIT,
                    'border-dashed': flightType !== FlightType.OUTBOUND || flightLegType !== FlightLegType.TRANSIT,
                  })}
                >
                  {
                    data.flightsData[FlightType.OUTBOUND]?.flight.flightLegs[FlightLegType.TRANSIT].flightRoute
                      .departureAirport.IATA
                  }
                  {' - '}
                  {
                    data.flightsData[FlightType.OUTBOUND]?.flight.flightLegs[FlightLegType.TRANSIT].flightRoute
                      .arrivalAirport.IATA
                  }
                </button>
              </>
            )}

            {data.searchData.isRoundTrip && (
              <>
                <button
                  onClick={() => {
                    setFlightType(FlightType.INBOUND)
                    setFlightLegType(FlightLegType.DEPARTURE)
                  }}
                  className={classNames('rounded-t border-2 border-b-0 p-2 px-4 text-xl font-bold text-gray-400', {
                    '-mb-0.5 border-primary bg-white text-primary':
                      flightType === FlightType.INBOUND && flightLegType === FlightLegType.DEPARTURE,
                    'border-dashed': flightType !== FlightType.INBOUND || flightLegType !== FlightLegType.DEPARTURE,
                  })}
                >
                  {
                    data.flightsData[FlightType.INBOUND]?.flight.flightLegs[FlightLegType.DEPARTURE].flightRoute
                      .departureAirport.IATA
                  }
                  {' - '}
                  {
                    data.flightsData[FlightType.INBOUND]?.flight.flightLegs[FlightLegType.DEPARTURE].flightRoute
                      .arrivalAirport.IATA
                  }
                </button>

                {data.flightsData[FlightType.INBOUND]?.flight.hasTransit && (
                  <>
                    <button
                      onClick={() => {
                        setFlightType(FlightType.INBOUND)
                        setFlightLegType(FlightLegType.TRANSIT)
                      }}
                      className={classNames('rounded-t border-2 border-b-0 p-2 px-4 text-xl font-bold text-gray-400', {
                        '-mb-0.5 border-primary bg-white text-primary':
                          flightType === FlightType.INBOUND && flightLegType === FlightLegType.TRANSIT,
                        'border-dashed': flightType !== FlightType.INBOUND || flightLegType !== FlightLegType.TRANSIT,
                      })}
                    >
                      {
                        data.flightsData[FlightType.INBOUND]?.flight.flightLegs[FlightLegType.TRANSIT].flightRoute
                          .departureAirport.IATA
                      }
                      {' - '}
                      {
                        data.flightsData[FlightType.INBOUND]?.flight.flightLegs[FlightLegType.TRANSIT].flightRoute
                          .arrivalAirport.IATA
                      }
                    </button>
                  </>
                )}
              </>
            )}
          </div>
          <div className=' rounded border-2 p-8 shadow-md'>
            <div className='pb-8 text-lg'>
              {flightLeg?.flightRoute.departureAirport.name} ({flightLeg?.flightRoute.departureAirport.IATA}){' - '}
              {flightLeg?.flightRoute.arrivalAirport.name} ({flightLeg?.flightRoute.arrivalAirport.IATA})
            </div>
            <div className='grid grid-cols-6 gap-16'>
              <div className='col-span-3 flex flex-col gap-y-2'>
                <div className='mb-2 text-xl'>Hành Khách</div>
                {data.passengersData[PassengerType.ADULT]?.map((passenger, index) => (
                  <button
                    onClick={() => {
                      setPassengerType(PassengerType.ADULT)
                      setPassengerIndex(index)
                    }}
                    className={classNames('flex justify-between rounded-md border-2 p-2 px-4', {
                      'border-primary': passengerIndex === index && passengerType === PassengerType.ADULT,
                    })}
                  >
                    <span>
                      {passenger.lastName} {passenger.firstName}
                    </span>
                    <span className='text-primary'>
                      ({seatsData[flightType][flightLegType][PassengerType.ADULT][index]?.code || 'chưa chọn ghế'})
                    </span>
                  </button>
                ))}
                {data.passengersData[PassengerType.CHILD]?.map((passenger, index) => (
                  <button
                    onClick={() => {
                      setPassengerType(PassengerType.CHILD)
                      setPassengerIndex(index)
                    }}
                    className={classNames('flex justify-between rounded-md border-2 p-2 px-4', {
                      'border-primary': passengerIndex === index && passengerType === PassengerType.CHILD,
                    })}
                  >
                    <span>
                      {passenger.lastName} {passenger.firstName}
                    </span>
                    <span className='text-primary'>
                      ({seatsData[flightType][flightLegType][PassengerType.CHILD][index]?.code || 'chưa chọn ghế'})
                    </span>
                  </button>
                ))}

                {/* <div className='flex justify-between rounded-md border-2 border-primary bg-sky-100 p-2 px-4'>
                  <span>Vu Lam</span>
                  <span className='text-primary'>(chưa chọn ghế)</span>
                </div> */}
                {/* <div className='flex justify-between rounded-md border-2 p-2 px-4'>
                  <span>Vu Lam2</span>
                  <span className='text-primary'>(chưa chọn ghế)</span>
                </div> */}
              </div>
              <Note />
            </div>
            <div className='mt-16 flex justify-center'>
              <SeatMap aircraftModel={aircraftModel!} onSelectSeat={selectSeat} />
            </div>
          </div>
        </div>
        <WizardBottomNavBar
          isForwardEnabled={isForwardAble}
          onClickForward={onForward}
          isBackwardEnabled={false}
          onClickBackward={() => {}}
        />
      </div>

      <PaymentSummaryCard className='col-span-4' />
    </div>
  )
}

interface NoteProps {}

const Note: FunctionComponent<NoteProps> = () => {
  return (
    <div className='col-span-2 col-start-5 flex flex-col gap-y-2'>
      <div className='mb-2 text-lg'>Chú Thích</div>
      <div className='flex'>
        <OpenSeatIcon />
        <span className='ml-2'>Ghế không còn trống</span>
      </div>
      <div className='flex'>
        <OccupiedSeatIcon />
        <span className='ml-2'>Ghế trống</span>
      </div>
      <div className='flex'>
        <div className=' text-red-600'>
          <i className='fa-sharp fa-solid fa-caret-left m-2'></i>
        </div>
        <div className='-scale-x-100 text-red-600'>
          <i className='fa-sharp fa-solid fa-caret-left m-2'></i>
        </div>
        <span className='ml-2'>Cửa</span>
      </div>
    </div>
  )
}

interface SeatMapProps {
  aircraftModel: IAircraftModel
  onSelectSeat: (seat: ISeat) => void
}

const SeatMap: FunctionComponent<SeatMapProps> = ({ aircraftModel, onSelectSeat }) => {
  const seatMap = aircraftModel.seatMap as IAircraftSeatMap
  return (
    <div className='flex'>
      <div>
        <Shell side='left' />
        <Shell side='left' />
        {seatMap.map((cabin, index) => (
          <>
            <Shell side='left' />
            {cabin.map.map((row, rowIndex) => (
              <Shell key={rowIndex} side='left' exit={row.hasExit} />
            ))}
          </>
        ))}
        {/* {new Array(5).fill(0).map((_, index) => (
          <Shell key={index} side='left' />
        ))}
        <Shell side='left' exit />
        {new Array(5).fill(0).map((_, index) => (
          <Shell key={index} side='left' />
        ))}
        <Shell side='left' wing='top' />
        {new Array(6).fill(0).map((_, index) => (
          <Shell key={index} side='left' wing='middle' />
        ))}
        <Shell side='left' wing='bottom' />
        {new Array(14).fill(0).map((_, index) => (
          <Shell key={index} side='left' />
        ))} */}
      </div>
      <div>
        <div className='inline-block  px-2  text-center '>
          <div className='my-4 h-8 text-center text-lg'>{aircraftModel.name}</div>
          {seatMap.map((cabin, index) => (
            <Cabin key={index} cabin={cabin} onSelectSeat={onSelectSeat} />
          ))}
        </div>
        <div className='z-50 h-8 -translate-y-2 bg-white'></div>
      </div>
      <div>
        <Shell side='right' />
        <Shell side='right' />
        {seatMap.map((cabin, index) => (
          <>
            <Shell side='right' />
            {cabin.map.map((row, rowIndex) => (
              <Shell key={rowIndex} side='right' exit={row.hasExit} />
            ))}
          </>
        ))}
      </div>
    </div>
  )
}

interface CabinProps {
  cabin: ICabinModel
  onSelectSeat: (seat: ISeat) => void
}

const Cabin: FunctionComponent<CabinProps> = ({ cabin, onSelectSeat }) => {
  return (
    <>
      <div className='flex justify-between'>
        {new Array(cabin.noCol).fill(0).map((_, index) => (
          <>
            <div className='bold aspect-square w-8'>{numberToAlphabet(index + 1)}</div>
            {cabin.aisleCol.includes(index + 1) && <div className='bold aspect-square w-8'></div>}
          </>
        ))}
      </div>
      {cabin.map.map((row, rowIndex) => (
        <div key={rowIndex} className='flex justify-between'>
          {row.seats.map((seat, seatIndex) => {
            return (
              <>
                <Seat seat={seat} onClick={onSelectSeat} />
                {cabin.aisleCol.includes(seatIndex + 1) && <div className='aspect-square w-8 p-1'>{row.index + 1}</div>}
              </>
            )
          })}
        </div>
      ))}
    </>
  )
}

interface ShellProps {
  side?: 'left' | 'right'
  wing?: 'top' | 'middle' | 'bottom'
  exit?: boolean
}

const Shell: FunctionComponent<ShellProps> = (props) => {
  return (
    <div
      className={classNames('flex', {
        '-scale-x-100': props.side === 'left',
      })}
    >
      <div
        className={classNames('h-8 border-2', {
          'border-gray-500': !props.exit,
          'border-red-600': props.exit,
        })}
      ></div>
      <div className='aspect-square w-8'>
        {props.wing ? <img src={`/src/assets/images/aircraft/wing-${props.wing}.png`} /> : null}
        {props.exit ? (
          <span className=' text-red-600'>
            <i className='fa-sharp fa-solid fa-caret-left m-2'></i>
          </span>
        ) : null}
      </div>
    </div>
  )
}

interface SeatProps {
  seat: ISeat
  onClick: (seat: ISeat) => void
}

const Seat: FunctionComponent<SeatProps> = ({ seat, onClick }) => {
  return (
    <button onClick={() => onClick(seat)} className='aspect-square w-8 p-1 hover:bg-sky-100 hover:ring'>
      <OpenSeatIcon />
    </button>
  )
}

export default SeatsSelection
