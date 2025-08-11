'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Phone } from 'lucide-react'

interface NavigationItem {
  name: string
  href: string
}

interface HeaderClientProps {
  navigation: NavigationItem[]
  contactPhone?: string
}

export default function HeaderClient({ navigation, contactPhone }: HeaderClientProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-gray-700 hover:text-primary-600 p-2"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-white z-40">
          <div className="p-6">
            <nav className="flex flex-col space-y-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-lg text-gray-700 hover:text-primary-600 font-medium transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Phone className="w-5 h-5 text-primary-600" />
                  <p className="text-sm text-gray-600">İşiniz təcilidir?</p>
                </div>
                <p className="text-lg font-medium text-gray-900">
                  {contactPhone || '(+994) 50 829 01 01'}
                </p>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
