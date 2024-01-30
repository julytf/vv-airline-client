import { FunctionComponent } from 'react'

export type TableData = {
  [key: string]: unknown
}

interface tableProps {
  name?: string
  data: TableData[]
  renderOptions: {
    name: string
    displayName: string
    renderFnc: (value: unknown, data?: TableData) => JSX.Element
  }[]
}

const table: FunctionComponent<tableProps> = ({ name, data, renderOptions }) => {
  return (
    <div className='relative z-10 mb-6 flex min-w-0 flex-col break-words rounded-2xl border border-solid  bg-white bg-clip-border shadow-xl'>
      <div className='bold mb-0 rounded-t-2xl bg-white p-6 pb-0'>
        <h6>{name || 'Bảng dữ liệu'}</h6>
      </div>
      <div className='flex-auto px-0  pt-0'>
        <div className=' overflow-x-auto p-0'>
          <table className='mb-0 w-full items-center border-gray-200 align-top text-slate-500'>
            <thead className='align-bottom'>
              <tr>
                {renderOptions.map((option, index) => (
                  <th
                    key={index}
                    className='whitespace-nowrap border-b border-gray-200 bg-transparent px-6 py-3 pl-2  text-left align-middle text-xs font-bold uppercase text-slate-400 opacity-70 shadow-none'
                  >
                    {option.displayName}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, dataIndex) => (
                <tr key={dataIndex} className='border-b last:border-0'>
                  {renderOptions.map((option, index) => (
                    <td key={index} className='whitespace-nowrap bg-transparent p-2 align-middle shadow-transparent'>
                      {option.renderFnc(data[dataIndex][option.name], data[dataIndex])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className='ps__rail-x' style={{ left: 0, top: 0 }}>
            <div className='ps__thumb-x' tabIndex={0} style={{ left: 0, width: 0 }} />
          </div>
          <div className='ps__rail-y' style={{ top: 0, left: 0 }}>
            <div className='ps__thumb-y' tabIndex={0} style={{ top: 0, height: 0 }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default table
