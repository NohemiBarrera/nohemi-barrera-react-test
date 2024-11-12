import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { deleteProduct, updateProduct } from '../../store/slices/productsSlice'
import { ProductHeader } from './components/ProductHeader'
import { ProductInfo } from './components/ProductInfo'
import { ProductEditModal } from './components/ProductEditModal'
import styles from './ProductDetail.module.scss'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)

  const product = useSelector((state: RootState) =>
    state.products.items.find(p => p.id === Number(id))
  )

  useEffect(() => {
    if (!product) {
      navigate('/products')
    }
  }, [product, navigate])

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(Number(id)))
      navigate('/products')
    }
  }

  if (!product) return null

  return (
    <div className={styles.container}>
      <ProductHeader
        onBack={() => navigate('/products')}
        onEdit={() => setIsEditing(true)}
        onDelete={handleDelete}
      />

      <ProductInfo product={product} />

      {isEditing && (
        <ProductEditModal
          product={product}
          onClose={() => setIsEditing(false)}
          onUpdate={(updatedProduct) => {
            dispatch(updateProduct(updatedProduct))
            setIsEditing(false)
          }}
        />
      )}
    </div>
  )
}

export default ProductDetail