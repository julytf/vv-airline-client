import { FunctionComponent, useEffect, useRef, useState } from 'react'
import Table from './Table'
import { useQuery } from 'react-query'
import TablePagination from '../Pagination/TablePagination'
import classNames from 'classnames'
import { useNavigate } from 'react-router'
import Button from '../ui/Button'
import Loading from '../ui/Loading'

export type TableData = {
  [key: string]: unknown
}

interface SmartTableProps {
  title?: string
  subTitle?: string
  FetchDataFnc: (option: { page: number; perPage: number; q: string }) => Promise<unknown>
  queryKey: string
  renderOptions: {
    field: string
    displayName: string
    renderFnc: (value: unknown, data: TableData) => JSX.Element
  }[]
}

const SmartTable: FunctionComponent<SmartTableProps> = ({ title, subTitle, FetchDataFnc, queryKey, renderOptions }) => {
  const navigate = useNavigate()

  const [isFirstRender, setIsFirstRender] = useState(true)
  useEffect(() => {
    setIsFirstRender(false)
  }, [])

  const searchParams = new URLSearchParams(location.search)

  const [page, setPage] = useState(() => Number(searchParams.get('page')) || 1)
  const [perPage, setPerPage] = useState(() => Number(searchParams.get('perPage')) || 20)
  const [q, setQ] = useState(() => searchParams.get('q') || '')

  const [perPageInput, setPerPageInput] = useState(perPage)
  const [qInput, setQInput] = useState(q)

  const { data, isFetching, isLoading, error, isError } = useQuery({
    queryKey: [queryKey, { page, perPage, q }],
    queryFn: () => FetchDataFnc({ page, perPage, q }),
  })

  const { docs: tableData = [], lastPage } = (data as { docs: TableData[]; lastPage: number }) || {}
  console.log(tableData)

  useEffect(() => {
    if (isFirstRender) return
    const searchParams = new URLSearchParams(location.search)
    searchParams.set('page', page.toString())
    navigate({ search: searchParams.toString() })
  }, [page])

  useEffect(() => {
    if (isFirstRender) return
    setPage(1)
    const searchParams = new URLSearchParams(location.search)
    searchParams.set('perPage', perPage.toString())
    searchParams.set('q', q)
    navigate({ search: searchParams.toString() })
  }, [perPage, q])

  if (isLoading) return <Loading />

  return (
    <div className='relative z-10 mb-6 flex min-w-0 flex-col break-words rounded-2xl border border-solid  bg-white bg-clip-border shadow-xl'>
      <div className='bold mb-0 flex justify-between rounded-t-2xl bg-white p-6 pb-0 pt-3'>
        <div className=''>
          <div>
            <span className='text-2xl'>{title || 'Bảng dữ liệu'}</span>
          </div>
          <span className='text-sm text-slate-400'>{subTitle}</span>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            setQ(qInput || '')
          }}
          className='flex items-start'
        >
          <div className='rounded-md border border-gray-200  p-1 px-4 pt-2 '>
            <input
              value={qInput}
              onChange={(e) => setQInput(e.target.value)}
              placeholder='Tìm kiếm'
              className='outline-none'
            />
            <button
              type='button'
              onClick={() => {
                setQInput('')
              }}
              className={classNames(' text-gray-500 active:scale-95', {
                hidden: !qInput,
              })}
            >
              <i className='fa-regular fa-x'></i>
            </button>
          </div>
          <Button outline className='ml-2'>
            Tìm
          </Button>
        </form>
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
              {tableData.map((item, dataIndex) => (
                <tr key={dataIndex} className='border-b last:border-0 hover:bg-gray-50'>
                  {renderOptions.map((option, index) => (
                    <td key={index} className='whitespace-nowrap bg-transparent p-2 align-middle shadow-transparent'>
                      {option.renderFnc(tableData[dataIndex][option.field], tableData[dataIndex])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className='flex justify-between rounded-b-2xl  border-t-2 p-3'>
        <div>
          <span>Hiển thị </span>
          <input
            value={perPageInput}
            onBlur={() => setPerPage(perPageInput)}
            onChange={(e) => setPerPageInput(Number(e.target.value))}
            className='w-16 rounded-md border border-gray-200 px-1 '
          />
        </div>

        <TablePagination page={page} lastPage={lastPage} onPageChange={setPage} />
      </div>
    </div>
  )
}

export default SmartTable
