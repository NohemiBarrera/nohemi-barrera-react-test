import React from 'react'
import { Edit2, Trash2 } from 'lucide-react'
import styles from '../ProductDetail.module.scss'

interface ProductActionsProps {
  onEdit: () => void
  onDelete: () => void
}

export const ProductActions: React.FC<ProductActionsProps> = ({
  onEdit,
  onDelete,
}) => (
  <>
    <div className={styles.actions}>
      <button onClick={onEdit} className={styles.editButton}>
        <Edit2 size={20} />
        <span>Edit</span>
      </button>
      <button onClick={onDelete} className={styles.deleteButton}>
        <Trash2 size={20} />
        <span>Delete</span>
      </button>
    </div>
  </>

)