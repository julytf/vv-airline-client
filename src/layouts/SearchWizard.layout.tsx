import { FunctionComponent } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header/Header'
import WizardNavBar from '../components/NavBar/WizardNavBar'

interface SearchWizardProps {}

const SearchWizard: FunctionComponent<SearchWizardProps> = () => {
  return (
    <div className='mt-8'>
      <WizardNavBar />
      <div className='mt-8'>
        <Outlet></Outlet>
      </div>
    </div>
  )
}

export default SearchWizard
