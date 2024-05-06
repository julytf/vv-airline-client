import { FunctionComponent, useEffect, useState } from 'react'
import PaymentSummaryCard from '@/components/Card/PaymentSummaryCard'
import Loading from '@/components/ui/Loading'
import WizardBottomNavBar from '@/components/SearchWizard/NavBar/WizardBottomNavBar'
import { SeatsData, useSearchWizard } from '@/contexts/SearchWizard.context'
import { countNonEmpty, numberToAlphabet } from '@/utils/helpers'
import { FlightType } from '@/enums/flight.enums'
import { FlightLegType } from '@/enums/flightLeg.enums'
import { PassengerType } from '@/enums/passenger.enums'
import ISeat from '@/interfaces/aircraft/seat.interface'
import searchWizardService from '@/services/searchWizard.service'
import IReservation from '@/interfaces/booking/reservation.interface'
import ReactModal from 'react-modal'
import BaggageModal from './BaggageModal'
import MealPlanModal from './MealPlanModal'

interface ServicesSelectionProps {}

const ServicesSelection: FunctionComponent<ServicesSelectionProps> = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isBaggageModalOpen, setIsBaggageModalOpen] = useState(false)
  const [isMealPlanModalOpen, setIsMealPlanModalOpen] = useState(false)

  const { data, setData, actions } = useSearchWizard()

  const [seatsData, setSeatsData] = useState<SeatsData>(data.seatsData)

  // TODO:
  const isForwardAble = true

  //   console.log('----------------')
  //   console.log('----------------')
  //   console.log('----------------')
  //   console.log('isOutboundDepartureFlightSeatsValid', isOutboundDepartureFlightSeatsValid)
  //   console.log('isOutboundTranSitFlightSeatsValid', isOutboundTranSitFlightSeatsValid)
  //   console.log('isInboundDepartureFlightSeatsValid', isInboundDepartureFlightSeatsValid)
  //   console.log('isInboundTranSitFlightSeatsValid', isInboundTranSitFlightSeatsValid)
  //   console.log('----------------')
  //   console.log('isOutboundFlightSeatsValid', isOutboundFlightSeatsValid)
  //   console.log('isInboundFlightSeatsValid', isInboundFlightSeatsValid)
  //   console.log('----------------')
  //   console.log('isForwardAble', isForwardAble)

  const onForward = () => {
    setData((prev) => {
      prev.seatsData = seatsData
      return { ...prev }
    })
    actions.nextStep()
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className=' my-16 grid grid-cols-12 gap-16'>
      <div className='col-span-7 flex flex-col gap-y-8'>
        <div className='mx-auto flex w-96 max-w-5xl flex-col items-center justify-center gap-4 text-center'>
          <div className='text-2xl font-bold'>Dịch vụ bổ trợ</div>
          <button
            onClick={() => setIsBaggageModalOpen(true)}
            className='w-full rounded-md border-2 p-6 text-2xl active:scale-95'
          >
            <i className='fa-regular fa-suitcase-rolling'></i>
            <span className='ml-2'>Hành Lý</span>
          </button>
          <button
            onClick={() => setIsMealPlanModalOpen(true)}
            className='w-full rounded-md border-2 p-6 text-2xl active:scale-95'
          >
            <i className='fa-regular fa-pot-food'></i>
            <span className='ml-2'>Chọn Suất ăn</span>
          </button>
        </div>
        <WizardBottomNavBar
          isForwardEnabled={isForwardAble}
          onClickForward={onForward}
          isBackwardEnabled={false}
          onClickBackward={() => {}}
        />
      </div>

      <PaymentSummaryCard className='col-span-5' seatsData={data.seatsData} />
      <BaggageModal
        isOpen={isBaggageModalOpen}
        onRequestClose={() => setIsBaggageModalOpen(false)}
        wizardData={data}
        seatsData={seatsData}
        setSeatsData={setSeatsData}
      />
      <MealPlanModal
        isOpen={isMealPlanModalOpen}
        onRequestClose={() => setIsMealPlanModalOpen(false)}
        wizardData={data}
        seatsData={seatsData}
        setSeatsData={setSeatsData}
      />
    </div>
  )
}

export default ServicesSelection
