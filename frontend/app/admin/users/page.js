import { cookies } from 'next/headers'
import AdminUsersContent from '../../../components/AdminUsersContent'

async function getAdminData() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  
  if (!token) {
    return null
  }

  try {
    const response = await fetch('http://localhost:5000/api/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      cache: 'no-store'
    })
    
    if (response.ok) {
      const user = await response.json()
      if (user.role === 'admin') {
        return user
      }
    }
    return null
  } catch (error) {
    return null
  }
}

async function getAllUsers() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  
  if (!token) {
    return []
  }

  try {
    const response = await fetch('http://localhost:5000/api/admin/users', {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      cache: 'no-store'
    })
    
    if (response.ok) {
      return await response.json()
    }
    return []
  } catch (error) {
    console.error('Error fetching users:', error)
    return []
  }
}

export default async function AdminUsersPage() {
  const userData = await getAdminData()
  const users = await getAllUsers()

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-4">Admin access required</p>
          <a href="/login" className="text-purple-600 hover:text-purple-700">
            Please login as admin
          </a>
        </div>
      </div>
    )
  }

  return <AdminUsersContent user={userData} users={users} />
}