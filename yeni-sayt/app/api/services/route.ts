import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { order: 'asc' }
    })
    return NextResponse.json(services)
  } catch (error) {
    console.error('GET services error:', error)
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('Received service data:', body)
    
    // Validate required fields
    if (!body.titleAz || !body.descriptionAz || !body.slug) {
      return NextResponse.json({ 
        error: 'Başlıq, təsvir və slug məcburidir' 
      }, { status: 400 })
    }

    // Prepare features data
    const features = Array.isArray(body.features) ? body.features : []

    const serviceData = {
      title: body.titleAz, // Using titleAz as title
      titleAz: body.titleAz,
      description: body.descriptionAz, // Using descriptionAz as description
      descriptionAz: body.descriptionAz,
      content: body.contentAz || '', // Using contentAz as content
      contentAz: body.contentAz || '',
      slug: body.slug,
      image: body.image || null,
      features: features,
      order: body.order || 0,
      isActive: body.isActive !== false
    }

    console.log('Creating service with data:', serviceData)

    const service = await prisma.service.create({
      data: serviceData
    })
    
    console.log('Service created successfully:', service)
    return NextResponse.json(service)
  } catch (error: any) {
    console.error('Service creation error:', error)
    console.error('Error details:', {
      code: error.code,
      message: error.message,
      meta: error.meta
    })
    
    // Handle unique constraint violation
    if (error.code === 'P2002') {
      return NextResponse.json({ 
        error: 'Bu slug artıq mövcuddur. Başqa bir slug istifadə edin.' 
      }, { status: 400 })
    }
    
    return NextResponse.json({ 
      error: 'Xidmət yaradılarkən xəta baş verdi: ' + error.message
    }, { status: 500 })
  }
}
