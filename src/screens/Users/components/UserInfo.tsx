import React from 'react'
import { User } from '../../../types'
import styles from '../Users.module.scss'

interface UserInfoProps {
  user: User
}

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => (
  <div className={styles.info}>
    <div className={styles.field}>
      <span className={styles.label}>Email Address</span>
      <span className={styles.value}>{user?.email}</span>
    </div>
  </div>
)