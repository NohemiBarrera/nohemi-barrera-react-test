import React, { useState } from 'react'
import { Product } from '../../../types'
import styles from '../ProductDetail.module.scss'

interface ProductEditModalProps {
  product: Product
  onClose: () => void
  onUpdate: (product: Product) => void
}

export const ProductEditModal: React.FC<ProductEditModalProps> = ({
  product,
  onClose,
  onUpdate,
}) => {
  const [formData, setFormData] = useState(product)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/${product.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      )

      if (response.ok) {
        const updatedProduct = await response.json()
        onUpdate(updatedProduct)
      } else {
        throw new Error('Failed to update product')
      }
    } catch (error) {
      setError('Failed to update product. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className={styles.modalOverlay}>
        <div className={styles.modal}>
          <h2>Edit Product</h2>
          {error && <div className={styles.error}>{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="title">Name</label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                step="0.01"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: Number(e.target.value) })
                }
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="category">Category</label>
              <input
                type="text"
                id="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                required
              />
            </div>

            <div className={styles.modalActions}>
              <button
                type="button"
                onClick={onClose}
                className={styles.cancelButton}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={styles.saveButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}