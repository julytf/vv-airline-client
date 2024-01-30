import classNames from 'classnames'
import { FunctionComponent, ReactElement, forwardRef, useRef, useState } from 'react'
import Button from '../ui/Button'
import Select from 'react-select'
import { NavLink } from 'react-router-dom'
import routes from '../../routers'
import DropDown from '../Dropdown/DropDown'

interface SearchCardProps {
  className?: string
}

const SearchCard: FunctionComponent<SearchCardProps> = (props) => {
  const options = [
    { value: '', label: 'Hà Nội' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
    { value: 'vanilla', label: 'Vanilla' },
    { value: 'vanilla', label: 'Vanilla' },
    { value: 'vanilla', label: 'Vanilla' },
    { value: 'vanilla', label: 'Vanilla' },
    { value: 'vanilla', label: 'Vanilla' },
    { value: 'vanilla', label: 'Vanilla' },
    { value: 'vanilla', label: 'Vanilla' },
    { value: 'vanilla', label: 'Vanilla' },
  ]

  return (
    <div className={classNames('inline-block rounded-xl border-2 border-primary p-6', props.className)}>
      <div className='flex gap-4'>
        <SelectInput
          name='departureAirport'
          placeholder='Điểm đi'
          icon={<i className='fa-regular fa-plane-departure'></i>}
          options={options}
        />
        <SelectInput
          name='arrivalAirport'
          placeholder='Điểm đến'
          icon={<i className='fa-regular fa-plane-arrival'></i>}
        />
        <DateInput
          name='departureDate'
          placeholder='Thời gian đi'
          icon={<i className='fa-light fa-calendar-days'></i>}
        />
        <DateInput name='arrivalDate' placeholder='Thời gian về' icon={<i className='fa-light fa-calendar-days'></i>} />
        <PassengerQuantityInput />
        <NavLink to={'/wizard/flights-selection'}>
          <Button className='p-2.5 px-5'>Tìm</Button>
        </NavLink>
      </div>
    </div>
  )
}

interface SelectInputProps {
  name?: string
  placeholder?: string
  icon?: ReactElement
  options?: unknown[]
}

const SelectInput: FunctionComponent<SelectInputProps> = (props) => {
  return (
    <div className='relative'>
      <Select
        options={props.options}
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
        placeholder={props.placeholder}
      />
      <span className='pointer-events-none absolute  left-0 top-0 flex aspect-square w-10 items-center justify-center text-gray-500'>
        {props.icon}
      </span>
    </div>
  )
}

interface DateInputProps {
  name?: string
  placeholder?: string
  icon?: ReactElement
}

const DateInput: FunctionComponent<DateInputProps> = (props) => {
  const [dateString, setDateString] = useState('')
  const selectedDate = new Date(dateString)
  //   console.log(date)

  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className='relative'>
      <label
        className='flex h-10 w-32 items-center justify-center rounded-md border border-gray-200 pl-8 shadow-sm sm:text-sm'
        onClick={() => inputRef.current?.showPicker()}
      >
        <span className='pointer-events-none absolute  left-0 top-0 flex aspect-square w-10 items-center justify-center text-gray-500'>
          {props.icon}
        </span>
        <input
          type='date'
          id={props.name}
          placeholder={props.placeholder}
          className='invisible w-0 p-0'
          ref={inputRef}
          value={dateString}
          onChange={(e) => setDateString(e.target.value)}
        />
        {dateString ? (
          <span>
            {selectedDate.getDate()}/{selectedDate.getMonth() + 1}/{selectedDate.getFullYear()}
          </span>
        ) : (
          <span className='text-gray-500'>{props.placeholder}</span>
        )}
      </label>
    </div>
  )
}

interface PassengerQuantityInputProps {}

const PassengerQuantityInput: FunctionComponent<PassengerQuantityInputProps> = (props) => {
  const [adultPassengerQuantity, setAdultPassengerQuantity] = useState(1)
  const [childPassengerQuantity, setChildPassengerQuantity] = useState(0)

  const buttonRef = useRef<HTMLDivElement>(null)

  const [isShow, setIsShow] = useState(false)
  const onClick = () => {
    setIsShow(!isShow)
  }

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
      <div className='relative'>
        <div
          onClick={onClick}
          ref={buttonRef}
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
          </DropDown.Row>
          <DropDown.Row>
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
          </DropDown.Row>
        </DropDown>
      </div>
    </>
  )
}

export default SearchCard
