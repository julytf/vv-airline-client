import { joiResolver } from '@hookform/resolvers/joi'
import { format, subYears } from 'date-fns'
import Joi, { ValidationErrorItem } from 'joi'
import { FunctionComponent, useEffect, useRef, useState } from 'react'
import { Control, Controller, FieldErrors, FieldValues, SubmitHandler, UseFormRegister, useForm } from 'react-hook-form'
import { PassengerType } from '../../../../enums/passenger.enums'
import passengersInformationSchema from '../../../../utils/validations/searchWizard/passenger.schema'
import PaymentSummaryCard from '@/components/Card/PaymentSummaryCard'
import Loading from '@/components/ui/Loading'
import WizardBottomNavBar from '@/components/SearchWizard/NavBar/WizardBottomNavBar'
import { PassengersData, useSearchWizard } from '@/contexts/SearchWizard.context'
import { UserGender } from '@/enums/user.enums'
import PassengerInformationForm from './PassengerInformationForm'
import { useSelector } from 'react-redux'
import { AppState } from '@/services/state/store'

interface PassengersInformationProps {}

const PassengersInformation: FunctionComponent<PassengersInformationProps> = () => {
  const { user, isAuthenticated } = useSelector((state: AppState) => state.auth)
  console.log('user', user)
  console.log('user', new Date(user?.dateOfBirth || '').toString())

  const { data, setData, actions } = useSearchWizard()

  const [loading, setLoading] = useState(true)
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
    watch,
  } = useForm<PassengersData>({
    mode: 'onChange',
    resolver: joiResolver(passengersInformationSchema),
    defaultValues: {
      [PassengerType.ADULT]: [
        !isAuthenticated
          ? {}
          : {
              lastName: user?.lastName,
              firstName: user?.firstName,
              dateOfBirth: format(new Date(user?.dateOfBirth || ''), `yyyy-MM-dd`),
              gender: user?.gender,
              phoneNumber: user?.phoneNumber,
              email: user?.email,
            },
      ],
    },
  })
  const formData = watch()

  // console.log('-----------')
  // console.log('errors', errors)
  // console.log('isValid', isValid)
  // console.log('formData', formData)

  // console.log('validate', passengersInformationSchema.validate(formData))

  const isForwardAble = isValid
  const isBackwardAble = true

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log('data', data)
    // reset()
  }

  const onForward = () => {
    console.log('onForward', formData)

    setData((prev) => ({
      ...prev,
      passengersData: formData,
    }))

    actions.nextStep()
  }

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false)
  //   }, 500)
  // }, [])

  // if (loading) {
  //   return <Loading />
  // }
  return (
    <div>
      <div className='mx-auto mb-24 mt-16 grid grid-cols-12 gap-16'>
        <div className='col-span-8'>
          <form onSubmit={handleSubmit(onSubmit)} className='mx-auto flex max-w-2xl flex-col gap-y-16'>
            {/* <button>button</button> */}
            {new Array(data.searchData.passengers[PassengerType.ADULT]).fill(0).map((_, index) => (
              <PassengerInformationForm key={index} type={PassengerType.ADULT} index={index} control={control} />
            ))}
            {new Array(data.searchData.passengers[PassengerType.CHILD]).fill(0).map((_, index) => (
              <PassengerInformationForm key={index} type={PassengerType.CHILD} index={index} control={control} />
            ))}
          </form>
        </div>
        <PaymentSummaryCard className='col-span-4' />
      </div>
      <WizardBottomNavBar
        isForwardEnabled={isForwardAble}
        onClickForward={onForward}
        isBackwardEnabled={isBackwardAble}
        onClickBackward={actions.prevStep}
      />
    </div>
  )
}

export default PassengersInformation
