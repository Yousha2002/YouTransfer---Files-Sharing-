// import { cookies } from 'next/headers'
// import AdminDashboard from '../../components/AdminDashboard'

// async function getAdminData() {
//   const cookieStore = await cookies()
//   const token = cookieStore.get('token')?.value
  
//   if (!token) {
//     return null
//   }

//   try {
//     const response = await fetch('http://localhost:5000/api/auth/me', {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       },
//       cache: 'no-store'
//     })
    
//     if (response.ok) {
//       const user = await response.json()
//       if (user.role === 'admin') {
//         return user
//       }
//     }
//     return null
//   } catch (error) {
//     return null
//   }
// }

// export default async function AdminPage() {
//   const userData = await getAdminData()

//   if (!userData) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
//           <p className="text-gray-600 mb-4">Admin access required</p>
//           <a href="/login" className="text-purple-600 hover:text-purple-700">
//             Please login as admin
//           </a>
//         </div>
//       </div>
//     )
//   }

//   return <AdminDashboard user={userData} />
// }


import { cookies } from 'next/headers'
import AdminDashboard from '../../components/AdminDashboard'

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
      next: { revalidate: 0 }
    })
    
    if (response.ok) {
      const user = await response.json()
      if (user.role === 'admin') {
        return user
      }
    }
    return null
  } catch (error) {
    console.error('Admin auth error:', error)
    return null
  }
}

async function getAdminStats() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  
  if (!token) {
    return null
  }

  try {
    const response = await fetch('http://localhost:5000/api/admin/stats', {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      next: { revalidate: 0 }
    })
    
    if (response.ok) {
      const data = await response.json()
      console.log('Admin stats received:', data)
      return data
    } else {
      console.error('Failed to fetch stats:', response.status)
      return null
    }
  } catch (error) {
    console.error('Error fetching stats:', error)
    return null
  }
}

export default async function AdminPage() {
  const userData = await getAdminData()
  const stats = await getAdminStats()

  console.log('Admin Dashboard - User Data:', userData ? 'Authenticated' : 'Not authenticated')
  console.log('Admin Dashboard - Stats:', stats)

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-4">Admin access required</p>
          <a 
            href="/login" 
            className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Please login as admin
          </a>
        </div>
      </div>
    )
  }

  return <AdminDashboard user={userData} initialStats={stats} />
}