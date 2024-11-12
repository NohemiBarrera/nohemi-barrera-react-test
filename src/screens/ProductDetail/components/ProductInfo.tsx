import React from 'react'
import { Product } from '../../../types'
import styles from '../ProductDetail.module.scss'

interface ProductInfoProps {
  product: Product
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => (
  <div className={styles.content}>
    <div className={styles.imageSection}>
      <img src={product.image} alt={product.title} />
      <div className={styles.category}>{product.category}</div>
    </div>

    <div className={styles.details}>
      <h1>{product.title}</h1>

      <div className={styles.price}>
        <span className={styles.amount}>${product.price.toFixed(2)}</span>
      </div>

      <div className={styles.rating}>
        <div className={styles.stars}>
          {'★'.repeat(Math.round(product.rating.rate))}
          {'☆'.repeat(5 - Math.round(product.rating.rate))}
          <span className={styles.rate}>
            {product.rating.rate.toFixed(1)}
          </span>
        </div>
        <span className={styles.reviews}>
          {product.rating.count} reviews
        </span>
      </div>

      <p className={styles.description}>{product.description}</p>
    </div>
  </div>
)