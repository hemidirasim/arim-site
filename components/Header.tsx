import Link from 'next/link'
import { Phone } from 'lucide-react'
import Image from 'next/image'
import { prisma } from '@/lib/db'
import HeaderClient from './HeaderClient'

async function getContent() {
  try {
    const contents = await prisma.content.findMany({
      orderBy: { createdAt: 'desc' }
    })
    
    const contentMap: { [key: string]: string } = {}
    contents.forEach(content => {
      contentMap[content.key] = content.valueAz || content.value
    })
    
    return contentMap
  } catch (error) {
    console.error('Failed to fetch content:', error)
    return {}
  }
}

export default async function Header() {
  const content = await getContent()

  const navigation = [
    { name: 'Əsas Səhifə', href: '/' },
    { name: 'Haqqımızda', href: '/about' },
    { name: 'Xidmətlərimiz', href: '/services' },
    { name: 'Tərəfdaşlar', href: '/partners' },
    { name: 'Əlaqə', href: '/contact' },
  ]

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/arim-logo.png"
                alt="ARIM Logo"
                width={150}
                height={50}
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Contact Info */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-600">İşiniz təcilidir?</p>
              <p className="text-sm font-medium text-gray-900">
                Zəng edin: {content['contact_phone'] || '(+994) 50 829 01 01'}
              </p>
            </div>
            <Phone className="w-5 h-5 text-primary-600" />
          </div>

          {/* Mobile menu button */}
          <HeaderClient navigation={navigation} contactPhone={content['contact_phone']} />
        </div>
      </div>
    </header>
  )
}
