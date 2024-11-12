import React from 'react'
import styles from '../ProductList.module.scss'

interface ProductRatingProps {
  rating: {
    rate: number
    count: number
  }
}

export const ProductRating: React.FC<ProductRatingProps> = ({ rating }) => (
  <div className={styles.rating}>
    <span className={styles.stars}>
      {'★'.repeat(Math.round(rating.rate))}
      {'☆'.repeat(5 - Math.round(rating.rate))}
    </span>
    <span className={styles.count}>({rating.count})</span>
  </div>
)
