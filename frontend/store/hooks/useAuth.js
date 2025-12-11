'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'

export const useAuth = (requiredRole = null) => {
  const { isAuthenticated, user, loading } = useSelector(state => state.auth)
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push('/login')
        return
      }

      if (requiredRole && user?.role !== requiredRole) {
        router.push('/dashboard')
        return
      }
    }
  }, [isAuthenticated, user, loading, requiredRole, router])

  return { isAuthenticated, user, loading }
}