"use client";

import {
  LayoutDashboard,
  Users,
  Upload,
  Settings,
  LogOut,
  ChevronRight,
  Shield,
  BarChart3,
  FileText,
  Cloud,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
export default function AdminSidebar({ activeTab, setActiveTab, colors }) {
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "users",
      label: "Users",
      icon: Users,
    },
    {
      id: "transfers",
      label: "Transfers",
      icon: Upload,
    },
  ];
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200 shadow-sm">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-[#234C6A] to-[#456882] p-4 rounded-3xl shadow-xl flex items-center justify-center">
            <Cloud className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">YouTransfer</h2>
            <p className="text-xs text-gray-500">Admin Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
            Navigation
          </p>
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-all duration-200 ${
                      isActive
                        ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        isActive ? "text-blue-600" : "text-gray-500"
                      }`}
                    />
                    <span className="font-medium">{item.label}</span>
                    {isActive && (
                      <ChevronRight className="w-4 h-4 ml-auto text-blue-600" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Additional Links */}
      </nav>

      {/* User Profile */}
      <div className="absolute bottom-0 w-64 p-6 border-t border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-semibold text-gray-800">Admin User</p>
              <p className="text-xs text-gray-500">admin@wepresent.com</p>
            </div>
          </div>
          <div className="p-1 rounded bg-green-100">
            <Shield className="w-4 h-4 text-green-600" />
          </div>
        </div>

        <button className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium">
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
