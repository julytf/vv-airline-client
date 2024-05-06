import Button from '@/components/ui/Button'
import { FlightsData, SeatsData, WizardData } from '@/contexts/SearchWizard.context'
import { FlightType } from '@/enums/flight.enums'
import { FlightLegType } from '@/enums/flightLeg.enums'
import { PassengerType } from '@/enums/passenger.enums'
import { Dispatch, FunctionComponent } from 'react'
import ReactModal from 'react-modal'
import FlightLegBaggage from './FlightLegBaggage'

interface BaggageModalProps {
  isOpen: boolean
  onRequestClose: () => void
  wizardData: WizardData
  seatsData: SeatsData
  setSeatsData: Dispatch<React.SetStateAction<SeatsData>>
}

const BaggageModal: FunctionComponent<BaggageModalProps> = ({
  isOpen,
  onRequestClose,
  wizardData,
  seatsData,
  setSeatsData,
}) => {
  const baggagePrice = 500_000

  const setBaggage = (
    quantity: number,
    flightType: FlightType,
    flightLegType: FlightLegType,
    passengerType: PassengerType,
    index: number,
  ) => {
    setSeatsData((prev) => {
      prev[flightType][flightLegType][passengerType][index].services = {
        ...prev[flightType][flightLegType][passengerType][index].services,
        baggage: {
          quantity,
          charge: quantity * baggagePrice,
        },
      }
      return { ...prev }
    })
  }
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
        <FlightLegBaggage
          flightType={FlightType.OUTBOUND}
          flightLegType={FlightLegType.DEPARTURE}
          baggagePrice={baggagePrice}
          wizardData={wizardData}
          seatsData={seatsData}
          setBaggage={setBaggage}
        />
        {wizardData.flightsData[FlightType.OUTBOUND]?.flight.hasTransit && (
          <FlightLegBaggage
            flightType={FlightType.OUTBOUND}
            flightLegType={FlightLegType.TRANSIT}
            baggagePrice={baggagePrice}
            wizardData={wizardData}
            seatsData={seatsData}
            setBaggage={setBaggage}
          />
        )}

        {wizardData.searchData.isRoundTrip && (
          <>
            <FlightLegBaggage
              flightType={FlightType.INBOUND}
              flightLegType={FlightLegType.DEPARTURE}
              baggagePrice={baggagePrice}
              wizardData={wizardData}
              seatsData={seatsData}
              setBaggage={setBaggage}
            />
            {wizardData.flightsData[FlightType.INBOUND]?.flight.hasTransit && (
              <FlightLegBaggage
                flightType={FlightType.INBOUND}
                flightLegType={FlightLegType.TRANSIT}
                baggagePrice={baggagePrice}
                wizardData={wizardData}
                seatsData={seatsData}
                setBaggage={setBaggage}
              />
            )}
          </>
        )}
      </div>
    </ReactModal>
  )
}

export default BaggageModal
