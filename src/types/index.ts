export interface User {
  email: string
  password: string
}

export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  lastActivity: number
}

export interface ProductsState {
  items: Product[]
  loading: boolean
  error: string | null
  currentPage: number
  itemsPerPage: number
  searchQuery: string
  sortField: keyof Product | null
  sortDirection: 'asc' | 'desc'
}