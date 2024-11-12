import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import styles from './Pagination.module.scss'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5
    const halfVisible = Math.floor(maxVisiblePages / 2)

    let start = Math.max(1, currentPage - halfVisible)
    let end = Math.min(totalPages, start + maxVisiblePages - 1)

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1)
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    return pages
  }

  if (totalPages <= 1) return null

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles.arrow}
      >
        <ChevronLeft size={20} />
      </button>

      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`${styles.page} ${currentPage === page ? styles.active : ''
            }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={styles.arrow}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  )
}