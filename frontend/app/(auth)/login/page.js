// import LoginForm from '../../../components/LoginForm'

// export default function LoginPage() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
//           <p className="text-gray-600">Sign in to your account</p>
//         </div>
        
//         <LoginForm />
        
//         <div className="text-center mt-6">
//           <a href="/forgot-password" className="text-purple-600 hover:text-purple-700 text-sm">
//             Forgot your password?
//           </a>
//         </div>
        
//         <div className="text-center mt-4">
//           <span className="text-gray-600 text-sm">
//             Don't have an account?{' '}
//             <a href="/register" className="text-purple-600 hover:text-purple-700 font-semibold">
//               Sign up
//             </a>
//           </span>
//         </div>
//       </div>
//     </div>
//   )
// }

import Link from 'next/link'
import LoginForm from '../../../components/LoginForm'
import { Cloud, Lock, Shield, Zap, Globe, Users, Upload, FileText } from 'lucide-react'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1B3C53] via-[#234C6A] to-[#456882] flex flex-col lg:flex-row items-center justify-center p-4 lg:p-8">
      
      {/* Left Side - Hero Section */}
      <div className="w-full lg:w-1/2 max-w-2xl text-white p-6 lg:p-12 mb-8 lg:mb-0">
        <div className="flex items-center gap-3 mb-8">
          <Cloud className="w-10 h-10" />
          <h1 className="text-3xl font-bold">YouTransfer</h1>
        </div>
        
        <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
          Welcome Back to <br />
          <span className="text-[#D2C1B6]">Secure File Sharing</span>
        </h2>
        
        <p className="text-lg lg:text-xl text-gray-200 mb-10 max-w-xl">
          Access your files, manage transfers, and collaborate with your team seamlessly.
          Your secure workspace awaits.
        </p>
        
        {/* Stats & Benefits */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-[#456882] rounded-full mb-3">
                <Users className="w-6 h-6" />
              </div>
              <div className="text-2xl font-bold">10K+</div>
              <div className="text-gray-300 text-sm">Active Users</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-[#456882] rounded-full mb-3">
                <Globe className="w-6 h-6" />
              </div>
              <div className="text-2xl font-bold">150+</div>
              <div className="text-gray-300 text-sm">Countries</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-[#456882] rounded-full mb-3">
                <Shield className="w-6 h-6" />
              </div>
              <div className="text-2xl font-bold">99.9%</div>
              <div className="text-gray-300 text-sm">Uptime</div>
            </div>
          </div>
        </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="flex items-start gap-4">
            <div className="bg-[#456882] p-3 rounded-xl">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Easy Upload</h3>
              <p className="text-gray-300 text-sm">Drag & drop or click to upload</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="bg-[#456882] p-3 rounded-xl">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Any File Type</h3>
              <p className="text-gray-300 text-sm">Documents, images, videos & more</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="bg-[#456882] p-3 rounded-xl">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Secure Transfer</h3>
              <p className="text-gray-300 text-sm">Bank-level encryption for all files</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="bg-[#456882] p-3 rounded-xl">
              <Cloud className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Cloud Storage</h3>
              <p className="text-gray-300 text-sm">Access files from anywhere</p>
            </div>
          </div>
        </div>
        {/* Testimonial */}
        <div className="border-l-4 border-[#D2C1B6] pl-4 py-2">
          <p className="text-gray-200 italic mb-2">
            "The fastest and most secure way to share files with my team. 
            Simplified our workflow dramatically."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#D2C1B6] to-[#456882] rounded-full"></div>
            <div>
              <div className="font-semibold">Yousha Shakeel</div>
              <div className="text-gray-300 text-sm">Software Engineer @DesignCo</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8">
          {/* Security Badge */}
          <div className="flex items-center justify-center gap-2 mb-6 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
            <Shield className="w-5 h-5 text-green-600" />
            <span className="text-green-700 font-medium text-sm">Your connection is secured with 256-bit encryption</span>
          </div>
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#1B3C53] to-[#234C6A] rounded-full mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to access your account</p>
          </div>
          
          <LoginForm />
          
          <div className="text-center mt-6">
            <a 
              href="/forgot-password" 
              className="text-[#456882] hover:text-[#234C6A] text-sm font-medium flex items-center justify-center gap-2 hover:underline transition-colors"
            >
              <Zap className="w-4 h-4" />
              Forgot your password?
            </a>
          </div>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="py-2.5 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2 text-sm font-medium"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            <button
              type="button"
              className="py-2.5 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2 text-sm font-medium"
            >
              <svg className="w-5 h-5" fill="#000000" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </button>
          </div>
          
          <div className="text-center mt-6 pt-6 border-t border-gray-100">
            <span className="text-gray-600 text-sm">
              Don't have an account?{' '}
              <Link 
                href="/register" 
                className="text-[#234C6A] hover:text-[#1B3C53] font-semibold transition-colors hover:underline"
              >
                Create now
              </Link>
            </span>
          </div>
          
          <div className="text-center mt-4">
            <p className="text-xs text-gray-500">
              By signing in, you agree to our{' '}
              <a href="#" className="text-[#456882] hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-[#456882] hover:underline">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}