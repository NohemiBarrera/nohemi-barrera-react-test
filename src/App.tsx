import React from 'react'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import AppRoutes from './routes'
import { Layout } from './components/Layout'

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Layout>
          <AppRoutes />
        </Layout>
      </HashRouter>
    </Provider>
  )
}

export default App