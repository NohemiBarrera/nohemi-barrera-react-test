import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Product, ProductsState } from '../../types'

// Load products from localStorage first
const getStoredProducts = (): Product[] => {
  try {
    const storedProducts = localStorage.getItem('products')
    return storedProducts ? JSON.parse(storedProducts) : []
  } catch (error) {
    return []
  }
}

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    // First check localStorage
    const storedProducts = getStoredProducts()
    if (storedProducts.length > 0) {
      return storedProducts
    }

    // If no stored products, fetch from API
    const response = await fetch('https://fakestoreapi.com/products')
    const products = await response.json()

    // Store in localStorage
    localStorage.setItem('products', JSON.stringify(products))
    return products
  }
)

const initialState: ProductsState = {
  items: getStoredProducts(),
  loading: false,
  error: null,
  currentPage: 1,
  itemsPerPage: 3,
  searchQuery: '',
  sortField: null,
  sortDirection: 'asc',
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
      state.currentPage = 1
    },
    setSortField: (state, action: PayloadAction<keyof Product | null>) => {
      state.sortField = action.payload
    },
    setSortDirection: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.sortDirection = action.payload
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      // Add new product at the beginning of the array
      state.items.unshift(action.payload)

      // Store image in localStorage if it's a base64 string
      if (action.payload.image.startsWith('data:image')) {
        localStorage.setItem(
          `product-image-${action.payload.id}`,
          action.payload.image
        )
      }

      // Update products in localStorage
      localStorage.setItem('products', JSON.stringify(state.items))

      // Reset to first page and clear search
      state.currentPage = 1
      state.searchQuery = ''
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id)
      if (index !== -1) {
        // Update image in localStorage if it's a base64 string
        if (action.payload.image.startsWith('data:image')) {
          localStorage.setItem(
            `product-image-${action.payload.id}`,
            action.payload.image
          )
        }

        // Update product in state
        state.items[index] = action.payload

        // Update products in localStorage
        localStorage.setItem('products', JSON.stringify(state.items))
      }
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      // Remove image from localStorage
      localStorage.removeItem(`product-image-${action.payload}`)

      // Remove product from state
      state.items = state.items.filter(item => item.id !== action.payload)

      // Update products in localStorage
      localStorage.setItem('products', JSON.stringify(state.items))

      // Adjust current page if necessary
      const totalPages = Math.ceil(state.items.length / state.itemsPerPage)
      if (state.currentPage > totalPages) {
        state.currentPage = Math.max(1, totalPages)
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
        // Store fetched products in localStorage
        localStorage.setItem('products', JSON.stringify(action.payload))
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch products'
      })
  },
})

export const {
  setCurrentPage,
  setSearchQuery,
  setSortField,
  setSortDirection,
  addProduct,
  updateProduct,
  deleteProduct,
} = productsSlice.actions
export default productsSlice.reducer