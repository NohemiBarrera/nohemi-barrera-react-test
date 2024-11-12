import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { ProductActions } from './ProductActions'
import styles from '../ProductDetail.module.scss'

interface ProductHeaderProps {
  onBack: () => void
  onEdit: () => void
  onDelete: () => void
}

export const ProductHeader: React.FC<ProductHeaderProps> = ({
  onBack,
  onEdit,
  onDelete,
}) => (
  <div className={styles.header}>
    <button onClick={onBack} className={styles.backButton}>
      <ArrowLeft size={20} />
      <span>Back to Products</span>
    </button>
    <ProductActions onEdit={onEdit} onDelete={onDelete} />
  </div>
)