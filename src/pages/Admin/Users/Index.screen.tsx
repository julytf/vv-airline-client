import SmartTable from '@/components/Table/SmartTable'
import Table, { TableData } from '@/components/Table/Table'
import { UserGender } from '@/enums/user.enums'
import usersService from '@/services/users.service'
import { route } from '@/utils/helpers'
import { FunctionComponent } from 'react'
import { NavLink } from 'react-router-dom'

interface UsersIndexProps {}

const UsersIndex: FunctionComponent<UsersIndexProps> = () => {
  // const usersData = [
  //   { id: 1, name: 'Nguyễn Văn A', email: 'nva', gender: true },
  //   { id: 2, name: 'Nguyễn Thij B', email: 'ntb', gender: false },
  // ]
  return (
    <div className='m-3 flex flex-wrap'>
      <div className='w-full max-w-full flex-none px-3'>
        <SmartTable
          title='Người Dùng'
          subTitle='Danh Sách Người Dùng'
          // data={usersData}
          FetchDataFnc={usersService.getUsersPaginate.bind(usersService)}
          queryKey='users'
          renderOptions={[
            // {
            //   field: '_id',
            //   displayName: '#',
            //   renderFnc: (value: unknown) => {
            //     return <>{value}</>
            //   },
            // },
            {
              field: 'name',
              displayName: 'Tên',
              renderFnc: (value: unknown, data?: TableData) => {
                return (
                  <>
                    {data?.lastName} {data?.firstName}
                  </>
                )
              },
            },
            {
              field: 'gender',
              displayName: 'Giới tính',
              renderFnc: (value) => {
                return <>{!value ? '' : value === UserGender.MALE ? 'Nam' : 'Nữ'}</>
              },
            },
            {
              field: 'email',
              displayName: 'Email',
              renderFnc: (value: unknown) => {
                return <>{value}</>
              },
            },
            {
              field: 'phoneNumber',
              displayName: 'Số điện thoại',
              renderFnc: (value: unknown) => {
                return <>{value}</>
              },
            },
            // {
            //   field: 'address',
            //   displayName: 'Địa chỉ',
            //   renderFnc: (value: unknown) => {
            //     return <>{value}</>
            //   },
            // },
            {
              field: 'role',
              displayName: 'Vai trò',
              renderFnc: (value: unknown) => {
                return <>{value}</>
              },
            },
            {
              field: '',
              displayName: 'Sửa đổi',
              renderFnc: (value: unknown, data?: TableData) => {
                return (
                  <div className='flex gap-x-4'>
                    <NavLink to={route('/admin/users/:id', { params: { id: String(data?._id) } })}>
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

export default UsersIndex
