import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowUpDown } from 'lucide-react'
import { Product } from '../../../types'
import { ProductRating } from './ProductRating'
import styles from '../ProductList.module.scss'

interface ProductTableProps {
  products: Product[]
  sortField: keyof Product | null
  sortDirection: 'asc' | 'desc'
  onSort: (field: keyof Product) => void
}

export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  sortField,
  sortDirection,
  onSort,
}) => {
  const navigate = useNavigate()

  const getSortIcon = (field: keyof Product) => {
    if (sortField !== field) return <ArrowUpDown size={15} />
    return sortDirection === 'asc' ? '↑' : '↓'
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th onClick={() => onSort('title')}>
              Name {getSortIcon('title')}
            </th>
            <th onClick={() => onSort('price')}>
              Price {getSortIcon('price')}
            </th>
            <th onClick={() => onSort('category')}>
              Category {getSortIcon('category')}
            </th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              onClick={() => navigate(`/products/${product.id}`)}
            >
              <td>
                <div className={styles.productInfo}>
                  <img
                    src={product.image}
                    alt={product.title}
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/150'
                    }}
                  />
                  <span>{product.title}</span>
                </div>
              </td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.category}</td>
              <td>
                <ProductRating rating={product.rating} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}