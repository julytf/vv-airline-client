import { FunctionComponent } from 'react'
import TablePagination from '../Pagination/TablePagination'

export type TableData = {
  [key: string]: unknown
}

interface TableProps {
  title?: string
  subTitle?: string
  data: TableData[]
  renderOptions: {
    name: string
    displayName: string
    renderFnc: (value: unknown, data?: TableData) => JSX.Element
  }[]
}

const Table: FunctionComponent<TableProps> = ({ title, subTitle, data, renderOptions }) => {
  console.log(data)

  return (
    <div className='relative z-10 mb-6 flex min-w-0 flex-col break-words rounded-2xl border border-solid  bg-white bg-clip-border shadow-xl'>
      <div className='bold mb-0 rounded-t-2xl bg-white p-6 pb-0 pt-3'>
        <div>
          <span className='text-2xl'>{title || 'Bảng dữ liệu'}</span>
        </div>
        <span className='text-sm text-slate-400'>{subTitle || 'Bảng dữ liệu'}</span>
      </div>
      <div className='flex-auto px-0  pt-0'>
        <div className=' overflow-x-auto p-0'>
          <table className='mb-0 w-full items-center border-gray-200 align-top'>
            <thead className='bg-gray-100 align-bottom'>
              <tr>
                {renderOptions.map((option, index) => (
                  <th
                    key={index}
                    className='whitespace-nowrap border border-gray-200 bg-transparent px-6 py-3 pl-2  text-left align-middle text-xs font-bold uppercase text-slate-400 opacity-70 shadow-none'
                  >
                    {option.displayName}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, dataIndex) => (
                <tr key={dataIndex} className='border-b last:border-0 hover:bg-gray-50'>
                  {renderOptions.map((option, index) => (
                    <td key={index} className='whitespace-nowrap bg-transparent p-2 align-middle shadow-transparent'>
                      {option.renderFnc(data[dataIndex][option.name], data[dataIndex])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className='flex justify-between rounded-b-2xl border-t p-3'>
        <div>
          <span>Hiển thị </span>
          <input type='text' className='w-16 rounded border border-gray-200 px-1 ' />
        </div>

        <TablePagination />
      </div>
    </div>
  )
}

export default Table
