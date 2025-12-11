import Link from 'next/link'
import RegisterForm from '../../../components/RegisterForm'
import { Cloud, Upload, FileText, Shield, Users, Globe, Lock } from 'lucide-react'

export default function RegisterPage() {
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
      
      {/* Right Side - Registration Form */}
      <div className="w-full lg:w-1/2 max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8">
          {/* Security Badge */}
          <div className="flex items-center justify-center gap-2 mb-6 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
            <Shield className="w-5 h-5 text-green-600" />
            <span className="text-green-700 font-medium text-sm">Your connection is secured with 256-bit encryption</span>
          </div>
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#1B3C53] to-[#234C6A] rounded-full mb-4">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
            <p className="text-gray-600">Get started with YouTransfer today</p>
          </div>
          
          <RegisterForm />
          
          <div className="text-center mt-6 pt-6 border-t border-gray-100">
            <span className="text-gray-600 text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-[#234C6A] hover:text-[#1B3C53] font-semibold transition-colors">
                Sign in
              </Link>
            </span>
          </div>
          
          <div className="text-center mt-6">
            <p className="text-xs text-gray-500">
              By registering, you agree to our{' '}
              <a href="#" className="text-[#456882] hover:underline">Terms</a>
              {' '}and{' '}
              <a href="#" className="text-[#456882] hover:underline">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}