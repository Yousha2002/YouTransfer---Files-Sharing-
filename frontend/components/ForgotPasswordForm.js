// "use client"

// import { useState } from 'react'

// export default function ForgotPasswordForm() {
//   const [email, setEmail] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [message, setMessage] = useState('')

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)
//     setMessage('')

//     try {
//       const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email }),
//       })

//       const data = await response.json()

//       if (response.ok) {
//         setMessage('Password reset instructions sent to your email!')
//       } else {
//         setMessage(data.message || 'Failed to send reset instructions')
//       }
//     } catch (error) {
//       setMessage('Failed to send reset instructions. Please try again.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Email
//         </label>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//           placeholder="Enter your email"
//         />
//       </div>
      
//       {message && (
//         <div className={`p-3 rounded-lg ${
//           message.includes('sent') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
//         }`}>
//           {message}
//         </div>
//       )}
      
//       <button
//         type="submit"
//         disabled={loading}
//         className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50"
//       >
//         {loading ? 'Sending...' : 'Reset Password'}
//       </button>
//     </form>
//   )
// }

'use client'

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword, clearError, clearMessage } from '../store/slices/authSlice'
import { Mail } from 'lucide-react'

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('')
  const dispatch = useDispatch()
  const { loading, message, error } = useSelector(state => state.auth)

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      dispatch(clearError())
      dispatch(clearMessage())
    }
  }, [dispatch])

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(clearError())
    dispatch(clearMessage())
    dispatch(forgotPassword(email))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          value={email}
      
          required
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#456882] focus:border-transparent transition-all placeholder-gray-400"
          placeholder="Enter your email"
        />
      </div> */}
        <div>
          <label className="block text-md font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#456882] focus:border-transparent transition-all placeholder-gray-400"
              placeholder="you@example.com"
            />
            <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
          </div>
        </div>
      {message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
          {message}
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}
      
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-[#1B3C53] to-[#234C6A] text-white py-3.5 rounded-xl font-semibold hover:from-[#234C6A] hover:to-[#1B3C53] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
      >
        {loading ? 'Sending...' : 'Reset Password'}
      </button>
    </form>
  )
}