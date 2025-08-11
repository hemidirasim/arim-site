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
          className="text-gray-700 hover:text-primary-600"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden py-4 border-t">
          <nav className="flex flex-col space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t">
              <p className="text-sm text-gray-600">İşiniz təcilidir?</p>
              <p className="text-sm font-medium text-gray-900">
                Zəng edin: {contactPhone || '(+994) 50 829 01 01'}
              </p>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
