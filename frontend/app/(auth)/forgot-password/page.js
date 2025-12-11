import ForgotPasswordForm from '../../../components/ForgotPasswordForm'
import { Cloud, Lock, Shield, Zap, Globe, Users, ArrowLeft, Mail } from 'lucide-react'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1B3C53] via-[#234C6A] to-[#456882] flex flex-col lg:flex-row items-center justify-center p-4 lg:p-8">
      
      {/* Left Side - Hero Section */}
      <div className="w-full lg:w-1/2 max-w-2xl text-white p-6 lg:p-12 mb-8 lg:mb-0">
        <div className="flex items-center gap-3 mb-8">
          <Cloud className="w-10 h-10" />
          <h1 className="text-3xl font-bold">YouTransfer</h1>
        </div>
        
        <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
          Reset Your Password <br />
          <span className="text-[#D2C1B6]">Regain Secure Access</span>
        </h2>
        
        <p className="text-lg lg:text-xl text-gray-200 mb-10 max-w-xl">
          Forgot your password? No worries. Enter your email address and we'll send you a secure link to reset your password and regain access to your secure workspace.
        </p>
        
        {/* Security Features */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Secure Password Reset Process
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#456882] flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span className="text-gray-200">One-time secure reset link sent to your email</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#456882] flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span className="text-gray-200">Link expires in 15 minutes for security</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#456882] flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span className="text-gray-200">All active sessions will be terminated after reset</span>
            </li>
          </ul>
        </div>
        
        {/* User Support Info */}
        <div className="border-l-4 border-[#D2C1B6] pl-4 py-2">
          <p className="text-gray-200 mb-2">
            <span className="font-semibold">Need help?</span> Our support team is available 24/7 to assist you with account recovery.
          </p>
          <div className="flex items-center gap-3 mt-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#D2C1B6] to-[#456882] rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-semibold">24/7 Support Available</div>
              <div className="text-gray-300 text-sm">Average response time: 5 minutes</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Side - Reset Password Form */}
      <div className="w-full lg:w-1/2 max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8">
          {/* Back to Login */}
          <div className="mb-6">
            <Link 
              href="/login" 
              className="inline-flex items-center gap-2 text-sm text-[#456882] hover:text-[#1B3C53] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to login
            </Link>
          </div>
          
          {/* Security Badge */}
          <div className="flex items-center justify-center gap-2 mb-6 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
            <Shield className="w-5 h-5 text-green-600" />
            <span className="text-green-700 font-medium text-sm">Secure password reset with end-to-end encryption</span>
          </div>
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#1B3C53] to-[#234C6A] rounded-full mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Reset Password</h1>
            <p className="text-gray-600 max-w-xs mx-auto">
              Enter your email address and we'll send you instructions to reset your password
            </p>
          </div>
          
          {/* Forgot Password Form */}
          <ForgotPasswordForm />
          
          {/* Additional Help Section */}
          <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="flex items-start gap-4 p-5 bg-blue-50 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200">
  <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full">
    <Mail className="w-6 h-6 text-blue-600" />
  </div>
  <div>
    <h4 className="font-semibold text-[#1B3C53] text-lg mb-1">
      Not receiving the email?
    </h4>
    <p className="text-[#1B3C53] text-sm leading-relaxed">
      Check your spam folder or contact support if you don’t receive the password reset email within 5 minutes.
    </p>
  </div>
</div>

            
            <div className="text-center mt-6">
              <p className="text-gray-600 text-sm">
                Remember your password?{' '}
                <Link 
                  href="/login" 
                  className="font-medium text-[#456882] hover:text-[#1B3C53] transition-colors"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}