import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, Save } from 'lucide-react'
import { userSchema, UserFormData } from '../schema'
import styles from '../Users.module.scss'

interface UserFormProps {
  defaultValues: UserFormData
  onSubmit: (data: UserFormData) => void
}

export const UserForm: React.FC<UserFormProps> = ({ defaultValues, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="email">
          <Mail className={styles.icon} />
          Email Address
        </label>
        <input
          type="email"
          id="email"
          {...register('email')}
          placeholder="Enter your email"
        />
        {errors.email && (
          <span className={styles.error}>{errors.email.message}</span>
        )}
      </div>

      <button type="submit" className={styles.saveButton}>
        <Save className={styles.icon} />
        Save Changes
      </button>
    </form>
  )
}