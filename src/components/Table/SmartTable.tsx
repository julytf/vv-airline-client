import { FunctionComponent, useState } from 'react'
import Table from './Table'
import { useQuery } from 'react-query'

export type TableData = {
  [key: string]: unknown
}

interface SmartTableProps {
  name?: string
  FetchDataFnc: (option: { page: number; perPage: number; q: string }) => Promise<unknown>
  renderOptions: {
    name: string
    displayName: string
    renderFnc: (value: unknown, data?: TableData) => JSX.Element
  }[]
}

const SmartTable: FunctionComponent<SmartTableProps> = ({ name, FetchDataFnc, renderOptions }) => {
  const { data, isFetching, isLoading, error, isError } = useQuery({
    queryFn: () => FetchDataFnc({ page: 1, perPage: 20, q: '' }),
  })
  console.log(data)

  return <Table name={name} data={(data as { docs: TableData[] })?.docs || []} renderOptions={renderOptions} />
}

export default SmartTable
