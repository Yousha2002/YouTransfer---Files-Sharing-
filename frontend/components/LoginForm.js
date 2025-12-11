
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, clearError } from '../store/slices/authSlice'
import { Mail, Lock, Eye, EyeOff, User, Loader2 } from 'lucide-react'

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  
  const dispatch = useDispatch()
  const router = useRouter()
  const { loading, error, isAuthenticated, user } = useSelector(state => state.auth)

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'admin') {
        router.push('/admin')
      } else {
        router.push('/dashboard')
      }
    }
  }, [isAuthenticated, user, router])

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(clearError())
    dispatch(loginUser(formData))
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    // Clear error when user starts typing
    if (error) dispatch(clearError())
  }

  // const handleDemoLogin = (role) => {
  //   setFormData({
  //     email: role === 'admin' ? 'admin@demo.com' : 'user@demo.com',
  //     password: 'demo123'
  //   })
  // }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Demo Accounts */}
      {/* <div className="space-y-2">
        <p className="text-sm text-gray-600 text-center">Try demo accounts:</p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => handleDemoLogin('user')}
            className="flex-1 py-2 px-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg text-blue-700 text-sm font-medium hover:from-blue-100 hover:to-indigo-100 transition-all duration-200"
          >
            <User className="w-3 h-3 inline mr-1" />
            User Demo
          </button>
          <button
            type="button"
            onClick={() => handleDemoLogin('admin')}
            className="flex-1 py-2 px-3 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-lg text-purple-700 text-sm font-medium hover:from-purple-100 hover:to-pink-100 transition-all duration-200"
          >
            <User className="w-3 h-3 inline mr-1" />
            Admin Demo
          </button>
        </div>
      </div> */}

      <div className="space-y-5">
        <div>
          <label className="block text-md font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#456882] focus:border-transparent transition-all placeholder-gray-400"
              placeholder="you@example.com"
            />
            <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
          </div>
        </div>
        
        <div>
          <label className="block text-md font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#456882] focus:border-transparent transition-all placeholder-gray-400"
              placeholder="Enter your password"
            />
            <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 text-[#456882] rounded focus:ring-[#456882] border-gray-300"
            />
            <span className="text-sm text-gray-700">Remember me</span>
          </label>
          
          {/* <div className="text-xs text-gray-500">
            <span className="inline-flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Last login: 2 hours ago
            </span>
          </div> */}
        </div>
      </div>

      {error && (
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 p-4 rounded-r-lg">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-500 text-sm font-bold">!</span>
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-red-800">Authentication Failed</div>
              <div className="text-sm text-red-600 mt-1">{error}</div>
            </div>
          </div>
        </div>
      )}
      
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-[#1B3C53] to-[#234C6A] text-white py-3.5 rounded-xl font-semibold hover:from-[#234C6A] hover:to-[#1B3C53] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Signing in...
          </>
        ) : (
          <>
            Sign In
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </>
        )}
      </button>
    </form>
  )
}