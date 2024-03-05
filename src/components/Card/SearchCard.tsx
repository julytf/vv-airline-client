import classNames from 'classnames'
import { FunctionComponent, ReactElement, forwardRef, useEffect, useRef, useState } from 'react'
import Button from '../ui/Button'
import Select from 'react-select'
import { NavLink, useNavigate } from 'react-router-dom'
import routes from '../../routers/user.router'
import DropDown from '../Dropdown/DropDown'
import searchWizardService from '@/services/searchWizard.service'
import IFlightRoute from '@/interfaces/flight/flightRoute.interface'
import IAirport from '@/interfaces/flight/airport.interface'
import { SearchData } from '@/contexts/SearchWizard.context'
import { route } from '@/utils/helpers'

interface SearchCardProps {
  className?: string
}

const SearchCard: FunctionComponent<SearchCardProps> = (props) => {
  const navigate = useNavigate()

  const [airports, setAirports] = useState([])

  const [formData, setFormData] = useState<Partial<SearchData>>({
    passengers: { adults: 1, children: 0 },
  })
  console.log(formData)

  useEffect(() => {
    searchWizardService.getAirports().then((airports) => {
      setAirports(airports)
    })
  }, [])

  const options = airports.map((airport: IAirport) => {
    return {
      value: airport.IATA,
      label: `${airport.city} (${airport.IATA}) - ${airport.country?.name}`,
    }
  })

  const onSearch = () => {
    if (
      !formData.departureAirportIATA ||
      !formData.arrivalAirportIATA ||
      !formData.departureDate ||
      // !formData.returnDate ||
      !formData.passengers
    ) {
      throw new Error('Invalid form data')
    }
    console.log('here')

    const query = {
      departureAirportIATA: formData.departureAirportIATA,
      arrivalAirportIATA: formData.arrivalAirportIATA,
      departureDate: formData.departureDate.toString(),
      returnDate: formData?.returnDate?.toString() || '',
      'passengers[adult]': formData.passengers.adults.toString(),
      'passengers[child]': formData.passengers.children.toString(),
    }
    console.log(query)

    navigate(
      route('/wizard', {
        query,
      }),
    )
  }
  return (
    <div className={classNames('inline-block rounded-xl border-2 border-primary p-6', props.className)}>
      <div className='flex gap-4'>
        <SelectInput
          name='departureAirport'
          placeholder='Điểm đi'
          icon={<i className='fa-regular fa-plane-departure'></i>}
          options={options}
          onChange={(v) => {
            setFormData((prev) => ({ ...prev, departureAirportIATA: v }) as Partial<SearchData>)
          }}
        />
        <SelectInput
          name='arrivalAirport'
          placeholder='Điểm đến'
          icon={<i className='fa-regular fa-plane-arrival'></i>}
          options={options}
          onChange={(v) => {
            setFormData((prev) => ({ ...prev, arrivalAirportIATA: v }) as Partial<SearchData>)
          }}
        />
        <DateInput
          name='departureDate'
          placeholder='Ngày đi'
          icon={<i className='fa-light fa-calendar-days'></i>}
          onChange={(v) => {
            setFormData((prev) => ({ ...prev, departureDate: v }) as Partial<SearchData>)
          }}
        />
        <DateInput
          name='returnDate'
          placeholder='Ngày về'
          icon={<i className='fa-light fa-calendar-days'></i>}
          onChange={(v) => {
            setFormData((prev) => ({ ...prev, returnDate: v }) as Partial<SearchData>)
          }}
        />
        <PassengerQuantityInput
          onChange={(v) => {
            setFormData((prev) => ({ ...prev, passengers: v }) as Partial<SearchData>)
          }}
        />
        {/* <NavLink to={'/wizard/flights-selection'}> */}
        <Button className='p-2.5 px-5' onClick={onSearch}>
          Tìm
        </Button>
        {/* </NavLink> */}
      </div>
    </div>
  )
}

interface SelectInputProps {
  name?: string
  placeholder?: string
  icon?: ReactElement
  options?: unknown[]
  onChange?: (e: unknown) => void
}

const SelectInput: FunctionComponent<SelectInputProps> = forwardRef(
  ({ name, placeholder, icon, options, onChange }, ref) => {
    return (
      <div className='relative'>
        <Select
          options={options}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              // padding: '0.125rem 0.125rem 0.125rem 2rem',
              border: 'none',
              outline: 'none',
              borderRadius: '0.5rem',
              paddingLeft: '2rem',
            }),
          }}
          className='absolute w-64 rounded-lg border text-left'
          placeholder={placeholder}
          onChange={(v) => onChange?.((v as { value: string }).value)}
        />
        <span className='pointer-events-none absolute  left-0 top-0 flex aspect-square w-10 items-center justify-center text-gray-500'>
          {icon}
        </span>
      </div>
    )
  },
)

interface DateInputProps {
  name?: string
  placeholder?: string
  icon?: ReactElement
  onChange?: (e: unknown) => void
}

const DateInput: FunctionComponent<DateInputProps> = ({ name, placeholder, icon, onChange }) => {
  const [dateString, setDateString] = useState('')
  const selectedDate = new Date(dateString)
  //   console.log(date)

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    onChange?.(dateString)
  }, [dateString])

  return (
    <div className='relative'>
      <label
        className='flex h-10 w-32 items-center justify-start rounded-md border border-gray-200 pl-8 shadow-sm sm:text-sm'
        onClick={() => inputRef.current?.showPicker()}
      >
        <span className='pointer-events-none absolute  left-0 top-0 flex aspect-square w-10 items-center justify-center text-gray-500'>
          {icon}
        </span>
        <input
          type='date'
          id={name}
          placeholder={placeholder}
          className='invisible w-0 p-0'
          ref={inputRef}
          value={dateString}
          onChange={(e) => {
            setDateString(e.target.value)
          }}
        />
        {dateString ? (
          <span className=' pl-2 '>
            {selectedDate.getDate()}/{selectedDate.getMonth() + 1}/{selectedDate.getFullYear()}
          </span>
        ) : (
          <span className=' pl-2 text-gray-500'>{placeholder}</span>
        )}
      </label>
    </div>
  )
}

interface PassengerQuantityInputProps {
  onChange?: (v: unknown) => void
}

const PassengerQuantityInput: FunctionComponent<PassengerQuantityInputProps> = ({ onChange }) => {
  const [adultPassengerQuantity, setAdultPassengerQuantity] = useState(1)
  const [childPassengerQuantity, setChildPassengerQuantity] = useState(0)

  const buttonRef = useRef<HTMLDivElement>(null)

  const [isShow, setIsShow] = useState(false)
  const onClick = () => {
    setIsShow(!isShow)
  }

  useEffect(() => {
    onChange?.({ adults: adultPassengerQuantity, children: childPassengerQuantity })
  }, [adultPassengerQuantity, childPassengerQuantity])

  return (
    <>
      <input
        type='text'
        value={adultPassengerQuantity}
        onChange={(e) => setAdultPassengerQuantity(+e.target.value)}
        className='hidden'
      />
      <input
        type='text'
        value={childPassengerQuantity}
        onChange={(e) => setChildPassengerQuantity(+e.target.value)}
        className='hidden'
      />
      <div className='relative' ref={buttonRef}>
        <div
          onClick={onClick}
          className='flex h-10 w-36 items-center justify-center rounded-md border border-gray-200 pl-8 shadow-sm sm:text-sm'
        >
          <span className='pointer-events-none absolute  left-0 top-0 flex aspect-square w-10 items-center justify-center text-gray-500'>
            <i className='fa-light fa-user'></i>
          </span>
          {adultPassengerQuantity + childPassengerQuantity} Hành Khách
        </div>

        <DropDown
          parentRef={buttonRef}
          isShow={isShow}
          onChangeShow={(newState) => {
            setIsShow(newState)
            // console.log(newState)
          }}
        >
          <DropDown.Row>
            <div className='w-full'>
              <div className='flex items-center justify-between'>
                <div className='flex'>
                  <div className='flex aspect-square h-10 items-center justify-center text-xl'>
                    <i className='fa-solid fa-person'></i>
                  </div>
                  <div className='flex flex-col justify-center text-left'>
                    <span className='bold text-sm'>Người lớn</span>
                    <span className='text-xs text-gray-400'>12 tuổi trở lên</span>
                  </div>
                </div>
                <div className='flex gap-2'>
                  <button
                    onClick={() => setAdultPassengerQuantity((prev) => prev - 1)}
                    className='aspect-square w-6 rounded-full border'
                  >
                    <i className='fa-solid fa-minus'></i>
                  </button>
                  <span>{adultPassengerQuantity}</span>
                  <button
                    onClick={() => setAdultPassengerQuantity((prev) => prev + 1)}
                    className='aspect-square w-6 rounded-full border'
                  >
                    <i className='fa-solid fa-plus'></i>
                  </button>
                </div>
              </div>
            </div>
          </DropDown.Row>
          <DropDown.Row>
            <div className='w-full'>
              <div className='flex items-center justify-between'>
                <div className='flex'>
                  <div className='flex aspect-square h-10 items-center justify-center text-xl'>
                    <i className='fa-solid fa-child'></i>
                  </div>
                  <div className='flex flex-col justify-center text-left'>
                    <span className='bold text-sm'>Trẻ em</span>
                    <span className='text-xs text-gray-400'>2-12 tuổi</span>
                  </div>
                </div>
                <div className='flex gap-2'>
                  <button
                    onClick={() => setChildPassengerQuantity((prev) => prev - 1)}
                    className='aspect-square w-6 rounded-full border'
                  >
                    <i className='fa-solid fa-minus'></i>
                  </button>
                  <span>{childPassengerQuantity}</span>
                  <button
                    onClick={() => setChildPassengerQuantity((prev) => prev + 1)}
                    className='aspect-square w-6 rounded-full border'
                  >
                    <i className='fa-solid fa-plus'></i>
                  </button>
                </div>
              </div>
            </div>
          </DropDown.Row>
        </DropDown>
      </div>
    </>
  )
}

export default SearchCard
