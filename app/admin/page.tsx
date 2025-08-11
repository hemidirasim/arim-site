import { prisma } from '@/lib/db'
import { 
  Settings, 
  Building2, 
  Star, 
  Mail, 
  TrendingUp,
  Users,
  Calendar,
  MessageSquare
} from 'lucide-react'

async function getStats() {
  try {
    const [services, partners, testimonials, contacts, unreadContacts] = await Promise.all([
      prisma.service.count({ where: { isActive: true } }),
      prisma.partner.count({ where: { isActive: true } }),
      prisma.testimonial.count({ where: { isActive: true } }),
      prisma.contact.count(),
      prisma.contact.count({ where: { isRead: false } })
    ])

    return {
      services,
      partners,
      testimonials,
      contacts,
      unreadContacts
    }
  } catch (error) {
    console.error('Failed to fetch stats:', error)
    return {
      services: 0,
      partners: 0,
      testimonials: 0,
      contacts: 0,
      unreadContacts: 0
    }
  }
}

async function getRecentContacts() {
  try {
    const contacts = await prisma.contact.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' }
    })
    return contacts
  } catch (error) {
    console.error('Failed to fetch recent contacts:', error)
    return []
  }
}

export default async function AdminDashboard() {
  const stats = await getStats()
  const recentContacts = await getRecentContacts()

  const statCards = [
    {
      title: 'Aktiv Xidmətlər',
      value: stats.services,
      icon: Settings,
      color: 'bg-blue-500'
    },
    {
      title: 'Tərəfdaşlar',
      value: stats.partners,
      icon: Building2,
      color: 'bg-green-500'
    },
    {
      title: 'Müştəri Şərhləri',
      value: stats.testimonials,
      icon: Star,
      color: 'bg-yellow-500'
    },
    {
      title: 'Yeni Mesajlar',
      value: stats.unreadContacts,
      icon: Mail,
      color: 'bg-red-500'
    }
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">İdarəetmə Paneli</h1>
        <p className="text-gray-600 mt-2">ARIM veb saytının idarəetmə paneli</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-full ${stat.color} text-white`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Contacts */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Son Mesajlar</h2>
            <a href="/admin/contacts" className="text-primary-600 hover:text-primary-700 text-sm">
              Hamısını gör →
            </a>
          </div>
          
          {recentContacts.length > 0 ? (
            <div className="space-y-4">
              {recentContacts.map((contact) => (
                <div key={contact.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{contact.name}</p>
                    <p className="text-sm text-gray-600">{contact.email}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(contact.createdAt).toLocaleDateString('az-AZ')}
                    </p>
                  </div>
                  {!contact.isRead && (
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Yeni
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">Hələ heç bir mesaj yoxdur</p>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Sürətli Əməliyyatlar</h2>
          <div className="space-y-3">
            <a
              href="/admin/services"
              className="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <Settings className="w-5 h-5 text-blue-600 mr-3" />
              <span className="text-blue-900">Yeni Xidmət Əlavə Et</span>
            </a>
            
            <a
              href="/admin/partners"
              className="flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <Building2 className="w-5 h-5 text-green-600 mr-3" />
              <span className="text-green-900">Yeni Tərəfdaş Əlavə Et</span>
            </a>
            
            <a
              href="/admin/testimonials"
              className="flex items-center p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
            >
              <Star className="w-5 h-5 text-yellow-600 mr-3" />
              <span className="text-yellow-900">Yeni Şərh Əlavə Et</span>
            </a>
            
            <a
              href="/admin/content"
              className="flex items-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <MessageSquare className="w-5 h-5 text-purple-600 mr-3" />
              <span className="text-purple-900">Sayt Məzmununu Redaktə Et</span>
            </a>
          </div>
        </div>
      </div>

      {/* System Info */}
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Sistem Məlumatları</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 text-gray-500 mr-2" />
            <span className="text-gray-600">
              Son yeniləmə: {new Date().toLocaleDateString('az-AZ')}
            </span>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 text-gray-500 mr-2" />
            <span className="text-gray-600">
              Cəmi mesaj: {stats.contacts}
            </span>
          </div>
          <div className="flex items-center">
            <TrendingUp className="w-4 h-4 text-gray-500 mr-2" />
            <span className="text-gray-600">
              Aktiv məzmun: {stats.services + stats.partners + stats.testimonials}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
