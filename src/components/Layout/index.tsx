import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { logout, updateLastActivity } from '../../store/slices/authSlice'
import Navbar from './Navbar'
import { ActivityMonitor } from '../ActivityMonitor'
import styles from './Layout.module.scss'

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isAuthenticated, lastActivity } = useSelector(
    (state: RootState) => state.auth,
  )
  const isLoginPage = location.pathname === '/login'

  useEffect(() => {
    // Check for session timeout
    if (isAuthenticated) {
      const currentTime = Date.now()
      const inactivityTimeout = 300000 // 5 minutes

      if (currentTime - lastActivity > inactivityTimeout) {
        dispatch(logout())
        navigate('/login')
      }
    }
  }, [isAuthenticated, lastActivity, dispatch, navigate])

  useEffect(() => {
    // Handle routing based on authentication state
    if (!isAuthenticated && !isLoginPage) {
      navigate('/login')
    } else if (isAuthenticated && isLoginPage) {
      navigate('/products')
    }
  }, [isAuthenticated, isLoginPage, navigate])

  const handleActivity = () => {
    if (isAuthenticated) {
      dispatch(updateLastActivity())
    }
  }

  const handleInactivity = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <div
      className={styles.layout}
      onClick={handleActivity}
      onKeyDown={handleActivity}
    >
      {isAuthenticated && !isLoginPage && <Navbar />}
      <main className={styles.main}>{children}</main>
      {isAuthenticated && (
        <ActivityMonitor onInactive={handleInactivity} timeout={300000} />
      )}
    </div>
  )
}
