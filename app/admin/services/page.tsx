'use client'

import { useState, useEffect } from 'react'
import ImageUpload from '@/components/ImageUpload'
import RichTextEditor from '@/components/RichTextEditor'
import { Plus, X } from 'lucide-react'

interface Service {
  id: string
  titleAz: string
  descriptionAz: string
  contentAz: string
  slug: string
  image?: string
  features?: string[]
  isActive: boolean
  order: number
  createdAt: string
  updatedAt: string
}

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [formData, setFormData] = useState({
    titleAz: '',
    descriptionAz: '',
    contentAz: '',
    slug: '',
    image: '',
    features: [] as string[],
    isActive: true,
    order: 0
  })
  const [newFeature, setNewFeature] = useState('')

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services')
      const data = await response.json()
      setServices(data)
    } catch (error) {
      console.error('Failed to fetch services:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingService 
        ? `/api/services/${editingService.id}`
        : '/api/services'
      
      const method = editingService ? 'PUT' : 'POST'
      
      console.log('Submitting service data:', formData)
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      console.log('Response status:', response.status)
      
      if (response.ok) {
        const result = await response.json()
        console.log('Service saved successfully:', result)
        setShowForm(false)
        setEditingService(null)
        setFormData({
          titleAz: '',
          descriptionAz: '',
          contentAz: '',
          slug: '',
          image: '',
          features: [],
          isActive: true,
          order: 0
        })
        fetchServices()
      } else {
        const errorData = await response.json()
        console.error('Error response:', errorData)
        alert('Xəta: ' + (errorData.error || 'Naməlum xəta'))
      }
    } catch (error) {
      console.error('Failed to save service:', error)
      alert('Xəta baş verdi: ' + error)
    }
  }

  const handleEdit = (service: Service) => {
    setEditingService(service)
    setFormData({
      titleAz: service.titleAz,
      descriptionAz: service.descriptionAz,
      contentAz: service.contentAz,
      slug: service.slug,
      image: service.image || '',
      features: service.features || [],
      isActive: service.isActive,
      order: service.order
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Bu xidməti silmək istədiyinizə əminsiniz?')) {
      try {
        const response = await fetch(`/api/services/${id}`, {
          method: 'DELETE'
        })
        
        if (response.ok) {
          fetchServices()
        }
      } catch (error) {
        console.error('Failed to delete service:', error)
      }
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }))
      setNewFeature('')
    }
  }

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }))
  }

  const handleContentChange = (content: string) => {
    setFormData(prev => ({ ...prev, contentAz: content }))
  }

  if (loading) {
    return <div>Yüklənir...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Xidmətlər</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
        >
          Yeni Xidmət
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {editingService ? 'Xidməti Redaktə Et' : 'Yeni Xidmət Əlavə Et'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Xidmət Adı *
                </label>
                <input
                  type="text"
                  value={formData.titleAz}
                  onChange={(e) => {
                    setFormData({ ...formData, titleAz: e.target.value })
                    if (!editingService) {
                      setFormData(prev => ({ 
                        ...prev, 
                        titleAz: e.target.value,
                        slug: generateSlug(e.target.value)
                      }))
                    }
                  }}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slug *
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Qısa Təsvir *
              </label>
              <textarea
                value={formData.descriptionAz}
                onChange={(e) => setFormData({ ...formData, descriptionAz: e.target.value })}
                required
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <RichTextEditor
              value={formData.contentAz}
              onChange={handleContentChange}
              label="Ətraflı Məzmun *"
              placeholder="Xidmətin ətraflı məzmununu yazın..."
            />
            
            <ImageUpload
              value={formData.image}
              onChange={(url) => setFormData({ ...formData, image: url })}
              label="Xidmət Şəkli"
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Xidmət Xüsusiyyətləri
              </label>
              <div className="space-y-2">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="Yeni xüsusiyyət əlavə et..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                  />
                  <button
                    type="button"
                    onClick={addFeature}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 bg-gray-50 p-2 rounded">
                      <span className="flex-1 text-sm">{feature}</span>
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  setEditingService(null)
                  setFormData({
                    titleAz: '',
                    descriptionAz: '',
                    contentAz: '',
                    slug: '',
                    image: '',
                    features: [],
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
                {editingService ? 'Yadda Saxla' : 'Əlavə Et'}
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
                Xidmət
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Slug
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Xüsusiyyətlər
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
            {services.map((service) => (
              <tr key={service.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {service.image ? (
                    <img
                      src={service.image}
                      alt={service.titleAz}
                      className="w-12 h-12 object-cover rounded-lg"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-400 text-xs">No img</span>
                    </div>
                  )}
                  {service.image && (
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center hidden">
                      <span className="text-gray-400 text-xs">Error</span>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {service.titleAz}
                    </div>
                    <div className="text-sm text-gray-500 max-w-xs truncate">
                      {service.descriptionAz}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {service.slug}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {service.features && service.features.length > 0 ? (
                      <div className="space-y-1">
                        {(() => {
                          let featuresArray: string[] = []
                          if (Array.isArray(service.features)) {
                            featuresArray = service.features
                          } else if (typeof service.features === 'object') {
                            featuresArray = Object.values(service.features) as string[]
                          }
                          return featuresArray.slice(0, 2).map((feature, index) => (
                            <div key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {feature}
                            </div>
                          ))
                        })()}
                        {(() => {
                          let featuresArray: string[] = []
                          if (Array.isArray(service.features)) {
                            featuresArray = service.features
                          } else if (typeof service.features === 'object') {
                            featuresArray = Object.values(service.features) as string[]
                          }
                          return featuresArray.length > 2 && (
                            <div className="text-xs text-gray-500">
                              +{featuresArray.length - 2} daha
                            </div>
                          )
                        })()}
                      </div>
                    ) : (
                      <span className="text-gray-400">Xüsusiyyət yoxdur</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {service.order}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    service.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {service.isActive ? 'Aktiv' : 'Deaktiv'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(service.createdAt).toLocaleDateString('az-AZ')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(service)}
                    className="text-primary-600 hover:text-primary-900 mr-4"
                  >
                    Redaktə
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {services.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Hələ heç bir xidmət yoxdur.</p>
          </div>
        )}
      </div>
    </div>
  )
}
