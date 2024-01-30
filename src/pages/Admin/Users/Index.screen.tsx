import Table, { TableData } from '@/components/Table/Table'
import { route } from '@/utils/helpers'
import { FunctionComponent } from 'react'
import { NavLink } from 'react-router-dom'

interface UsersIndexProps {}

const UsersIndex: FunctionComponent<UsersIndexProps> = () => {
  const usersData = [
    { id: 1, name: 'Nguyễn Văn A', email: 'nva', gender: true },
    { id: 2, name: 'Nguyễn Thij B', email: 'ntb', gender: false },
  ]
  return (
    <div className='m-3 flex flex-wrap'>
      <div className='w-full max-w-full flex-none px-3'>
        <Table
          name='Danh Sách Người Dùng'
          data={usersData}
          renderOptions={[
            {
              name: 'name',
              displayName: 'Tên',
              renderFnc: (value: unknown) => {
                return <>{value}</>
              },
            },
            {
              name: 'email',
              displayName: 'Email',
              renderFnc: (value: unknown) => {
                return <>{value}</>
              },
            },
            {
              name: 'gender',
              displayName: 'Giới tính',
              renderFnc: (value: unknown) => {
                return <>{value ? 'Nam' : 'Nữ'}</>
              },
            },
            {
              name: '',
              displayName: 'Sửa đổi',
              renderFnc: (value: unknown, data?: TableData) => {
                return (
                  <div className='flex gap-x-4'>
                    <NavLink to={route('/admin/users/:id', { params: { id: String(data?.id) } })}>
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
