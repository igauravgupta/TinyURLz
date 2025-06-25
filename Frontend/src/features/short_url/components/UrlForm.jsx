import React, { useState } from 'react'
import { createShortUrl } from '../services/short_url.api.js'
import { useSelector } from 'react-redux'
import { queryClient } from '../../../main'
import { API_URL } from '../../../constants/constants.js'

const UrlForm = () => {
  const [url, setUrl] = useState("https://www.google.com")
  const [shortUrl, setShortUrl] = useState()
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState(null)
  const [customSlug, setCustomSlug] = useState("")
  const [password, setPassword] = useState("")
  const [expiresIn, setExpiresIn] = useState("") // in hours
  const { isAuthenticated } = useSelector((state) => state.auth)

  const handleSubmit = async () => {
    try {
      const expiresInMs = expiresIn ? parseInt(expiresIn) * 60 * 60 * 1000 : null // convert hours to ms

      const shortUrlSlug = await createShortUrl(url, customSlug, password, expiresInMs)
      setShortUrl(`${API_URL}${shortUrlSlug}`)
      queryClient.invalidateQueries({ queryKey: ['userUrls'] })
      setError(null)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-300 mb-1">
          Enter your URL
        </label>
        <input
          type="url"
          id="url"
          value={url}
          onInput={(event) => setUrl(event.target.value)}
          placeholder="https://example.com"
          required
          className="w-full px-4 py-2 border border-gray-700 bg-gray-800 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {isAuthenticated && (
        <>
          <div>
            <label htmlFor="customSlug" className="block text-sm font-medium text-gray-300 mb-1">
              Custom Slug (optional)
            </label>
            <input
              type="text"
              id="customSlug"
              value={customSlug}
              onChange={(event) => setCustomSlug(event.target.value)}
              placeholder="Enter custom slug"
              className="w-full px-4 py-2 border border-gray-700 bg-gray-800 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password Protection (optional)
            </label>
            <input
              type="text"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Set a password to protect the URL"
              className="w-full px-4 py-2 border border-gray-700 bg-gray-800 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="expiresIn" className="block text-sm font-medium text-gray-300 mb-1">
              Expire After (in hours)
            </label>
            <input
              type="number"
              id="expiresIn"
              min="1"
              value={expiresIn}
              onChange={(event) => setExpiresIn(event.target.value)}
              placeholder="e.g., 24"
              className="w-full px-4 py-2 border border-gray-700 bg-gray-800 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </>
      )}

      <button
        onClick={handleSubmit}
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
      >
        Shorten URL
      </button>

      {error && (
        <div className="mt-4 p-3 bg-red-900 text-red-300 rounded-md border border-red-700">
          {error}
        </div>
      )}

      {shortUrl && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2 text-gray-200">Your shortened URL:</h2>
          <div className="flex items-center">
            <input
              type="text"
              readOnly
              value={shortUrl}
              className="flex-1 p-2 border border-gray-700 bg-gray-800 text-gray-100 rounded-l-md"
            />
            <button
              onClick={handleCopy}
              className={`px-4 py-2 rounded-r-md transition-colors duration-200 ${
                copied
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-700 text-gray-100 hover:bg-gray-600'
              }`}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UrlForm
