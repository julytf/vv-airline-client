import { SpinningCircle } from '@/components/Icons'
import Button from '@/components/ui/Button'
import Loading from '@/components/ui/Loading'
import { SeatType } from '@/enums/seat.enums'
import { TicketClass, TicketType } from '@/enums/ticket.enums'
import ISurcharge from '@/interfaces/flight/surcharge.interface'
import surchargesService from '@/services/surcharges.service'
import { FunctionComponent, useEffect, useState } from 'react'
import { useQuery } from 'react-query'

interface IndexProps {}

const Index: FunctionComponent<IndexProps> = () => {
  //   const [surcharges, setSurcharges] = useState<ISurcharge[]>([])

  // const surchargesNames = [
  //   {
  //     title: 'Phí hoàn vé - Thương gia - Linh hoạt',
  //     name: `TicketClass.${TicketClass.BUSINESS}.${TicketType.FLEXIBLE}.Refund`,
  //   },
  //   {
  //     title: 'Phí hoàn vé - Thương gia - Tiêu chuẩn',
  //     name: `TicketClass.${TicketClass.BUSINESS}.${TicketType.STANDARD}.Refund`,
  //   },
  //   {
  //     title: 'Phí hoàn vé - Phổ thông - Linh hoạt',
  //     name: `TicketClass.${TicketClass.ECONOMY}.${TicketType.FLEXIBLE}.Refund`,
  //   },
  //   // {
  //   //   title: 'Phí hoàn vé - Phổ thông - Tiêu chuẩn',
  //   //   name: `TicketClass.${TicketClass.ECONOMY}.${TicketType.STANDARD}.Refund`,
  //   // },
  //   // {
  //   //   title: 'Phí hoàn vé - Phổ thông - Tiết kiệm',
  //   //   name: `TicketClass.${TicketClass.ECONOMY}.${TicketType.BUDGET}.Refund`,
  //   // },
  //   {
  //     title: 'Phụ phí ghế - Ghế cửa sổ',
  //     name: `SeatType.${SeatType.WINDOW}`,
  //   },
  // ]

  //   useEffect(() => {
  //     surchargesService.getSurcharges().then((surcharges) => {
  //       setSurcharges(surcharges)
  //       setIsLoading(false)
  //     })
  //   }, [])

  const { data, isFetching, isLoading, error, isError, refetch } = useQuery({
    queryKey: ['surcharges'],
    queryFn: surchargesService.getSurcharges.bind(surchargesService),
  })
  const surcharges = data as ISurcharge[]

  if (isLoading) return <Loading />

  return (
    <div className='flex justify-center p-8'>
      <div className='max-w-3xl flex-1 rounded-md bg-white p-6'>
        <div className='mx-auto w-full max-w-sm pt-6'>
          <h2 className='text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>Điều chỉnh phụ phí</h2>
        </div>
        <div className='mx-auto mt-8 flex flex-col gap-4'>
          {surcharges.map((surcharge, index) => {
            return <SurchargeController key={index} surcharge={surcharge} refetch={refetch} />
          })}
        </div>
      </div>
    </div>
  )
}

interface SurchargeControllerProps {
  surcharge: ISurcharge
  refetch?: () => void
}

const SurchargeController: FunctionComponent<SurchargeControllerProps> = ({ surcharge, refetch }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [newValue, setNewValue] = useState<number | null>(0)

  const onConfirm = (newValue: number | null) => {
    setIsLoading(true)
    surchargesService
      .updateSurcharge(surcharge?._id, {
        ...surcharge,
        value: newValue,
      })
      .then(() => {
        setIsEditing(false)
        setIsLoading(false)
        refetch?.()
      })
  }
  console.log('surcharge.title', surcharge.title)
  console.log('surcharge.value', surcharge.value)
  return (
    <div className='grid grid-cols-12'>
      <div className='col-span-5'>{surcharge.title}</div>
      {!isEditing ? (
        <>
          <div className='col-span-3 rounded-md border flex items-center'>{surcharge.value?.toLocaleString() || 'không cho phép'}</div>
          <div className='col-span-4 flex justify-center'>
            <Button
              onClick={() => {
                setNewValue(surcharge.value)
                setIsEditing(true)
              }}
            >
              Chỉnh sửa
            </Button>
          </div>
        </>
      ) : (
        <>
          <input
            value={newValue ?? undefined}
            placeholder='không cho phép'
            onChange={(e) => setNewValue(Number(e.target.value))}
            className='col-span-3 rounded-md border'
          />
          <div className='col-span-4 flex justify-center gap-1'>
            {isLoading ? (
              <SpinningCircle />
            ) : (
              <>
                <button
                  onClick={() => {
                    // setNewValue(null)
                    // setIsEditing(false)
                    onConfirm(null)
                  }}
                  className='text-bold flex items-center justify-center rounded-md p-2 px-4 text-sm outline outline-2 outline-red-500 active:scale-95'
                >
                  Xóa
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className='text-bold flex items-center justify-center rounded-md p-2 px-4 text-sm outline outline-2 outline-primary active:scale-95'
                >
                  Hủy
                </button>
                <button
                  onClick={() => onConfirm(newValue)}
                  className='text-bold flex items-center justify-center rounded-md bg-primary p-2 px-4 text-sm text-white hover:bg-primary-darker active:scale-95'
                >
                  Xác nhận
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default Index
