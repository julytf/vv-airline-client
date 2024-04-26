// import classNames from 'classnames'
// import { FunctionComponent, ReactElement, forwardRef, useEffect, useRef, useState } from 'react'
// import Select, { GroupBase } from 'react-select'
// import { NavLink, useNavigate, useParams } from 'react-router-dom'
// import searchWizardService from '@/services/searchWizard.service'
// import IFlightRoute from '@/interfaces/flight/flightRoute.interface'
// import IAirport from '@/interfaces/flight/airport.interface'
// import { SearchData } from '@/contexts/SearchWizard.context'
// import { route } from '@/utils/helpers'
// import _ from 'lodash'
// import { PassengerType } from '@/enums/passenger.enums'
// import { useToast } from '@/contexts/ToastNotify.context'
// import { addYears, format, startOfDay } from 'date-fns'
// import Loading from '@/components/ui/Loading'
// import Button from '@/components/ui/Button'
// import DropDown from '@/components/Dropdown/DropDown'

// interface SearchCardProps {}

// const SearchCard: FunctionComponent<SearchCardProps> = () => {
//   const [isLoading, setIsLoading] = useState(true)

//   const [airports, setAirports] = useState([])

//   const searchParams = new URLSearchParams(location.search)

//   const [formData, setFormData] = useState<Partial<SearchData>>({
//     departureAirportIATA: searchParams.get('departureAirportIATA') || undefined,
//     arrivalAirportIATA: searchParams.get('arrivalAirportIATA') || undefined,
//     departureDate: searchParams.get('departureDate') || undefined,
//     returnDate: searchParams.get('returnDate') || undefined,
//     passengersQuantity: {
//       [PassengerType.ADULT]: Number(searchParams.get('passengersQuantity.ADULT')) || 1,
//       [PassengerType.CHILD]: Number(searchParams.get('passengersQuantity.CHILD')) || 0,
//     },
//   })
//   // console.log('formData', formData)
//   // console.log('formData', formData.departureDate)

//   const isValid =
//     formData.departureAirportIATA &&
//     formData.arrivalAirportIATA &&
//     formData.departureDate &&
//     formData.passengersQuantity

//   useEffect(() => {
//     searchWizardService.getAirports().then((airports) => {
//       setAirports(airports)
//       setIsLoading(false)
//     })
//   }, [])

//   const airportsGroupedByCountry = _.groupBy(airports, 'country.name')
//   // console.log('airportsGroupedByCountry', airportsGroupedByCountry)

//   const options = Object.keys(airportsGroupedByCountry).map((country) => {
//     return {
//       label: country,
//       options: airportsGroupedByCountry[country].map((airport: IAirport) => {
//         return {
//           value: airport.IATA,
//           label: `${airport.city} (${airport.IATA}) - ${airport.country?.name}`,
//         }
//       }),
//     }
//   })
//   options.reverse()
//   // console.log('options', options)

//   const flattenedOptions = options?.flatMap((group) => group.options) || []

//   const defaultValues = {
//     departureAirport: flattenedOptions.find((option) => option.value === formData.departureAirportIATA),
//     arrivalAirport: flattenedOptions.find((option) => option.value === formData.arrivalAirportIATA),
//     departureDate: formData.departureDate || startOfDay(new Date()).toString(),
//     returnDate: formData.returnDate || undefined,
//     passengersQuantity: formData.passengersQuantity,
//   }

//   const onSearch = () => {
//     if (
//       !formData.departureAirportIATA ||
//       !formData.arrivalAirportIATA ||
//       !formData.departureDate ||
//       // !formData.returnDate ||
//       !formData.passengersQuantity
//     ) {
//       throw new Error('Invalid form data')
//     }
//     // console.log('here')

//     const query = {
//       departureAirportIATA: formData.departureAirportIATA,
//       arrivalAirportIATA: formData.arrivalAirportIATA,
//       departureDate: formData.departureDate.toString(),
//       returnDate: formData?.returnDate?.toString() || '',
//       'passengersQuantity.ADULT': formData.passengersQuantity[PassengerType.ADULT].toString(),
//       'passengersQuantity.CHILD': formData.passengersQuantity[PassengerType.CHILD].toString(),
//     }
//     console.log(query)

//     // navigate(
//     //   route('/wizard', {
//     //     query,
//     //   }),
//     // )
//   }

//   if (isLoading)
//     return (
//       <div>
//         <Loading />
//       </div>
//     )

//   return (
//     <div className={classNames('inline-block rounded-xl border-2 border-primary bg-white p-6')}>
//       <div className='flex gap-4'>
//         <div className='flex flex-col gap-2'>
//           <SelectInput
//             name='departureAirport'
//             placeholder='Điểm đi'
//             icon={<i className='fa-regular fa-plane-departure'></i>}
//             options={options}
//             defaultValue={defaultValues.departureAirport}
//             onChange={(v) => {
//               setFormData((prev) => ({ ...prev, departureAirportIATA: v }) as Partial<SearchData>)
//             }}
//           />
//           <SelectInput
//             name='arrivalAirport'
//             placeholder='Điểm đến'
//             icon={<i className='fa-regular fa-plane-arrival'></i>}
//             options={options}
//             defaultValue={defaultValues.arrivalAirport}
//             onChange={(v) => {
//               setFormData((prev) => ({ ...prev, arrivalAirportIATA: v }) as Partial<SearchData>)
//             }}
//           />{' '}
//         </div>
//         <div className='flex flex-col gap-2'>
//           <DateInput
//             name='departureDate'
//             placeholder='Ngày đi'
//             icon={<i className='fa-light fa-calendar-days'></i>}
//             max={formData.returnDate || undefined}
//             // defaultValue={defaultValues.departureDate}
//             value={formData.departureDate || ''}
//             onChange={(v) => {
//               setFormData(
//                 (prev) =>
//                   ({
//                     ...prev,
//                     departureDate: v,
//                     // returnDate: new Date(v) > new Date(formData.returnDate) ? ,
//                   }) as Partial<SearchData>,
//               )
//             }}
//           />
//           <DateInput
//             name='returnDate'
//             placeholder='Ngày về'
//             icon={<i className='fa-light fa-calendar-days'></i>}
//             min={formData.departureDate}
//             // defaultValue={defaultValues.returnDate}
//             value={formData.returnDate || ''}
//             onChange={(v) => {
//               setFormData((prev) => ({ ...prev, returnDate: v }) as Partial<SearchData>)
//             }}
//           />{' '}
//         </div>
//         <div className='flex flex-col gap-2'>
//           <PassengerQuantityInput
//             defaultValue={defaultValues.passengersQuantity}
//             onChange={(v) => {
//               setFormData((prev) => ({ ...prev, passengersQuantity: v }) as Partial<SearchData>)
//             }}
//           />
//           {/* <NavLink to={'/wizard/flights-selection'}> */}
//           <Button className='p-2.5 px-5' disabled={!isValid} onClick={onSearch}>
//             Tìm
//           </Button>
//           {/* </NavLink> */}{' '}
//         </div>
//       </div>
//     </div>
//   )
// }

// interface SelectInputProps {
//   name?: string
//   placeholder?: string
//   icon?: ReactElement
//   options?: {
//     label: string
//     options: {
//       label: string
//       value: string
//     }[]
//   }[]
//   defaultValue?: {
//     label: string
//     value: string
//   }
//   onChange?: (e: unknown) => void
// }

// const SelectInput: FunctionComponent<SelectInputProps> = forwardRef(
//   ({ name, placeholder, icon, options, onChange, defaultValue }, ref) => {
//     const [selectOptions, setSelectOptions] = useState<
//       { label: string; value: string }[] | GroupBase<{ label: string; value: string }>[]
//     >(options || [])

//     const flattenedOptionsRef = useRef(options?.flatMap((group) => group.options) || [])
//     // console.log(flattenedOptionsRef.current)

//     const onInputChange = (v: string) => {
//       // console.log(v)
//       if (v) {
//         setSelectOptions(flattenedOptionsRef.current)
//       } else {
//         setSelectOptions(options || [])
//       }
//     }

//     return (
//       <div className='relative'>
//         <Select
//           options={selectOptions}
//           defaultValue={defaultValue}
//           styles={{
//             control: (baseStyles, state) => ({
//               ...baseStyles,
//               // padding: '0.125rem 0.125rem 0.125rem 2rem',
//               border: 'none',
//               outline: 'none',
//               borderRadius: '0.5rem',
//               paddingLeft: '2rem',
//             }),
//           }}
//           className='absolute w-64 rounded-lg border text-left'
//           placeholder={placeholder}
//           onChange={(v) => onChange?.((v as unknown as { value: string }).value)}
//           onInputChange={onInputChange}
//           components={{
//             Group: ({ children, label, ...props }) => {
//               const [isShow, setIsShow] = useState(false)

//               const hasValue = false

//               return (
//                 <div className='flex flex-col'>
//                   <button onClick={() => setIsShow((prev) => !prev)} className='flex justify-between bg-slate-200 p-3 '>
//                     {label}
//                     <div className=''>
//                       {isShow ? (
//                         <i className='fa-regular fa-angle-up'></i>
//                       ) : (
//                         <i className='fa-regular fa-angle-down'></i>
//                       )}
//                     </div>
//                   </button>
//                   <div
//                     className={classNames('overflow-hidden transition-all duration-1000', {
//                       'max-h-0': !isShow,
//                       'max-h-1000': isShow,
//                     })}
//                   >
//                     {children}
//                   </div>
//                 </div>
//               )
//             },
//           }}
//         />
//         <span className='pointer-events-none absolute  left-0 top-0 flex aspect-square w-10 items-center justify-center text-gray-500'>
//           {icon}
//         </span>
//       </div>
//     )
//   },
// )

// interface DateInputProps {
//   name?: string
//   placeholder?: string
//   icon?: ReactElement
//   min?: string
//   max?: string
//   // defaultValue?: string
//   value: string
//   onChange?: (e: unknown) => void
// }

// const DateInput: FunctionComponent<DateInputProps> = ({
//   name,
//   placeholder,
//   icon,
//   min,
//   max,
//   // defaultValue,
//   value,
//   onChange,
// }) => {
//   // console.log('min', min)
//   // console.log('max', max)
//   // console.log('new Date(min || "").toString()', new Date(min || '').toString())
//   // console.log(
//   //   'min ? new Date(min || "").toString() : new Date().toString()',
//   //   min ? new Date(min || '').toString() : new Date().toString(),
//   // )

//   // const [dateString, setDateString] = useState(defaultValue || '')
//   // const selectedDate = new Date(dateString)
//   //   console.log(date)

//   const inputRef = useRef<HTMLInputElement>(null)

//   // useEffect(() => {
//   //   onChange?.(dateString)
//   // }, [dateString])

//   return (
//     <div className='relative'>
//       <label
//         className='flex h-10 w-32 items-center justify-start rounded-md border border-gray-200 pl-8 shadow-sm sm:text-sm'
//         onClick={() => inputRef.current?.showPicker()}
//       >
//         <span className='pointer-events-none absolute  left-0 top-0 flex aspect-square w-10 items-center justify-center text-gray-500'>
//           {icon}
//         </span>
//         <input
//           type='date'
//           id={name}
//           placeholder={placeholder}
//           className='invisible w-0 p-0'
//           ref={inputRef}
//           value={value}
//           onChange={(e) => {
//             onChange?.(e.target.value)
//           }}
//           min={format(min ? new Date(min || '').toString() : new Date().toString(), 'yyyy-MM-dd')}
//           max={format(max ? new Date(max || '').toString() : addYears(new Date(), 1), 'yyyy-MM-dd')}
//         />
//         {value ? (
//           <span className=' pl-2 '>{format(value, 'dd/MM/yyyy')}</span>
//         ) : (
//           <span className=' pl-2 text-gray-500'>{placeholder}</span>
//         )}
//       </label>
//     </div>
//   )
// }

// interface PassengerQuantityInputProps {
//   defaultValue?: { [PassengerType.ADULT]: number; [PassengerType.CHILD]: number }
//   onChange?: (v: unknown) => void
// }

// const PassengerQuantityInput: FunctionComponent<PassengerQuantityInputProps> = ({ defaultValue, onChange }) => {
//   const toast = useToast()

//   const [adultPassengerQuantity, setAdultPassengerQuantity] = useState(defaultValue?.[PassengerType.ADULT] || 1)
//   console.log('adultPassengerQuantity', adultPassengerQuantity)
//   const [childPassengerQuantity, setChildPassengerQuantity] = useState(defaultValue?.[PassengerType.CHILD] || 0)
//   console.log('childPassengerQuantity', childPassengerQuantity)

//   const buttonRef = useRef<HTMLDivElement>(null)

//   const [isShow, setIsShow] = useState(false)
//   const onClick = () => {
//     setIsShow(!isShow)
//   }

//   useEffect(() => {
//     onChange?.({ [PassengerType.ADULT]: adultPassengerQuantity, [PassengerType.CHILD]: childPassengerQuantity })
//   }, [adultPassengerQuantity, childPassengerQuantity])

//   const setAdultPassengerQuantityHandler = (quantity: number) => {
//     if (quantity < 1) {
//       toast.warning({ message: 'Số lượng hành khách người lớn không thể nhỏ hơn 1' })
//       return
//     }
//     if (quantity + childPassengerQuantity > 9) {
//       toast.warning({ message: 'Tổng số hành khách không thể lớn hơn 9' })
//       return
//     }
//     if (quantity < childPassengerQuantity) {
//       setChildPassengerQuantity(quantity)
//     }

//     setAdultPassengerQuantity(quantity)
//   }
//   const setChildPassengerQuantityHandler = (quantity: number) => {
//     if (quantity < 0) {
//       toast.warning({ message: 'Số lượng hành khách trẻ em không thể nhỏ hơn 0' })
//       return
//     }
//     if (quantity + adultPassengerQuantity > 9) {
//       toast.warning({ message: 'Tổng số hành khách không thể lớn hơn 9' })
//       return
//     }
//     if (quantity > adultPassengerQuantity) {
//       toast.warning({ message: 'Số lượng hành khách trẻ em không thể nhỏ hơn số lượng hành khách người lớn' })
//       return
//     }
//     setChildPassengerQuantity(quantity)
//   }

//   return (
//     <>
//       {/* <input
//         type='text'
//         value={adultPassengerQuantity}
//         onChange={(e) => setAdultPassengerQuantity(+e.target.value)}
//         className='hidden'
//       />
//       <input
//         type='text'
//         value={childPassengerQuantity}
//         onChange={(e) => setChildPassengerQuantity(+e.target.value)}
//         className='hidden'
//       /> */}
//       <div className='relative' ref={buttonRef}>
//         <div
//           onClick={onClick}
//           className='flex h-10 w-36 items-center justify-center rounded-md border border-gray-200 pl-8 shadow-sm sm:text-sm'
//         >
//           <span className='pointer-events-none absolute  left-0 top-0 flex aspect-square w-10 items-center justify-center text-gray-500'>
//             <i className='fa-light fa-user'></i>
//           </span>
//           {adultPassengerQuantity + childPassengerQuantity} Hành Khách
//         </div>

//         <DropDown
//           parentRef={buttonRef}
//           isShow={isShow}
//           onChangeShow={(newState) => {
//             setIsShow(newState)
//             // console.log(newState)
//           }}
//         >
//           <DropDown.Row>
//             <div className='w-full'>
//               <div className='flex items-center justify-between'>
//                 <div className='flex'>
//                   <div className='flex aspect-square h-10 items-center justify-center text-xl'>
//                     <i className='fa-solid fa-person'></i>
//                   </div>
//                   <div className='flex flex-col justify-center text-left'>
//                     <span className='bold text-sm'>Người lớn</span>
//                     <span className='text-xs text-gray-400'>12 tuổi trở lên</span>
//                   </div>
//                 </div>
//                 <div className='flex gap-2'>
//                   <button
//                     onClick={() => setAdultPassengerQuantityHandler(adultPassengerQuantity - 1)}
//                     className='aspect-square w-6 rounded-full border'
//                   >
//                     <i className='fa-solid fa-minus'></i>
//                   </button>
//                   <span>{adultPassengerQuantity}</span>
//                   <button
//                     onClick={() => setAdultPassengerQuantityHandler(adultPassengerQuantity + 1)}
//                     className='aspect-square w-6 rounded-full border'
//                   >
//                     <i className='fa-solid fa-plus'></i>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </DropDown.Row>
//           <DropDown.Row>
//             <div className='w-full'>
//               <div className='flex items-center justify-between'>
//                 <div className='flex'>
//                   <div className='flex aspect-square h-10 items-center justify-center text-xl'>
//                     <i className='fa-solid fa-child'></i>
//                   </div>
//                   <div className='flex flex-col justify-center text-left'>
//                     <span className='bold text-sm'>Trẻ em</span>
//                     <span className='text-xs text-gray-400'>2-12 tuổi</span>
//                   </div>
//                 </div>
//                 <div className='flex gap-2'>
//                   <button
//                     onClick={() => setChildPassengerQuantityHandler(childPassengerQuantity - 1)}
//                     className='aspect-square w-6 rounded-full border'
//                   >
//                     <i className='fa-solid fa-minus'></i>
//                   </button>
//                   <span>{childPassengerQuantity}</span>
//                   <button
//                     onClick={() => setChildPassengerQuantityHandler(childPassengerQuantity + 1)}
//                     className='aspect-square w-6 rounded-full border'
//                   >
//                     <i className='fa-solid fa-plus'></i>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </DropDown.Row>
//         </DropDown>
//       </div>
//     </>
//   )
// }

// export default SearchCard
