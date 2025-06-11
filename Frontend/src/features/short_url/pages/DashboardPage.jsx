import React from 'react'
import UrlForm from '../components/UrlForm'
import UserUrl from '../components/UserUrl'

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-800 flex flex-col items-center justify-center p-4 overflow-x-auto">
      <div className="bg-gray-900 -mt-20 p-8 rounded-lg shadow-md w-full max-w-4xl border border-gray-800 overflow-x-auto overflow-y-auto max-h-[80vh]">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-400">URL Shortener</h1>
        <UrlForm/>
        <UserUrl/>
      </div>
    </div>
  )
}

export default DashboardPage