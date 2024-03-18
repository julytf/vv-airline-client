import SmartTable from '@/components/Table/SmartTable'
import Table, { TableData } from '@/components/Table/Table'
import Button from '@/components/ui/Button'
import airportsService from '@/services/airports.service'
import { route } from '@/utils/helpers'
import { FunctionComponent } from 'react'
import { NavLink } from 'react-router-dom'

interface AirportsIndexProps {}

const AirportsIndex: FunctionComponent<AirportsIndexProps> = () => {
  // const airportsData = [
  //   { id: 1, name: 'Nguyễn Văn A', email: 'nva', gender: true },
  //   { id: 2, name: 'Nguyễn Thij B', email: 'ntb', gender: false },
  // ]
  return (
    <div className='p-3 px-6 flex flex-wrap'>
      <div className='w-full max-w-full flex-none'>
        <div className='flex justify-end py-3'>
          <NavLink to={route('/admin/airports/create')}>
            <Button>Thêm Sân Bay</Button>
          </NavLink>
        </div>
        <SmartTable
          title='Sân Bay'
          subTitle='Danh Sách Sân Bay'
          // data={airportsData}
          FetchDataFnc={airportsService.getAirportsPaginate.bind(airportsService)}
          renderOptions={[
            {
              field: 'IATA',
              displayName: 'IATA',
              renderFnc: (value: unknown) => {
                return <>{value}</>
              },
            },
            {
              field: 'name',
              displayName: 'Tên sân bay',
              renderFnc: (value: unknown) => {
                return <>{value}</>
              },
            },
            {
              field: 'type',
              displayName: 'Loại sân bay',
              renderFnc: (value: unknown) => {
                return <>{value}</>
              },
            },
            {
              field: 'country',
              displayName: 'Quốc gia',
              renderFnc: (value: unknown) => {
                return <>{(value as { fullName: string })?.fullName}</>
              },
            },
            {
              field: '',
              displayName: 'Sửa đổi',
              renderFnc: (value: unknown, data?: TableData) => {
                return (
                  <div className='flex gap-x-4'>
                    <NavLink to={route('/admin/airports/:id', { params: { id: String(data?._id) } })}>
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

export default AirportsIndex
