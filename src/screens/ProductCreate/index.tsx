import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, Upload } from 'lucide-react'
import imageCompression from 'browser-image-compression'
import { productSchema, ProductFormData } from './schema'
import { addProduct } from '../../store/slices/productsSlice'
import { RootState } from '../../store'
import styles from './ProductCreate.module.scss'

const ProductCreate = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [previewImage, setPreviewImage] = useState<string>('')
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Get the next available ID
  const products = useSelector((state: RootState) => state.products.items)
  const nextId = Math.max(...products.map(p => p.id), 0) + 1

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  })

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      try {
        setIsUploading(true)
        setUploadError(null)

        const options = {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 800,
          useWebWorker: true,
        }

        const compressedFile = await imageCompression(file, options)
        const reader = new FileReader()

        reader.onloadend = () => {
          const base64String = reader.result as string
          setPreviewImage(base64String)
          setIsUploading(false)
        }

        reader.onerror = () => {
          setUploadError('Failed to read image file')
          setIsUploading(false)
        }

        reader.readAsDataURL(compressedFile)
      } catch (error) {
        setUploadError('Failed to process image')
        setIsUploading(false)
      }
    }
  }

  const onSubmit = async (data: ProductFormData) => {
    try {
      setIsSubmitting(true)

      const newProduct = {
        ...data,
        id: nextId,
        image: previewImage || 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
        rating: { rate: 0, count: 0 },
      }

      // Add to Redux store (which will also update localStorage)
      dispatch(addProduct(newProduct))

      // Navigate back to products page
      navigate('/products', { replace: true })
    } catch (error) {
      console.error('Failed to create product:', error)
      setUploadError('Failed to create product. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button
          onClick={() => navigate('/products')}
          className={styles.backButton}
        >
          <ArrowLeft size={20} />
          <span>Back to Products</span>
        </button>
        <h1>Create New Product</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Name</label>
          <input
            type="text"
            id="title"
            {...register('title')}
            placeholder="Enter product name"
          />
          {errors.title && (
            <span className={styles.error}>{errors.title.message}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            step="0.01"
            {...register('price', { valueAsNumber: true })}
            placeholder="Enter product price"
          />
          {errors.price && (
            <span className={styles.error}>{errors.price.message}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            {...register('description')}
            placeholder="Enter product description"
          />
          {errors.description && (
            <span className={styles.error}>{errors.description.message}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            {...register('category')}
            placeholder="Enter product category"
          />
          {errors.category && (
            <span className={styles.error}>{errors.category.message}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="image">Product Image</label>
          <div className={styles.imageUpload}>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className={styles.fileInput}
              disabled={isUploading}
            />
            <div className={`${styles.uploadButton} ${isUploading ? styles.uploading : ''}`}>
              <Upload size={20} />
              <span>{isUploading ? 'Processing...' : 'Choose Image'}</span>
            </div>
          </div>
          {uploadError && (
            <span className={styles.error}>{uploadError}</span>
          )}
          {previewImage && (
            <div className={styles.imagePreview}>
              <img src={previewImage} alt="Preview" />
            </div>
          )}
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting || isUploading}
        >
          {isSubmitting ? 'Creating...' : 'Create Product'}
        </button>
      </form>
    </div>
  )
}

export default ProductCreate