import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../store'
import { logout } from '../store/slices/authSlice'

export const useAuth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, lastActivity } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (isAuthenticated) {
      const inactivityTimeout = 300000; // 5 minutes
      const currentTime = Date.now()
      
      if (currentTime - lastActivity > inactivityTimeout) {
        dispatch(logout())
        navigate('/login')
      }
    }
  }, [isAuthenticated, lastActivity, dispatch, navigate])

  return { isAuthenticated }
};