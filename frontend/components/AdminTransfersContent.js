"use client"

import { useState } from 'react'
import AdminSidebar from './AdminSidebar'

export default function AdminTransfersContent({ user, transfers: initialTransfers }) {
  const [transfers, setTransfers] = useState(initialTransfers)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const expireTransfer = async (transferId) => {
    setLoading(true)
    setMessage('')

    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1]
      
      const response = await fetch(`http://localhost:5000/api/admin/transfers/${transferId}/expire`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('Transfer expired successfully')
        // Update the transfers list
        setTransfers(prev => prev.map(transfer => 
          transfer.id === transferId 
            ? { ...transfer, expiration: new Date().toISOString() }
            : transfer
        ))
      } else {
        setMessage(data.message || 'Failed to expire transfer')
      }
    } catch (error) {
      setMessage('Failed to expire transfer')
      console.error('Error expiring transfer:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getStatus = (transfer) => {
    const now = new Date()
    const expiration = new Date(transfer.expiration)
    
    if (!transfer.isActive) return { text: 'Inactive', color: 'bg-gray-100 text-gray-800' }
    if (expiration < now) return { text: 'Expired', color: 'bg-red-100 text-red-800' }
    return { text: 'Active', color: 'bg-green-100 text-green-800' }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar activeTab="transfers" />
      
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Transfers Management</h1>
            <p className="text-gray-600 mt-1">Manage all file transfers in the system</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Welcome, {user.name}</span>
            <button 
              onClick={() => {
                document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
                document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
                window.location.href = '/'
              }}
              className="text-gray-600 hover:text-gray-800"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <span className="text-2xl">📤</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Transfers</p>
                <p className="text-2xl font-semibold text-gray-800">{transfers.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <span className="text-2xl">🟢</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Transfers</p>
                <p className="text-2xl font-semibold text-gray-800">
                  {transfers.filter(t => getStatus(t).text === 'Active').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-lg">
                <span className="text-2xl">🔴</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Expired Transfers</p>
                <p className="text-2xl font-semibold text-gray-800">
                  {transfers.filter(t => getStatus(t).text === 'Expired').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <span className="text-2xl">📁</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Files</p>
                <p className="text-2xl font-semibold text-gray-800">
                  {transfers.reduce((total, transfer) => total + (transfer.Files?.length || 0), 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {message && (
          <div className={`p-4 rounded-lg mb-6 ${
            message.includes('successfully') 
              ? 'bg-green-100 border border-green-400 text-green-700' 
              : 'bg-red-100 border border-red-400 text-red-700'
          }`}>
            {message}
          </div>
        )}

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-gray-800">All Transfers</h2>
            <p className="text-gray-600 text-sm mt-1">
              {transfers.length} transfer{transfers.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {transfers.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📁</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No transfers yet</h3>
              <p className="text-gray-500">When users create transfers, they will appear here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Transfer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Files
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Expires
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Downloads
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transfers.map((transfer) => {
                    const status = getStatus(transfer)
                    return (
                      <tr key={transfer.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {transfer.title || 'Untitled Transfer'}
                            </div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">
                              {transfer.shareLink}
                            </div>
                            {transfer.message && (
                              <div className="text-xs text-gray-400 mt-1 truncate max-w-xs">
                                "{transfer.message}"
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {transfer.User?.name || 'Unknown User'}
                            </div>
                            <div className="text-sm text-gray-500">
                              {transfer.User?.email || 'No email'}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {transfer.Files?.length || 0} files
                          </div>
                          <div className="text-xs text-gray-500">
                            {transfer.Files?.reduce((total, file) => total + file.size, 0) 
                              ? formatFileSize(transfer.Files.reduce((total, file) => total + file.size, 0))
                              : '0 Bytes'
                            }
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${status.color}`}>
                            {status.text}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(transfer.expiration).toLocaleDateString()}
                          <div className="text-xs text-gray-400">
                            {new Date(transfer.expiration).toLocaleTimeString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {transfer.downloadCount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {status.text === 'Active' && (
                            <button
                              onClick={() => expireTransfer(transfer.id)}
                              disabled={loading}
                              className="text-red-600 hover:text-red-900 disabled:opacity-50"
                            >
                              Expire Now
                            </button>
                          )}
                          {status.text !== 'Active' && (
                            <span className="text-gray-400">No actions</span>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}