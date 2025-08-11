'use client'

import { useState, useEffect } from 'react'

interface Contact {
  id: string
  name: string
  email: string
  phone?: string
  message: string
  isRead: boolean
  createdAt: string
}

export default function AdminContacts() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/contacts')
      const data = await response.json()
      setContacts(data)
    } catch (error) {
      console.error('Failed to fetch contacts:', error)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id: string) => {
    try {
      const response = await fetch(`/api/contacts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead: true })
      })
      
      if (response.ok) {
        fetchContacts()
      }
    } catch (error) {
      console.error('Failed to mark as read:', error)
    }
  }

  const deleteContact = async (id: string) => {
    if (confirm('Bu mesajı silmək istədiyinizə əminsiniz?')) {
      try {
        const response = await fetch(`/api/contacts/${id}`, {
          method: 'DELETE'
        })
        
        if (response.ok) {
          fetchContacts()
        }
      } catch (error) {
        console.error('Failed to delete contact:', error)
      }
    }
  }

  if (loading) {
    return <div>Yüklənir...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Əlaqə Mesajları</h1>
        <div className="text-sm text-gray-600">
          Cəmi: {contacts.length} mesaj
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ad
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                E-mail
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Telefon
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mesaj
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tarix
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Əməliyyatlar
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {contacts.map((contact) => (
              <tr key={contact.id} className={!contact.isRead ? 'bg-blue-50' : ''}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {contact.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    <a href={`mailto:${contact.email}`} className="hover:text-primary-600">
                      {contact.email}
                    </a>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {contact.phone || '-'}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 max-w-xs truncate">
                    {contact.message}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(contact.createdAt).toLocaleDateString('az-AZ')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    contact.isRead 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {contact.isRead ? 'Oxunub' : 'Yeni'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {!contact.isRead && (
                    <button
                      onClick={() => markAsRead(contact.id)}
                      className="text-primary-600 hover:text-primary-900 mr-4"
                    >
                      Oxundu kimi qeyd et
                    </button>
                  )}
                  <button
                    onClick={() => deleteContact(contact.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {contacts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Hələ heç bir mesaj yoxdur.</p>
          </div>
        )}
      </div>
    </div>
  )
}
