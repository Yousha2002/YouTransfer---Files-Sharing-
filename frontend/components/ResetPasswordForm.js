// // "use client"

// // import { useState, useEffect } from 'react'
// // import { useRouter } from 'next/navigation'

// // export default function ResetPasswordForm({ token }) {
// //   const [formData, setFormData] = useState({
// //     newPassword: '',
// //     confirmPassword: ''
// //   })
// //   const [loading, setLoading] = useState(false)
// //   const [message, setMessage] = useState('')
// //   const [error, setError] = useState('')
// //   const [tokenValid, setTokenValid] = useState(true)
// //   const router = useRouter()

// //   useEffect(() => {
// //     // Check if token is present
// //     if (!token) {
// //       setTokenValid(false)
// //       setError('Invalid or missing reset token')
// //     }
// //   }, [token])

// //   const handleSubmit = async (e) => {
// //     e.preventDefault()
// //     setLoading(true)
// //     setMessage('')
// //     setError('')

// //     if (!token) {
// //       setError('Invalid reset token')
// //       setLoading(false)
// //       return
// //     }

// //     if (formData.newPassword !== formData.confirmPassword) {
// //       setError("Passwords don't match")
// //       setLoading(false)
// //       return
// //     }

// //     if (formData.newPassword.length < 6) {
// //       setError('Password must be at least 6 characters')
// //       setLoading(false)
// //       return
// //     }

// //     try {
// //       const response = await fetch('http://localhost:5000/api/auth/reset-password', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({
// //           token: token,
// //           newPassword: formData.newPassword
// //         }),
// //       })

// //       const data = await response.json()

// //       if (response.ok) {
// //         setMessage('Password reset successfully! Redirecting to login...')
        
// //         // Redirect to login after 2 seconds
// //         setTimeout(() => {
// //           router.push('/login')
// //         }, 2000)
// //       } else {
// //         setError(data.message || 'Failed to reset password')
// //         if (data.message?.includes('expired') || data.message?.includes('invalid')) {
// //           setTokenValid(false)
// //         }
// //       }
// //     } catch (error) {
// //       setError('Failed to reset password. Please try again.')
// //       console.error('Reset password error:', error)
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   const handleChange = (e) => {
// //     setFormData({
// //       ...formData,
// //       [e.target.name]: e.target.value
// //     })
// //     // Clear errors when user starts typing
// //     if (error) setError('')
// //   }

// //   if (!tokenValid) {
// //     return (
// //       <div className="text-center">
// //         <div className="text-6xl mb-4">❌</div>
// //         <h2 className="text-xl font-bold text-gray-800 mb-2">Invalid Reset Link</h2>
// //         <p className="text-gray-600 mb-4">
// //           This password reset link is invalid or has expired.
// //         </p>
// //         <a 
// //           href="/forgot-password" 
// //           className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors inline-block"
// //         >
// //           Get New Link
// //         </a>
// //       </div>
// //     )
// //   }

// //   return (
// //     <form onSubmit={handleSubmit} className="space-y-4">
// //       <div>
// //         <label className="block text-sm font-medium text-gray-700 mb-1">
// //           New Password
// //         </label>
// //         <input
// //           type="password"
// //           name="newPassword"
// //           value={formData.newPassword}
// //           onChange={handleChange}
// //           required
// //           minLength="6"
// //           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
// //           placeholder="Enter new password"
// //         />
// //       </div>
      
// //       <div>
// //         <label className="block text-sm font-medium text-gray-700 mb-1">
// //           Confirm New Password
// //         </label>
// //         <input
// //           type="password"
// //           name="confirmPassword"
// //           value={formData.confirmPassword}
// //           onChange={handleChange}
// //           required
// //           minLength="6"
// //           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
// //           placeholder="Confirm new password"
// //         />
// //       </div>

// //       {message && (
// //         <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
// //           {message}
// //         </div>
// //       )}
      
// //       {error && (
// //         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
// //           {error}
// //         </div>
// //       )}
      
// //       <button
// //         type="submit"
// //         disabled={loading || !tokenValid}
// //         className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50"
// //       >
// //         {loading ? 'Resetting Password...' : 'Reset Password'}
// //       </button>
// //     </form>
// //   )
// // }

// 'use client'
// import { useState, useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import { useDispatch, useSelector } from 'react-redux'
// import { resetPassword, clearError, clearMessage } from '../store/slices/authSlice'
// import { Lock } from 'lucide-react'

// export default function ResetPasswordForm({ token }) {
//   const [formData, setFormData] = useState({
//     newPassword: '',
//     confirmPassword: ''
//   })
  
//   const dispatch = useDispatch()
//   const router = useRouter()
//   const { loading, message, error } = useSelector(state => state.auth)
//   const [tokenValid, setTokenValid] = useState(true)

//   useEffect(() => {
//     if (!token) {
//       setTokenValid(false)
//     }
//   }, [token])

//   useEffect(() => {
//     if (message) {
//       setTimeout(() => {
//         router.push('/login')
//       }, 2000)
//     }
//   }, [message, router])

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     dispatch(clearError())
//     dispatch(clearMessage())

//     if (!token) {
//       return
//     }

//     if (formData.newPassword !== formData.confirmPassword) {
//       dispatch(clearError())
//       return
//     }

//     if (formData.newPassword.length < 6) {
//       dispatch(clearError())
//       return
//     }

//     dispatch(resetPassword({ token, newPassword: formData.newPassword }))
//   }

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     })
//     if (error) dispatch(clearError())
//   }

//   if (!tokenValid) {
//     return (
//       <div className="text-center">
//         <div className="text-6xl mb-4">❌</div>
//         <h2 className="text-xl font-bold text-gray-800 mb-2">Invalid Reset Link</h2>
//         <p className="text-gray-600 mb-4">
//           This password reset link is invalid or has expired.
//         </p>
//         <a 
//           href="/forgot-password" 
//           className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors inline-block"
//         >
//           Get New Link
//         </a>
//       </div>
//     )
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       {/* <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           New Password
//         </label>
//         <input
//           type="password"
//           name="newPassword"
//           value={formData.newPassword}
//           onChange={handleChange}
//           required
//           minLength="6"
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//           placeholder="Enter new password"
//         />
//       </div> */}

//       <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
//                   <Lock className="w-4 h-4" />
//                 New Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     name="newPassword"
//                     value={formData.newPassword}
//                     onChange={handleChange}
//                     required
//                     className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#456882] focus:border-transparent transition-all placeholder-gray-400"
//                     placeholder="Enter your password"
//                   />
//                   <Lock className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
//                     aria-label={showPassword ? "Hide password" : "Show password"}
//                   >
//                     {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                   </button>
//                 </div>
//               </div>
      
//       {/* <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Confirm New Password
//         </label>
//         <input
//           type="password"
//           name="confirmPassword"
//           value={formData.confirmPassword}
//           onChange={handleChange}
//           required
//           minLength="6"
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//           placeholder="Confirm new password"
//         />
//       </div> */}
//   <div>
//           <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
//             <Lock className="w-5 h-5" />
//            Confirm New Password
//           </label>
//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               required
//               className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#456882] focus:border-transparent transition-all placeholder-gray-400"
//               placeholder="Enter your password"
//             />
//             <Lock className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
//               aria-label={showPassword ? "Hide password" : "Show password"}
//             >
//               {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//             </button>
//           </div>
//         </div>

//       {message && (
//         <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
//           {message}
//         </div>
//       )}
      
//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
//           {error}
//         </div>
//       )}
      
//       <button
//         type="submit"
//         disabled={loading || !tokenValid}
//         className="w-full bg-gradient-to-r from-[#1B3C53] to-[#234C6A] text-white py-3.5 rounded-xl font-semibold hover:from-[#234C6A] hover:to-[#1B3C53] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//       >
//         {loading ? 'Resetting Password...' : 'Reset Password'}
//       </button>
//     </form>
//   )
// }

'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword, clearError, clearMessage } from '../store/slices/authSlice'
import { Lock, Eye, EyeOff } from 'lucide-react'

export default function ResetPasswordForm({ token }) {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  })
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const dispatch = useDispatch()
  const router = useRouter()
  const { loading, message, error } = useSelector(state => state.auth)
  const [tokenValid, setTokenValid] = useState(true)

  useEffect(() => {
    if (!token) {
      setTokenValid(false)
    }
  }, [token])

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    }
  }, [message, router])

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(clearError())
    dispatch(clearMessage())

    if (!token) {
      return
    }

    if (formData.newPassword !== formData.confirmPassword) {
      dispatch(clearError())
      // You should set an error state for password mismatch
      return
    }

    if (formData.newPassword.length < 6) {
      dispatch(clearError())
      // You should set an error state for password length
      return
    }

    dispatch(resetPassword({ token, newPassword: formData.newPassword }))
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    if (error) dispatch(clearError())
  }

  if (!tokenValid) {
    return (
      <div className="text-center">
        <div className="text-6xl mb-4">❌</div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Invalid Reset Link</h2>
        <p className="text-gray-600 mb-4">
          This password reset link is invalid or has expired.
        </p>
        <a 
          href="/forgot-password" 
          className="bg-gradient-to-r from-[#1B3C53] to-[#234C6A] text-white px-6 py-3 rounded-xl font-semibold hover:from-[#234C6A] hover:to-[#1B3C53] transition-all duration-300 inline-block"
        >
          Get New Link
        </a>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* New Password Field */}
      <div>
        <label className="block text-md font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <Lock className="w-5 h-5" />
          New Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
            minLength="6"
            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#456882] focus:border-transparent transition-all placeholder-gray-400"
            placeholder="Enter new password (min. 6 characters)"
          />
          <Lock className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>
      
      {/* Confirm Password Field */}
      <div>
        <label className="block text-md font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <Lock className="w-5 h-5" />
          Confirm New Password
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            minLength="6"
            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#456882] focus:border-transparent transition-all placeholder-gray-400"
            placeholder="Confirm new password"
          />
          <Lock className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Password Requirements */}
      <div className="bg-gray-50 p-4 rounded-xl">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Password Requirements:</h4>
        <ul className="text-xs text-gray-600 space-y-1">
          <li className={`flex items-center gap-1 ${formData.newPassword.length >= 6 ? 'text-green-600' : ''}`}>
            {formData.newPassword.length >= 6 ? '✓' : '•'} Minimum 6 characters
          </li>
          <li className={`flex items-center gap-1 ${formData.newPassword === formData.confirmPassword && formData.newPassword ? 'text-green-600' : ''}`}>
            {formData.newPassword === formData.confirmPassword && formData.newPassword ? '✓' : '•'} Passwords must match
          </li>
        </ul>
      </div>

      {/* Success Message */}
      {message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl flex items-center gap-2">
          <span className="text-lg">✓</span>
          <span>{message}. Redirecting to login...</span>
        </div>
      )}
      
      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2">
          <span className="text-lg">⚠</span>
          <span>{error}</span>
        </div>
      )}
      
      {/* Validation Error for Password Mismatch */}
      {formData.newPassword && formData.confirmPassword && formData.newPassword !== formData.confirmPassword && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2">
          <span className="text-lg">⚠</span>
          <span>Passwords do not match. Please ensure both passwords are identical.</span>
        </div>
      )}
      
      {/* Validation Error for Password Length */}
      {formData.newPassword && formData.newPassword.length < 6 && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2">
          <span className="text-lg">⚠</span>
          <span>Password must be at least 6 characters long.</span>
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !tokenValid || formData.newPassword !== formData.confirmPassword || formData.newPassword.length < 6}
        className="w-full bg-gradient-to-r from-[#1B3C53] to-[#234C6A] text-white py-3.5 rounded-xl font-semibold hover:from-[#234C6A] hover:to-[#1B3C53] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
      >
        {loading ? 'Resetting Password...' : 'Reset Password'}
      </button>
    </form>
  )
}