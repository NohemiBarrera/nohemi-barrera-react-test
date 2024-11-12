import React, { useState } from 'react'
import { User } from '../../../types'
import { UserForm } from './UserForm'
import { UserInfo } from './UserInfo'
import styles from '../Users.module.scss'

interface UserCardProps {
  user: User
  onUpdate: (data: { email: string }) => void
}

export const UserCard: React.FC<UserCardProps> = ({ user, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false)

  const handleSubmit = (data: { email: string }) => {
    onUpdate(data)
    setIsEditing(false)
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2>Account Information</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={styles.editButton}
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      {isEditing ? (
        <UserForm
          defaultValues={{ email: user?.email || '' }}
          onSubmit={handleSubmit}
        />
      ) : (
        <UserInfo user={user} />
      )}
    </div>
  )
}