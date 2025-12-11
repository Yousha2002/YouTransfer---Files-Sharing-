'use client'

import { Provider } from 'react-redux'
import { store } from '../store'
import { useEffect } from 'react'
import { checkAuth } from '../store/slices/authSlice'

export default function ReduxProvider({ children }) {
  useEffect(() => {
    // Check authentication status on app load
    store.dispatch(checkAuth())
  }, [])

  return <Provider store={store}>{children}</Provider>
}