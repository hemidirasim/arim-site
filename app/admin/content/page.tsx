'use client'

import { useState, useEffect } from 'react'
import RichTextEditor from '@/components/RichTextEditor'

interface Content {
  id: string
  key: string
  value: string
  valueAz: string
  type: string
  createdAt: string
  updatedAt: string
}

export default function AdminContent() {
  const [contents, setContents] = useState<Content[]>([])
  const [loading, setLoading] = useState(true)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingContent, setEditingContent] = useState<Content | null>(null)
  const [editFormData, setEditFormData] = useState({
    value: '',
    valueAz: '',
    type: 'text'
  })

  useEffect(() => {
    fetchContents()
  }, [])

  const fetchContents = async () => {
    try {
      const response = await fetch('/api/content')
      const data = await response.json()
      setContents(data)
    } catch (error) {
      console.error('Failed to fetch contents:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (content: Content) => {
    setEditingContent(content)
    setEditFormData({
      value: content.value,
      valueAz: content.valueAz,
      type: content.type
    })
    setShowEditModal(true)
  }

  const handleSaveEdit = async () => {
    if (!editingContent) return

    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: editingContent.key,
          value: editFormData.value,
          valueAz: editFormData.valueAz,
          type: editFormData.type
        })
      })

      if (response.ok) {
        setShowEditModal(false)
        setEditingContent(null)
        setEditFormData({ value: '', valueAz: '', type: 'text' })
        fetchContents()
      }
    } catch (error) {
      console.error('Failed to update content:', error)
    }
  }

  const handleContentChange = (value: string) => {
    setEditFormData(prev => ({ ...prev, valueAz: value }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Sayt Məzmunu</h1>
      </div>

      {/* Content List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Key
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Məzmun
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tip
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Əməliyyatlar
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {contents.map((content) => (
              <tr key={content.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {content.key}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <div className="max-w-xs truncate">
                    {content.valueAz || content.value}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {content.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(content)}
                    className="text-primary-600 hover:text-primary-900"
                  >
                    Redaktə et
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {showEditModal && editingContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editingContent.key} - Redaktə et
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Key
                </label>
                <input
                  type="text"
                  value={editingContent.key}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tip
                </label>
                <select
                  value={editFormData.type}
                  onChange={(e) => setEditFormData(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="text">Mətn</option>
                  <option value="html">HTML</option>
                  <option value="image">Şəkil URL</option>
                </select>
              </div>

              {editFormData.type === 'html' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Məzmun (HTML)
                  </label>
                  <RichTextEditor
                    value={editFormData.valueAz}
                    onChange={handleContentChange}
                    placeholder="Məzmun yazın..."
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Məzmun
                  </label>
                  <textarea
                    value={editFormData.valueAz}
                    onChange={(e) => setEditFormData(prev => ({ ...prev, valueAz: e.target.value }))}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Məzmun yazın..."
                  />
                </div>
              )}

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false)
                    setEditingContent(null)
                    setEditFormData({ value: '', valueAz: '', type: 'text' })
                  }}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Ləğv et
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                >
                  Yadda saxla
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
