import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../store/slices/authSlice'
import { LoginForm } from './components/LoginForm'
import { LoginFormData } from './schema'
import { RootState } from '../../store'
import styles from './Login.module.scss'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/products')
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = (data: LoginFormData) => {
    dispatch(login({ email: data.email, password: data.password }))
  }

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Login</h1>
        <LoginForm onSubmit={handleSubmit} />
      </div>
    </div>
  )
}

export default Login