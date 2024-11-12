import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import Login from '../screens/Login'
import ProductList from '../screens/ProductList'
import ProductDetail from '../screens/ProductDetail'
import ProductCreate from '../screens/ProductCreate'
import Users from '../screens/Users'
import NotFound from '../screens/NotFound'

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/products" replace />} />

      <Route path="/products" element={
        <ProtectedRoute>
          <ProductList />
        </ProtectedRoute>
      } />

      <Route path="/products/:id" element={
        <ProtectedRoute>
          <ProductDetail />
        </ProtectedRoute>
      } />

      <Route path="/products/create" element={
        <ProtectedRoute>
          <ProductCreate />
        </ProtectedRoute>
      } />

      <Route path="/users" element={
        <ProtectedRoute>
          <Users />
        </ProtectedRoute>
      } />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes