

"use client"

import { useState, useEffect } from 'react'
import AdminSidebar from './AdminSidebar'
import { 
  Users, 
  Upload, 
  File, 
  Activity,
  BarChart3,
  Shield,
  Download,
  Calendar,
  Search,
  Plus,
  Filter,
  Copy,
  Eye,
  Edit2,
  MoreVertical,
  LogOut,
  Settings,
  Bell,
  ChevronRight,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  Link,
  FileText,
  PieChart,
  Database,
  Server,
  ChevronLeft,
  ChevronRight as ChevronRightIcon
} from 'lucide-react'

export default function AdminDashboard({ user }) {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [stats, setStats] = useState(null)
  const [users, setUsers] = useState([])
  const [transfers, setTransfers] = useState([])
  const [loading, setLoading] = useState(true)
  

  const [currentUserPage, setCurrentUserPage] = useState(1)
  const [usersPerPage] = useState(10)
  const [searchUserQuery, setSearchUserQuery] = useState('')
  const [filteredUsers, setFilteredUsers] = useState([])
  

  const [currentTransferPage, setCurrentTransferPage] = useState(1)
  const [transfersPerPage] = useState(10)
  const [searchTransferQuery, setSearchTransferQuery] = useState('')
  const [filteredTransfers, setFilteredTransfers] = useState([])


  const colors = {
    primaryDark: '#1B3C53',
    primary: '#234C6A',
    primaryLight: '#456882',
    accent: '#D2C1B6',
    background: '#F8F9FA',
    cardBg: '#FFFFFF',
    textDark: '#1B3C53',
    textLight: '#6B7280',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
  }

  useEffect(() => {
    fetchStats()
  }, [])

  useEffect(() => {
    if (activeTab === 'users') {
      fetchUsers()
      setCurrentUserPage(1) 
    } else if (activeTab === 'transfers') {
      fetchTransfers()
      setCurrentTransferPage(1)
    }
  }, [activeTab])

 
  useEffect(() => {
    if (users.length > 0) {
      const filtered = users.filter(user => 
        user.name?.toLowerCase().includes(searchUserQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchUserQuery.toLowerCase()) ||
        user.role?.toLowerCase().includes(searchUserQuery.toLowerCase())
      )
      setFilteredUsers(filtered)
    }
  }, [users, searchUserQuery])


  useEffect(() => {
    if (transfers.length > 0) {
      const filtered = transfers.filter(transfer => 
        transfer.title?.toLowerCase().includes(searchTransferQuery.toLowerCase()) ||
        transfer.shareLink?.toLowerCase().includes(searchTransferQuery.toLowerCase()) ||
        transfer.User?.name?.toLowerCase().includes(searchTransferQuery.toLowerCase()) ||
        transfer.User?.email?.toLowerCase().includes(searchTransferQuery.toLowerCase())
      )
      setFilteredTransfers(filtered)
    }
  }, [transfers, searchTransferQuery])


  const indexOfLastUser = currentUserPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)
  const totalUserPages = Math.ceil(filteredUsers.length / usersPerPage)


  const indexOfLastTransfer = currentTransferPage * transfersPerPage
  const indexOfFirstTransfer = indexOfLastTransfer - transfersPerPage
  const currentTransfers = filteredTransfers.slice(indexOfFirstTransfer, indexOfLastTransfer)
  const totalTransferPages = Math.ceil(filteredTransfers.length / transfersPerPage)

  const fetchStats = async () => {
    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1]
      
      const response = await fetch('http://localhost:5000/api/admin/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchUsers = async () => {
    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1]
      
      const response = await fetch('http://localhost:5000/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setUsers(data)
        setFilteredUsers(data)
      }
    } catch (error) {
      console.error('Failed to fetch users:', error)
    }
  }

  const fetchTransfers = async () => {
    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1]
      
      const response = await fetch('http://localhost:5000/api/admin/transfers', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setTransfers(data)
        setFilteredTransfers(data)
      }
    } catch (error) {
      console.error('Failed to fetch transfers:', error)
    }
  }

  const toggleUserStatus = async (userId) => {
    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1]
      
      const response = await fetch(`http://localhost:5000/api/admin/users/${userId}/toggle-status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        fetchUsers() 
      }
    } catch (error) {
      console.error('Failed to toggle user status:', error)
    }
  }

  const expireTransfer = async (transferId) => {
    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1]
      
      const response = await fetch(`http://localhost:5000/api/admin/transfers/${transferId}/expire`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        fetchTransfers() 
      }
    } catch (error) {
      console.error('Failed to expire transfer:', error)
    }
  }


  const handleUserPageChange = (pageNumber) => {
    setCurrentUserPage(pageNumber)
  }

  const handleUserPrevPage = () => {
    if (currentUserPage > 1) {
      setCurrentUserPage(currentUserPage - 1)
    }
  }

  const handleUserNextPage = () => {
    if (currentUserPage < totalUserPages) {
      setCurrentUserPage(currentUserPage + 1)
    }
  }


  const handleTransferPageChange = (pageNumber) => {
    setCurrentTransferPage(pageNumber)
  }

  const handleTransferPrevPage = () => {
    if (currentTransferPage > 1) {
      setCurrentTransferPage(currentTransferPage - 1)
    }
  }

  const handleTransferNextPage = () => {
    if (currentTransferPage < totalTransferPages) {
      setCurrentTransferPage(currentTransferPage + 1)
    }
  }


  const getPageNumbers = (currentPage, totalPages) => {
    const pageNumbers = []
    const maxVisiblePages = 5
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      const leftOffset = Math.floor(maxVisiblePages / 2)
      let startPage = currentPage - leftOffset
      let endPage = currentPage + leftOffset
      
      if (startPage < 1) {
        startPage = 1
        endPage = maxVisiblePages
      }
      
      if (endPage > totalPages) {
        endPage = totalPages
        startPage = totalPages - maxVisiblePages + 1
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i)
      }
      
      if (startPage > 1) {
        if (startPage > 2) {
          pageNumbers.unshift('...')
        }
        pageNumbers.unshift(1)
      }
      
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pageNumbers.push('...')
        }
        pageNumbers.push(totalPages)
      }
    }
    
    return pageNumbers
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colors.background }}>
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 mb-4" style={{ borderColor: colors.primary }}></div>
          <p className="text-lg font-medium" style={{ color: colors.primaryDark }}>Loading Dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: colors.background }}>
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} colors={colors} />
      
      <div className="flex-1 p-6 lg:p-8">
        {/* Header with User Info */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: colors.primaryDark }}>
              {activeTab === 'dashboard' ? 'Dashboard Overview' : 
               activeTab === 'users' ? 'User Management' : 
               'Transfer Management'}
            </h1>
            <p className="mt-2 flex items-center text-sm" style={{ color: colors.textLight }}>
              <CheckCircle className="w-4 h-4 mr-2" style={{ color: colors.success }} />
              {activeTab === 'dashboard' ? 'Monitor your platform statistics and activities' :
               activeTab === 'users' ? 'Manage user accounts and permissions' :
               'View and manage all file transfers'}
            </p>
          </div>
        </div>

        {/* Dashboard Stats */}
        {activeTab === 'dashboard' && stats && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-2xl shadow-md p-6 transition-all hover:shadow-lg hover:-translate-y-1 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      Total Users
                    </p>
                    <p className="text-3xl font-bold mt-2 text-gray-800">{stats.totalUsers}</p>
                    <p className="text-xs mt-1 text-gray-400 flex items-center">
                      <ChevronRight className="w-3 h-3 mr-1" />
                      Registered accounts
                    </p>
                  </div>
                  <div className="p-3 rounded-full bg-blue-50">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-6 transition-all hover:shadow-lg hover:-translate-y-1 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 flex items-center">
                      <Upload className="w-4 h-4 mr-2" />
                      Total Transfers
                    </p>
                    <p className="text-3xl font-bold mt-2 text-gray-800">{stats.totalTransfers}</p>
                    <p className="text-xs mt-1 text-gray-400 flex items-center">
                      <ChevronRight className="w-3 h-3 mr-1" />
                      All time transfers
                    </p>
                  </div>
                  <div className="p-3 rounded-full bg-green-50">
                    <Upload className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-6 transition-all hover:shadow-lg hover:-translate-y-1 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 flex items-center">
                      <File className="w-4 h-4 mr-2" />
                      Total Files
                    </p>
                    <p className="text-3xl font-bold mt-2 text-gray-800">{stats.totalFiles}</p>
                    <p className="text-xs mt-1 text-gray-400 flex items-center">
                      <ChevronRight className="w-3 h-3 mr-1" />
                      Uploaded files
                    </p>
                  </div>
                  <div className="p-3 rounded-full bg-purple-50">
                    <File className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-6 transition-all hover:shadow-lg hover:-translate-y-1 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 flex items-center">
                      <Activity className="w-4 h-4 mr-2" />
                      Active Transfers
                    </p>
                    <p className="text-3xl font-bold mt-2 text-gray-800">{stats.activeTransfers}</p>
                    <p className="text-xs mt-1 text-gray-400 flex items-center">
                      <ChevronRight className="w-3 h-3 mr-1" />
                      Currently active
                    </p>
                  </div>
                  <div className="p-3 rounded-full bg-orange-50">
                    <Activity className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Charts and Activities */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Activity */}
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Recent Activity
                  </h3>
                  <button className="text-sm text-blue-600 flex items-center hover:text-blue-800">
                    View all <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center p-4 rounded-xl bg-blue-50 border border-blue-100">
                    <div className="p-2 rounded-lg bg-white mr-4">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">New user registered</p>
                      <p className="text-sm text-gray-500">John Doe joined the platform</p>
                    </div>
                    <span className="text-sm text-gray-400">2 min ago</span>
                  </div>
                  <div className="flex items-center p-4 rounded-xl bg-green-50 border border-green-100">
                    <div className="p-2 rounded-lg bg-white mr-4">
                      <Upload className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">File transfer completed</p>
                      <p className="text-sm text-gray-500">Large file transfer successful</p>
                    </div>
                    <span className="text-sm text-gray-400">15 min ago</span>
                  </div>
                  <div className="flex items-center p-4 rounded-xl bg-purple-50 border border-purple-100">
                    <div className="p-2 rounded-lg bg-white mr-4">
                      <File className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">New file uploaded</p>
                      <p className="text-sm text-gray-500">Project_document.pdf</p>
                    </div>
                    <span className="text-sm text-gray-400">1 hour ago</span>
                  </div>
                </div>
              </div>

              {/* System Status */}
              <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <Server className="w-5 h-5 mr-2" />
                    System Status
                  </h3>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full mr-2 bg-green-500 animate-pulse"></div>
                    <span className="text-sm text-green-600">All Systems Operational</span>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-500">CPU Usage</span>
                      <span className="text-sm font-medium text-gray-800">42%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: '42%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-500">Memory</span>
                      <span className="text-sm font-medium text-gray-800">65%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-green-600 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-500">Storage</span>
                      <span className="text-sm font-medium text-gray-800">78%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-600 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Users Tab - Modern Table Design */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    <Users className="w-6 h-6 mr-2" />
                    User Management
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''} found
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchUserQuery}
                      onChange={(e) => setSearchUserQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                    />
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium flex items-center hover:bg-blue-700 transition-colors">
                    <Plus className="w-4 h-4 mr-2" />
                    Add User
                  </button>
                </div>
              </div>
            </div>

            {/* Modern Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Transfers
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Last Active
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                            {user.name?.charAt(0) || 'U'}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 flex items-center">
                              {user.name || 'Unknown'}
                              {user.isVerified && (
                                <Shield className="w-4 h-4 ml-2 text-green-500" />
                              )}
                            </div>
                            <div className="text-sm text-gray-500">{user.email || 'No email'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          user.role === 'admin' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {user.role === 'admin' ? 'Administrator' : 'User'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-2 ${
                            user.isActive ? 'bg-green-500' : 'bg-red-500'
                          }`}></div>
                          <span className={`text-sm font-medium ${
                            user.isActive ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {user.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Upload className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900 font-medium">
                            {user.Transfers?.length || 0}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex gap-2">
                          <button
                            onClick={() => toggleUserStatus(user.id)}
                            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                              user.isActive
                                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                : 'bg-green-100 text-green-700 hover:bg-green-200'
                            }`}
                          >
                            {user.isActive ? 'Deactivate' : 'Activate'}
                          </button>
                          <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium hover:bg-gray-200">
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalUserPages > 0 && (
              <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} results
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={handleUserPrevPage}
                    disabled={currentUserPage === 1}
                    className={`px-3 py-1 rounded border border-gray-300 text-sm flex items-center ${
                      currentUserPage === 1 
                        ? 'text-gray-400 cursor-not-allowed' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                  </button>
                  
                  {getPageNumbers(currentUserPage, totalUserPages).map((page, index) => (
                    page === '...' ? (
                      <span key={`ellipsis-${index}`} className="px-3 py-1 text-gray-400">
                        ...
                      </span>
                    ) : (
                      <button
                        key={page}
                        onClick={() => handleUserPageChange(page)}
                        className={`px-3 py-1 rounded text-sm font-medium ${
                          currentUserPage === page
                            ? 'bg-blue-600 text-white'
                            : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    )
                  ))}
                  
                  <button
                    onClick={handleUserNextPage}
                    disabled={currentUserPage === totalUserPages}
                    className={`px-3 py-1 rounded border border-gray-300 text-sm flex items-center ${
                      currentUserPage === totalUserPages 
                        ? 'text-gray-400 cursor-not-allowed' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    Next
                    <ChevronRightIcon className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Transfers Tab - Modern Table Design */}
        {activeTab === 'transfers' && (
          <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    <Upload className="w-6 h-6 mr-2" />
                    Transfer Management
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {filteredTransfers.length} transfer{filteredTransfers.length !== 1 ? 's' : ''} found
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search transfers..."
                      value={searchTransferQuery}
                      onChange={(e) => setSearchTransferQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                    />
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium flex items-center hover:bg-blue-700 transition-colors">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </button>
                </div>
              </div>
            </div>

            {/* Modern Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Transfer Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Owner
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Files
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Expires
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Downloads
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentTransfers.map((transfer) => {
                    const isExpired = new Date(transfer.expiration) < new Date();
                    return (
                      <tr key={transfer.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {transfer.title || 'Untitled Transfer'}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center mt-1">
                              <Link className="w-3 h-3 mr-1" />
                              <span className="truncate max-w-xs">{transfer.shareLink || 'No link'}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{transfer.User?.name || 'Unknown'}</div>
                          <div className="text-sm text-gray-500">{transfer.User?.email || 'No email'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <File className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-900 font-medium">
                              {transfer.Files?.length || 0}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className={`w-2 h-2 rounded-full mr-2 ${
                              isExpired ? 'bg-red-500' : 'bg-green-500'
                            }`}></div>
                            <span className={`text-sm font-medium ${
                              isExpired ? 'text-red-600' : 'text-green-600'
                            }`}>
                              {transfer.expiration ? new Date(transfer.expiration).toLocaleDateString() : 'Never'}
                              {isExpired && ' (Expired)'}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Download className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-900 font-medium">
                              {transfer.downloadCount || 0}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex gap-2">
                            <button
                              onClick={() => expireTransfer(transfer.id)}
                              disabled={isExpired}
                              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                                isExpired
                                  ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                                  : 'bg-red-100 text-red-700 hover:bg-red-200'
                              }`}
                            >
                              {isExpired ? 'Expired' : 'Expire Now'}
                            </button>
                            <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium hover:bg-gray-200">
                              View Details
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalTransferPages > 0 && (
              <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Showing {indexOfFirstTransfer + 1} to {Math.min(indexOfLastTransfer, filteredTransfers.length)} of {filteredTransfers.length} transfers
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={handleTransferPrevPage}
                    disabled={currentTransferPage === 1}
                    className={`px-3 py-1 rounded border border-gray-300 text-sm flex items-center ${
                      currentTransferPage === 1 
                        ? 'text-gray-400 cursor-not-allowed' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                  </button>
                  
                  {getPageNumbers(currentTransferPage, totalTransferPages).map((page, index) => (
                    page === '...' ? (
                      <span key={`ellipsis-${index}`} className="px-3 py-1 text-gray-400">
                        ...
                      </span>
                    ) : (
                      <button
                        key={page}
                        onClick={() => handleTransferPageChange(page)}
                        className={`px-3 py-1 rounded text-sm font-medium ${
                          currentTransferPage === page
                            ? 'bg-blue-600 text-white'
                            : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    )
                  ))}
                  
                  <button
                    onClick={handleTransferNextPage}
                    disabled={currentTransferPage === totalTransferPages}
                    className={`px-3 py-1 rounded border border-gray-300 text-sm flex items-center ${
                      currentTransferPage === totalTransferPages 
                        ? 'text-gray-400 cursor-not-allowed' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    Next
                    <ChevronRightIcon className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}