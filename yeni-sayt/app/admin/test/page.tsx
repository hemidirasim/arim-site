'use client'

import { useState } from 'react'

export default function TestPage() {
  const [result, setResult] = useState('')

  const testServiceCreation = async () => {
    try {
      const testData = {
        titleAz: 'Test Xidməti',
        descriptionAz: 'Bu test xidmətidir',
        contentAz: '<h3>Test məzmunu</h3><p>Bu test xidmətinin məzmunudur.</p>',
        slug: 'test-service',
        image: '',
        features: ['Test xüsusiyyət 1', 'Test xüsusiyyət 2'],
        isActive: true,
        order: 0
      }

      console.log('Sending test data:', testData)

      const response = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testData)
      })

      console.log('Response status:', response.status)

      if (response.ok) {
        const result = await response.json()
        setResult('✅ Uğurlu: ' + JSON.stringify(result, null, 2))
        console.log('Success:', result)
      } else {
        const error = await response.json()
        setResult('❌ Xəta: ' + JSON.stringify(error, null, 2))
        console.error('Error:', error)
      }
    } catch (error) {
      setResult('❌ Xəta: ' + error)
      console.error('Exception:', error)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test Səhifəsi</h1>
      <button
        onClick={testServiceCreation}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Test Xidmət Yaratma
      </button>
      
      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <pre className="text-sm whitespace-pre-wrap">{result}</pre>
        </div>
      )}
    </div>
  )
}
