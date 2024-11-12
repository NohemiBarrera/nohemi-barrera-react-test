import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from 'lucide-react'
import { RootState } from '../../store'
import {
  fetchProducts,
  setCurrentPage,
  setSearchQuery,
  setSortDirection,
  setSortField,
} from '../../store/slices/productsSlice'
import { Product } from '../../types'
import { Pagination } from '../../components/Pagination'
import { ProductTable } from './components/ProductTable'
import { SearchBar } from './components/SearchBar'
import styles from './ProductList.module.scss'

const ProductList = () => {
  const dispatch = useDispatch()
  const {
    items,
    loading,
    error,
    currentPage,
    itemsPerPage,
    searchQuery,
    sortField,
    sortDirection,
  } = useSelector((state: RootState) => state.products)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const handleSearch = (value: string) => {
    dispatch(setSearchQuery(value))
  }

  const handleSort = (field: keyof Product) => {
    if (sortField === field) {
      dispatch(setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc'))
    } else {
      dispatch(setSortField(field))
      dispatch(setSortDirection('asc'))
    }
  }

  const filteredProducts = items
    .filter(product =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortField) return 0
      const aValue = a[sortField]
      const bValue = b[sortField]
      const modifier = sortDirection === 'asc' ? 1 : -1
      return aValue < bValue ? -1 * modifier : 1 * modifier
    })

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  if (loading) {
    return (
      <div className={styles.loading}>
        <Loader className={styles.spinner} />
        <p>Loading products...</p>
      </div>
    )
  }

  if (error) {
    return <div className={styles.error}>{error}</div>
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Products</h1>
        <SearchBar value={searchQuery} onChange={handleSearch} />
      </div>

      <ProductTable
        products={paginatedProducts}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={handleSort}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => dispatch(setCurrentPage(page))}
      />
    </div>
  )
}

export default ProductList