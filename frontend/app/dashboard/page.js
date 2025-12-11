// import { cookies } from 'next/headers'
// import DashboardContent from '../../components/DashboardContent'

// async function getUserData() {
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
//       return await response.json()
//     }
//     return null
//   } catch (error) {
//     return null
//   }
// }

// export default async function DashboardPage() {
//   const userData = await getUserData()

//   if (!userData) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
//           <a href="/login" className="text-purple-600 hover:text-purple-700">
//             Please login
//           </a>
//         </div>
//       </div>
//     )
//   }

//   return <DashboardContent user={userData} />
// }


import { cookies } from 'next/headers'
import DashboardContent from '../../components/DashboardContent'
import { Cloud, Shield, Zap, Users } from 'lucide-react'

async function getUserData() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
   console.log('Token found:', !!token)
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
      return await response.json()
    }
    return null
  } catch (error) {
    return null
  }
}

export default async function DashboardPage() {
  const userData = await getUserData()

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1B3C53] via-[#234C6A] to-[#456882] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#1B3C53] to-[#234C6A] rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">Please login to access your dashboard</p>
          <a 
            href="/login" 
            className="inline-block bg-gradient-to-r from-[#1B3C53] to-[#234C6A] text-white px-6 py-3 rounded-xl font-semibold hover:from-[#234C6A] hover:to-[#1B3C53] transition-all duration-300"
          >
            Go to Login
          </a>
        </div>
      </div>
    )
  }

  return <DashboardContent user={userData} />
}