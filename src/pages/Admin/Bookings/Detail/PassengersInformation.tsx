import { PassengerType } from '@/enums/passenger.enums'
import { UserGender } from '@/enums/user.enums'
import IPassenger from '@/interfaces/booking/passenger.interface'
import { format } from 'date-fns'
import { FunctionComponent } from 'react'

interface PassengersInformationProps {
  passengers: IPassenger[]
}

const PassengersInformation: FunctionComponent<PassengersInformationProps> = ({ passengers }) => {
  return (
    <div className=''>
      <div className='p-4 text-xl font-bold'>Thông tin Hành khách</div>
      <div className='overflow-x-auto rounded-lg border border-gray-200'>
        <table className='min-w-full divide-y-2 divide-gray-200 bg-white text-sm'>
          <thead className='ltr:text-left rtl:text-right'>
            <tr>
              <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>Họ Tên</th>
              <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>Ngày sinh</th>
              <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>Giới Tính</th>
              <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>Loại</th>
            </tr>
          </thead>

          <tbody className='divide-y divide-gray-200'>
            {passengers.map((passenger, index) => (
              <tr key={index}>
                <td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                  {passenger.lastName} {passenger.firstName}
                </td>
                <td className='whitespace-nowrap px-4 py-2 text-gray-700'>
                  {format(passenger.dateOfBirth || '', 'dd/MM/yyyy')}
                </td>
                <td className='whitespace-nowrap px-4 py-2 text-gray-700'>
                  {passenger.gender === UserGender.MALE ? 'Nam' : passenger.gender === UserGender.FEMALE ? 'Nữ' : '---'}
                </td>
                <td className='whitespace-nowrap px-4 py-2 text-gray-700'>
                  {passenger.type === PassengerType.ADULT
                    ? 'Người lớn'
                    : passenger.type === PassengerType.CHILD
                      ? 'Trẻ em'
                      : '---'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PassengersInformation
