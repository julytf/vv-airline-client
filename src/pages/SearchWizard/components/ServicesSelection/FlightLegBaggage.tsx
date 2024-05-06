import Button from '@/components/ui/Button'
import { SeatsData, WizardData } from '@/contexts/SearchWizard.context'
import { FlightType } from '@/enums/flight.enums'
import { FlightLegType } from '@/enums/flightLeg.enums'
import { PassengerType } from '@/enums/passenger.enums'
import { Dispatch, FunctionComponent } from 'react'

interface FlightLegBaggageProps {
  wizardData: WizardData
  seatsData: SeatsData
  baggagePrice: number
  setBaggage: (
    quantity: number,
    flightType: FlightType,
    flightLegType: FlightLegType,
    passengerType: PassengerType,
    index: number,
  ) => void
  flightType: FlightType
  flightLegType: FlightLegType
}

const FlightLegBaggage: FunctionComponent<FlightLegBaggageProps> = ({
  wizardData,
  seatsData,
  baggagePrice,
  setBaggage,
  flightType,
  flightLegType,
}) => {
  return (
    <div className='flex flex-col gap-4 rounded-md border p-6'>
      <div className='text-xl font-semibold'>
        {wizardData.flightsData[flightType]?.flight.flightLegs[flightLegType].flightRoute.departureAirport.name}(
        {wizardData.flightsData[flightType]?.flight.flightLegs[flightLegType].flightRoute.departureAirport.IATA}) -{' '}
        {wizardData.flightsData[flightType]?.flight.flightLegs[flightLegType].flightRoute.arrivalAirport.name}(
        {wizardData.flightsData[flightType]?.flight.flightLegs[flightLegType].flightRoute.arrivalAirport.IATA})
      </div>
      {wizardData.passengersData[PassengerType.ADULT].map((passenger, index) => (
        <div key={index} className='flex justify-between gap-2'>
          <span className='text-xl'>
            {passenger.lastName} {passenger.firstName}
          </span>
          <span className='flex gap-2'>
            <span className=''>
              +
              {(
                (seatsData[flightType][flightLegType][PassengerType.ADULT][index].services?.baggage?.quantity || 0) *
                baggagePrice
              ).toLocaleString()}{' '}
              vnđ
            </span>
            <Button
              onClick={() =>
                setBaggage(
                  Math.max(
                    0,
                    (seatsData[flightType][flightLegType][PassengerType.ADULT][index].services?.baggage?.quantity || 0) -
                      1,
                  ),
                  flightType,
                  flightLegType,
                  PassengerType.ADULT,
                  index,
                )
              }
              outline
            >
              <span className='text-primary'>
                <i className='fa-solid fa-minus'></i>
              </span>
            </Button>
            <div className='w-16 rounded-md border text-center  '>
              {seatsData[flightType][flightLegType][PassengerType.ADULT][index].services?.baggage?.quantity || 0}
            </div>
            <Button
              onClick={() =>
                setBaggage(
                  Math.min(
                    15,
                    (seatsData[flightType][flightLegType][PassengerType.ADULT][index].services?.baggage?.quantity || 0) +
                      1,
                  ),
                  flightType,
                  flightLegType,
                  PassengerType.ADULT,
                  index,
                )
              }
              outline
            >
              <span className='text-primary'>
                <i className='fa-solid fa-plus'></i>
              </span>
            </Button>
          </span>
        </div>
      ))}
      {wizardData.passengersData[PassengerType.CHILD]?.map((passenger, index) => (
        <div key={index} className='flex justify-between gap-2'>
          <span className='text-xl'>
            {passenger.lastName} {passenger.firstName}
          </span>
          <span className='flex gap-2'>
            <span className=''>
              +
              {(
                (seatsData[flightType][flightLegType][PassengerType.CHILD][index].services?.baggage?.quantity || 0) *
                baggagePrice
              ).toLocaleString()}{' '}
              vnđ
            </span>
            <Button
              onClick={() =>
                setBaggage(
                  Math.max(
                    0,
                    (seatsData[flightType][flightLegType][PassengerType.CHILD][index].services?.baggage?.quantity || 0) -
                      1,
                  ),
                  flightType,
                  flightLegType,
                  PassengerType.CHILD,
                  index,
                )
              }
              outline
            >
              <span className='text-primary'>
                <i className='fa-solid fa-minus'></i>
              </span>
            </Button>
            <div className='w-16 rounded-md border text-center  '>
              {seatsData[flightType][flightLegType][PassengerType.CHILD][index].services?.baggage?.quantity || 0}
            </div>
            <Button
              onClick={() =>
                setBaggage(
                  Math.min(
                    15,
                    (seatsData[flightType][flightLegType][PassengerType.CHILD][index].services?.baggage?.quantity || 0) +
                      1,
                  ),
                  flightType,
                  flightLegType,
                  PassengerType.CHILD,
                  index,
                )
              }
              outline
            >
              <span className='text-primary'>
                <i className='fa-solid fa-plus'></i>
              </span>
            </Button>
          </span>
        </div>
      ))}
    </div>
  )
}

export default FlightLegBaggage
