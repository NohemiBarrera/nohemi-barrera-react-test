import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { LogOut, ShoppingCart, Users } from 'lucide-react'
import { logout } from '../../store/slices/authSlice'
import styles from './Navbar.module.scss'

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/products" className={styles.logo}>
          <ShoppingCart className={styles.icon} />
          <span>Store Test</span>
        </Link>

        <div className={styles.links}>
          <Link to="/products" className={styles.link}>Products</Link>
          <Link to="/products/create" className={styles.link}>Add Product</Link>
          <Link to="/users" className={styles.link}>
            <Users className={styles.icon} />
            <span>Users</span>
          </Link>
          <button onClick={handleLogout} className={styles.logoutButton}>
            <LogOut className={styles.icon} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar