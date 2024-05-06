import Button from '@/components/ui/Button'
import { FlightsData, SeatsData, useSearchWizard, WizardData } from '@/contexts/SearchWizard.context'
import { FlightType } from '@/enums/flight.enums'
import { FlightLegType } from '@/enums/flightLeg.enums'
import { PassengerType } from '@/enums/passenger.enums'
import { Dispatch, FunctionComponent, useEffect, useState } from 'react'
import ReactModal from 'react-modal'
import FlightLegMealPlan from './FlightLegMealPlan'
import IMealPlan from '@/interfaces/flight/mealPlan.interface'
import Loading from '@/components/ui/Loading'
import mealPlansService from '@/services/mealPlans.service'

interface MealPlanModalProps {
  isOpen: boolean
  onRequestClose: () => void
  wizardData: WizardData
  seatsData: SeatsData
  setSeatsData: Dispatch<React.SetStateAction<SeatsData>>
}

const MealPlanModal: FunctionComponent<MealPlanModalProps> = ({
  isOpen,
  onRequestClose,
  wizardData,
  seatsData,
  setSeatsData,
}) => {
  const {data} = useSearchWizard()

  // const [mealPlans, setMealPlans] = useState<IMealPlan[]>([])

  // const [isLoading, setIsLoading] = useState(false)

  // useEffect(() => {
  //   mealPlansService.getMealPlans().then((data) => {
  //     setMealPlans(data)
  //     setIsLoading(false)
  //   })
  // }, [])

  const setMealPlan = (
    mealPlan: IMealPlan,
    flightType: FlightType,
    flightLegType: FlightLegType,
    passengerType: PassengerType,
    index: number,
  ) => {
    setSeatsData((prev) => {
      prev[flightType][flightLegType][passengerType][index].services = {
        ...prev[flightType][flightLegType][passengerType][index].services,
        meal: {
          name: mealPlan?.name,
          charge: mealPlan?.value || 0,
        },
      }
      return { ...prev }
    })
  }

  // if (isLoading) return <Loading />

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000,
          padding: '256px',
        },
        content: {
          maxWidth: '800px',
          margin: 'auto',
        },
      }}
      ariaHideApp={false}
    >
      <button onClick={onRequestClose} className='absolute right-5 top-5 p-2'>
        <span className='text-2xl'>
          <i className='fa-solid fa-x'></i>
        </span>
      </button>
      <div className='flex flex-col gap-4'>
        <div className='text-2xl font-bold'>Dịch vụ hành lý</div>
        <FlightLegMealPlan
          flightType={FlightType.OUTBOUND}
          flightLegType={FlightLegType.DEPARTURE}
          mealPlans={data.additionalData.mealPlans}
          wizardData={wizardData}
          seatsData={seatsData}
          setMealPlan={setMealPlan}
        />
        {wizardData.flightsData[FlightType.OUTBOUND]?.flight.hasTransit && (
          <FlightLegMealPlan
            flightType={FlightType.OUTBOUND}
            flightLegType={FlightLegType.TRANSIT}
            mealPlans={data.additionalData.mealPlans}
            wizardData={wizardData}
            seatsData={seatsData}
            setMealPlan={setMealPlan}
          />
        )}

        {wizardData.searchData.isRoundTrip && (
          <>
            <FlightLegMealPlan
              flightType={FlightType.INBOUND}
              flightLegType={FlightLegType.DEPARTURE}
              mealPlans={data.additionalData.mealPlans}
              wizardData={wizardData}
              seatsData={seatsData}
              setMealPlan={setMealPlan}
            />
            {wizardData.flightsData[FlightType.INBOUND]?.flight.hasTransit && (
              <FlightLegMealPlan
                flightType={FlightType.INBOUND}
                flightLegType={FlightLegType.TRANSIT}
                mealPlans={data.additionalData.mealPlans}
                wizardData={wizardData}
                seatsData={seatsData}
                setMealPlan={setMealPlan}
              />
            )}
          </>
        )}
      </div>
    </ReactModal>
  )
}

export default MealPlanModal
