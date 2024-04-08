import classNames from 'classnames'
import { FunctionComponent, PropsWithChildren } from 'react'

interface TablePaginationProps {
  page?: number
  lastPage?: number
  onPageChange?: (page: number) => void
}

const TablePagination: FunctionComponent<TablePaginationProps> = ({ page = 1, lastPage = 1, onPageChange }) => {
  const sizePadding = 3

  // console.log(page, lastPage)
  return (
    <div className='flex gap-1 text-xs'>
      <PaginationButton onClick={() => onPageChange?.(1)}>
        <i className='fa-regular fa-angles-left'></i>
      </PaginationButton>
      <PaginationButton onClick={() => onPageChange?.(Math.max(page - 1, 1))}>
        <i className='fa-regular fa-angle-left'></i>
      </PaginationButton>
      {new Array(sizePadding * 2 + 1).fill(null).map((_, index) => {
        const pageIndex = page - sizePadding + index
        // console.log(pageIndex)

        if (pageIndex < 1 || pageIndex > lastPage) {
          return null
        }
        return (
          <PaginationButton
            key={index}
            onClick={() => onPageChange?.(pageIndex)}
            className={pageIndex === page ? 'bg-gray-400 text-white' : ''}
          >
            {pageIndex}
          </PaginationButton>
        )
      })}
      <PaginationButton onClick={() => onPageChange?.(Math.min(page + 1, lastPage))}>
        <i className='fa-regular fa-angle-right'></i>
      </PaginationButton>
      <PaginationButton onClick={() => onPageChange?.(lastPage)}>
        <i className='fa-regular fa-angles-right'></i>
      </PaginationButton>
    </div>
  )
}

interface PaginationButtonProps extends PropsWithChildren {
  className?: string
  onClick?: () => void
}

const PaginationButton: FunctionComponent<PaginationButtonProps> = ({ children, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={classNames('flex aspect-square w-6 items-center justify-center rounded-md border', className)}
    >
      {children}
    </button>
  )
}

export default TablePagination
