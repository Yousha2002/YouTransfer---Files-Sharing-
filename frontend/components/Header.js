

"use client";

import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { usePathname } from "next/navigation";
import { 
  Home, 
  User, 
  LogIn, 
  LogOut, 
  UserPlus, 
  Dashboard, 
  Shield,
  Upload,
  Folder,
  Settings,
  ChevronDown,
  Mail,
  Bell,
  Search
} from "lucide-react";
import { useState } from "react";

export default function Header() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/";
  };

 
  if (
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/forgot-password"
  ) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 bg-[#1B3C53] text-white shadow-lg">
      <div className="mx-auto px-6">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-3">
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="bg-[#D2C1B6] p-2 rounded-lg group-hover:bg-white transition-colors duration-300">
              <Upload className="h-6 w-6 text-[#1B3C53]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">YouTransfer</h1>
              <p className="text-[#D2C1B6] text-xs font-light">Secure File Sharing</p>
            </div>
          </Link>

          {/* Navigation */}
          {/* <nav className="hidden md:flex items-center space-x-1">
            <Link
              href="/"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-[#234C6A] transition-colors"
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            
            <Link
              href="/features"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-[#234C6A] transition-colors"
            >
              <Folder size={18} />
              <span>Features</span>
            </Link>
            
            <Link
              href="/pricing"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-[#234C6A] transition-colors"
            >
              <Settings size={18} />
              <span>Pricing</span>
            </Link>
          </nav> */}

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Search Bar */}
                {/* <div className="hidden md:flex items-center bg-[#234C6A] rounded-full px-4 py-2">
                  <Search size={18} className="text-[#D2C1B6]" />
                  <input
                    type="text"
                    placeholder="Search files..."
                    className="bg-transparent border-none outline-none px-2 text-sm w-40"
                  />
                </div> */}

                {/* Notifications */}
                {/* <button className="relative p-2 rounded-full hover:bg-[#234C6A] transition-colors">
                  <Bell size={20} />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                </button> */}

                {/* User Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#234C6A] hover:bg-[#456882] transition-colors"
                  >
                    <div className="h-8 w-8 rounded-full bg-[#D2C1B6] flex items-center justify-center">
                      <User size={18} className="text-[#1B3C53]" />
                    </div>
                    <div className="text-left hidden md:block">
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-[#D2C1B6]">{user?.email}</p>
                    </div>
                    <ChevronDown size={16} className={`transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                      
                      
                      
                      <div className="border-t border-gray-100 pt-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-2 w-full px-4 py-2 text-red-600 hover:bg-red-50"
                        >
                          <LogOut size={16} />
                          <span>Logout</span>
                        </button>
                        
                      </div>
                    </div>





                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/"
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-[#234C6A] transition-colors"
                >
                  <Home size={18} />
                  <span className="hidden md:inline">Home</span>
                </Link>
                
                <Link
                  href="/login"
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-[#234C6A] transition-colors"
                >
                  <LogIn size={18} />
                  <span className="hidden md:inline">Login</span>
                </Link>
                
                <Link
                  href="/register"
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#D2C1B6] text-[#1B3C53] font-semibold hover:bg-white transition-colors"
                >
                  <UserPlus size={18} />
                  <span>Get Started</span>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {/* <div className="md:hidden flex items-center justify-between py-3 border-t border-[#234C6A]">
          <div className="flex space-x-4">
            <Link href="/" className="flex flex-col items-center">
              <Home size={20} />
              <span className="text-xs mt-1">Home</span>
            </Link>
            
            <Link href="/features" className="flex flex-col items-center">
              <Folder size={20} />
              <span className="text-xs mt-1">Features</span>
            </Link>
            
            {isAuthenticated && (
              <Link href="/dashboard" className="flex flex-col items-center">
                <Dashboard size={20} />
                <span className="text-xs mt-1">Files</span>
              </Link>
            )}
          </div>
          
          {isAuthenticated && (
            <button className="p-2">
              <Bell size={20} />
            </button>
          )}
        </div> */}
      </div>

      {/* Click outside to close dropdown */}
      {showUserMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </header>
  );
}