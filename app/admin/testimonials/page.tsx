'use client'

import { useState, useEffect } from 'react'
import ImageUpload from '@/components/ImageUpload'

interface Testimonial {
  id: string
  nameAz: string
  contentAz: string
  rating: number
  image?: string
  isActive: boolean
  order: number
  createdAt: string
  updatedAt: string
}

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)
  const [formData, setFormData] = useState({
    nameAz: '',
    contentAz: '',
    rating: 5,
    image: '',
    isActive: true,
    order: 0
  })

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonials')
      const data = await response.json()
      setTestimonials(data)
    } catch (error) {
      console.error('Failed to fetch testimonials:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingTestimonial 
        ? `/api/testimonials/${editingTestimonial.id}`
        : '/api/testimonials'
      
      const method = editingTestimonial ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        setShowForm(false)
        setEditingTestimonial(null)
        setFormData({
          nameAz: '',
          contentAz: '',
          rating: 5,
          image: '',
          isActive: true,
          order: 0
        })
        fetchTestimonials()
      } else {
        const errorData = await response.json()
        alert('Xəta: ' + (errorData.error || 'Naməlum xəta'))
      }
    } catch (error) {
      console.error('Failed to save testimonial:', error)
      alert('Xəta baş verdi')
    }
  }

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial)
    setFormData({
      nameAz: testimonial.nameAz,
      contentAz: testimonial.contentAz,
      rating: testimonial.rating,
      image: testimonial.image || '',
      isActive: testimonial.isActive,
      order: testimonial.order
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Bu şərhi silmək istədiyinizə əminsiniz?')) {
      try {
        const response = await fetch(`/api/testimonials/${id}`, {
          method: 'DELETE'
        })
        
        if (response.ok) {
          fetchTestimonials()
        }
      } catch (error) {
        console.error('Failed to delete testimonial:', error)
      }
    }
  }

  if (loading) {
    return <div>Yüklənir...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Müştəri Şərhləri</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
        >
          Yeni Şərh
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {editingTestimonial ? 'Şərhi Redaktə Et' : 'Yeni Şərh Əlavə Et'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Müştəri Adı *
                </label>
                <input
                  type="text"
                  value={formData.nameAz}
                  onChange={(e) => setFormData({ ...formData, nameAz: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reytinq *
                </label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value={1}>1 ulduz</option>
                  <option value={2}>2 ulduz</option>
                  <option value={3}>3 ulduz</option>
                  <option value={4}>4 ulduz</option>
                  <option value={5}>5 ulduz</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Şərh Məzmunu *
              </label>
              <textarea
                value={formData.contentAz}
                onChange={(e) => setFormData({ ...formData, contentAz: e.target.value })}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Müştərinin şərhi..."
              />
            </div>
            
            <ImageUpload
              value={formData.image}
              onChange={(url) => setFormData({ ...formData, image: url })}
              label="Müştəri Şəkli"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sıra
                </label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                  Aktiv
                </label>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  setEditingTestimonial(null)
                  setFormData({
                    nameAz: '',
                    contentAz: '',
                    rating: 5,
                    image: '',
                    isActive: true,
                    order: 0
                  })
                }}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Ləğv Et
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                {editingTestimonial ? 'Yadda Saxla' : 'Əlavə Et'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Şəkil
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Müştəri
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Şərh
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reytinq
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sıra
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tarix
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Əməliyyatlar
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {testimonials.map((testimonial) => (
              <tr key={testimonial.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {testimonial.image ? (
                    <img
                      src={testimonial.image}
                      alt={testimonial.nameAz}
                      className="w-12 h-12 object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-gray-400 text-xs">No img</span>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {testimonial.nameAz}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 max-w-xs truncate">
                    {testimonial.contentAz}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                    <span className="ml-1 text-sm text-gray-500">
                      ({testimonial.rating}/5)
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {testimonial.order}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    testimonial.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {testimonial.isActive ? 'Aktiv' : 'Deaktiv'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(testimonial.createdAt).toLocaleDateString('az-AZ')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(testimonial)}
                    className="text-primary-600 hover:text-primary-900 mr-4"
                  >
                    Redaktə
                  </button>
                  <button
                    onClick={() => handleDelete(testimonial.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {testimonials.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Hələ heç bir şərh yoxdur.</p>
          </div>
        )}
      </div>
    </div>
  )
}
