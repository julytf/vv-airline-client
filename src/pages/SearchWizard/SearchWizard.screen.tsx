import WizardNavBar from '@/components/SearchWizard/NavBar/WizardNavBar'
import { FunctionComponent } from 'react'
import { Outlet } from 'react-router-dom'

import Payment from '@/components/SearchWizard/steps/Payment'
import FlightsSelection from '@/components/SearchWizard/steps/FlightsSelection'
import SeatsSelection from '@/components/SearchWizard/steps/SeatsSelection'
import PassengersInformation from '@/components/SearchWizard/steps/PassengersInformation'
import SearchWizardContext from '@/contexts/SearchWizard.context'

export type SearchWizardStep = {
  index: number
  title: string
  icon: string
  path: string
}

export const searchWizardSteps: SearchWizardStep[] = [
  {
    index: 0,
    title: 'Chọn chuyến bay',
    icon: 'fa-plane',
    path: '/wizard/flights-selection',
  },
  {
    index: 1,
    title: 'Thông tin hành khách',
    icon: 'fa-user',
    path: '/wizard/passengers-information',
  },
  {
    index: 2,
    title: 'Chọn ghế',
    icon: 'fa-seat-airline',
    path: '/wizard/seats-selection',
  },
  {
    index: 3,
    title: 'Thanh toán',
    icon: 'fa-credit-card',
    path: '/wizard/payment',
  },
]

interface SearchWizardProps {}

const SearchWizard: FunctionComponent<SearchWizardProps> = () => {
  const wizardData = {
    currentStep: 0,
  }

  return (
    <SearchWizardContext.Provider value={wizardData}>
      <div className='mt-8'>
        <WizardNavBar searchWizardSteps={searchWizardSteps} />
        <div className='mt-8'>
          <Outlet></Outlet>
        </div>
      </div>
    </SearchWizardContext.Provider>
  )
}

export default SearchWizard
