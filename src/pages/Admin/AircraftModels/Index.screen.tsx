import SmartTable from '@/components/Table/SmartTable'
import Table, { TableData } from '@/components/Table/Table'
import Button from '@/components/ui/Button'
import { TicketClass } from '@/enums/ticket.enums'
import aircraftModelsService from '@/services/aircraftModels.service'
import { route } from '@/utils/helpers'
import { FunctionComponent } from 'react'
import { NavLink } from 'react-router-dom'

interface AircraftModelsIndexProps {}

const AircraftModelsIndex: FunctionComponent<AircraftModelsIndexProps> = () => {
  return (
    <div className='flex flex-wrap p-3 px-6'>
      <div className='w-full max-w-full flex-none'>
        <div className='flex justify-end py-3'>
          <NavLink to={route('/admin/aircraft-models/create')}>
            <Button>Thêm Mẫu Máy Bay</Button>
          </NavLink>
        </div>
        <SmartTable
          title='Mẫu  Máy Bay'
          subTitle='Danh Sách Mẫu Máy Bay'
          // data={aircraftModelsData}
          FetchDataFnc={aircraftModelsService.getAircraftModelsPaginate.bind(aircraftModelsService)}
          queryKey='aircraft-models'
          renderOptions={[
            {
              field: 'name',
              displayName: 'Tên',
              renderFnc: (value: unknown) => {
                return <>{value}</>
              },
            },
            {
              field: 'seatQuantity',
              displayName: 'Số ghế',
              renderFnc: (value: unknown) => {
                const seatQuantity = value as {
                  [TicketClass.BUSINESS]: number
                  [TicketClass.ECONOMY]: number
                }
                return (
                  <>
                    <div>BUSINESS: {seatQuantity[TicketClass.BUSINESS]}</div>
                    <div>ECONOMY: {seatQuantity[TicketClass.ECONOMY]}</div>
                  </>
                )
              },
            },
            {
              field: '',
              displayName: 'Sửa đổi',
              renderFnc: (value: unknown, data?: TableData) => {
                return (
                  <div className='flex gap-x-4'>
                    <NavLink to={route('/admin/aircraft-models/:id', { params: { id: String(data?._id) } })}>
                      <i className='fa-regular fa-pen-to-square'></i>
                    </NavLink>
                  </div>
                )
              },
            },
          ]}
        />
      </div>
    </div>
  )
}

export default AircraftModelsIndex
