import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { updateUser } from '../../store/slices/authSlice'
import { UserCard } from './components/UserCard'
import styles from './Users.module.scss'

const Users = () => {
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.auth.user)

  const handleUpdate = (data: { email: string }) => {
    if (user) {
      dispatch(updateUser({ ...user, ...data }))
    }
  }

  return (
    <div className={styles.container}>
      <h1>User Profile</h1>
      {user && <UserCard user={user} onUpdate={handleUpdate} />}
    </div>
  )
}

export default Users