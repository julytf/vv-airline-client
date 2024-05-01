import SmartTable from '@/components/Table/SmartTable'
import { TableData } from '@/components/Table/Table'
import Button from '@/components/ui/Button'
import IAircraftModel from '@/interfaces/aircraft/aircraftModel.interface'
import aircraftsService from '@/services/aircrafts.service'
import { route } from '@/utils/helpers'
import { FunctionComponent } from 'react'
import { NavLink } from 'react-router-dom'

interface AircraftModelsIndexProps {}

const AircraftModelsIndex: FunctionComponent<AircraftModelsIndexProps> = () => {
  return (
    <div className='flex flex-wrap p-3 px-6'>
      <div className='w-full max-w-full flex-none'>
        <div className='flex justify-end py-3'>
          <NavLink to={route('/admin/aircrafts/create')}>
            <Button>Thêm Máy Bay</Button>
          </NavLink>
        </div>
        <SmartTable
          title='Máy Bay'
          subTitle='Danh Sách Máy Bay'
          // data={aircraftData}
          FetchDataFnc={aircraftsService.getAircraftsPaginate.bind(aircraftsService)}
          queryKey='aircrafts'
          renderOptions={[
            {
              field: 'registrationNumber',
              displayName: 'Số Đăng Ký',
              renderFnc: (value: unknown) => {
                return <>{value}</>
              },
            },
            {
              field: 'name',
              displayName: 'Tên',
              renderFnc: (value: unknown) => {
                return <>{value}</>
              },
            },
            {
              field: 'status',
              displayName: 'Trạng Thái',
              renderFnc: (value: unknown) => {
                return <>{value}</>
              },
            },
            {
              field: 'aircraftModel',
              displayName: 'Mẫu Máy Bay',
              renderFnc: (value: unknown) => {
                return <>{(value as IAircraftModel).name}</>
              },
            },
            {
              field: '',
              displayName: 'Sửa đổi',
              renderFnc: (value: unknown, data?: TableData) => {
                return (
                  <div className='flex gap-x-4'>
                    <NavLink to={route('/admin/aircrafts/:id', { params: { id: String(data?._id) } })}>
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
