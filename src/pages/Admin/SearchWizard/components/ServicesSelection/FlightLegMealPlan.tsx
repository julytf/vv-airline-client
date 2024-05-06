import Button from '@/components/ui/Button'
import { SeatsData, WizardData } from '@/contexts/SearchWizard.context'
import { FlightType } from '@/enums/flight.enums'
import { FlightLegType } from '@/enums/flightLeg.enums'
import { PassengerType } from '@/enums/passenger.enums'
import IMealPlan from '@/interfaces/flight/mealPlan.interface'
import { Dispatch, FunctionComponent } from 'react'

interface FlightLegMealPlanProps {
  wizardData: WizardData
  seatsData: SeatsData
  mealPlans: IMealPlan[]
  setMealPlan: (
    mealPlan: IMealPlan,
    flightType: FlightType,
    flightLegType: FlightLegType,
    passengerType: PassengerType,
    index: number,
  ) => void
  flightType: FlightType
  flightLegType: FlightLegType
}

const FlightLegMealPlan: FunctionComponent<FlightLegMealPlanProps> = ({
  wizardData,
  seatsData,
  mealPlans,
  setMealPlan,
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
            <select
              onChange={(e) =>
                setMealPlan(
                  mealPlans.find((m) => m.name === e.target.value)!,
                  flightType,
                  flightLegType,
                  PassengerType.ADULT,
                  index,
                )
              }
              value={seatsData[flightType][flightLegType][PassengerType.ADULT][index].services?.meal?.name}
              className='rounded-md border'
            >
              <option value=''>--- chọn suất ăn ---</option>
              {mealPlans.map((mealPlan, index) => (
                <option key={index} value={mealPlan.name}>
                  {mealPlan.title}
                </option>
              ))}
            </select>
          </span>
        </div>
      ))}
      {wizardData.passengersData[PassengerType.CHILD]?.map((passenger, index) => (
        <div key={index} className='flex justify-between gap-2'>
          <span className='text-xl'>
            {passenger.lastName} {passenger.firstName}
          </span>
          <span className='flex gap-2'>
            <select
              onChange={(e) =>
                setMealPlan(
                  mealPlans.find((m) => m.name === e.target.value)!,
                  flightType,
                  flightLegType,
                  PassengerType.CHILD,
                  index,
                )
              }
              value={seatsData[flightType][flightLegType][PassengerType.CHILD][index].services?.meal?.name}
              className='rounded-md border'
            >
              <option value=''>--- chọn suất ăn ---</option>
              {mealPlans.map((mealPlan, index) => (
                <option key={index} value={mealPlan.name}>
                  {mealPlan.title}
                </option>
              ))}
            </select>
          </span>
        </div>
      ))}
    </div>
  )
}

export default FlightLegMealPlan
