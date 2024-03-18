import classNames from 'classnames'
import { FunctionComponent } from 'react'

interface TablePaginationProps {
  page?: number
  lastPage?: number
  onPageChange?: (page: number) => void
}

const TablePagination: FunctionComponent<TablePaginationProps> = ({ page = 1, lastPage = 1, onPageChange }) => {
  const sizePadding = 3

  console.log(page, lastPage)
  return (
    <div className='flex gap-1 text-xs'>
      <button
        onClick={() => onPageChange?.(1)}
        className='flex aspect-square w-6 items-center justify-center rounded-md border'
      >
        <i className='fa-regular fa-angles-left'></i>
      </button>
      <button
        onClick={() => onPageChange?.(Math.max(page - 1, 1))}
        className='flex aspect-square w-6 items-center justify-center rounded-md border'
      >
        <i className='fa-regular fa-angle-left'></i>
      </button>
      {new Array(sizePadding * 2 + 1).fill(null).map((_, index) => {
        const pageIndex = page - sizePadding + index
        console.log(pageIndex)

        if (pageIndex < 1 || pageIndex > lastPage) {
          return null
        }
        return (
          <button
            key={index}
            onClick={() => onPageChange?.(pageIndex)}
            className={classNames('flex aspect-square w-6 items-center justify-center rounded-md border', {
              'bg-gray-400 text-white': pageIndex === page,
            })}
          >
            {pageIndex}
          </button>
        )
      })}
      {/* <div
        className={classNames('flex aspect-square w-6 items-center justify-center rounded-md border', {
          'bg-gray-400 text-white': true,
        })}
      >
        1
      </div> */}
      <button
        onClick={() => onPageChange?.(Math.min(page + 1, lastPage))}
        className='flex aspect-square w-6 items-center justify-center rounded-md border'
      >
        <i className='fa-regular fa-angle-right'></i>
      </button>
      <button
        onClick={() => onPageChange?.(lastPage)}
        className='flex aspect-square w-6 items-center justify-center rounded-md border'
      >
        <i className='fa-regular fa-angles-right'></i>
      </button>
    </div>
  )
}

export default TablePagination
