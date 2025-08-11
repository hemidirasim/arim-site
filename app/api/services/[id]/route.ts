import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const service = await prisma.service.findUnique({
      where: { id: params.id }
    })
    
    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 })
    }
    
    return NextResponse.json(service)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch service' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.titleAz || !body.descriptionAz || !body.slug) {
      return NextResponse.json({ 
        error: 'Başlıq, təsvir və slug məcburidir' 
      }, { status: 400 })
    }

    const service = await prisma.service.update({
      where: { id: params.id },
      data: {
        title: body.titleAz, // Using titleAz as title
        titleAz: body.titleAz,
        description: body.descriptionAz, // Using descriptionAz as description
        descriptionAz: body.descriptionAz,
        content: body.contentAz || '', // Using contentAz as content
        contentAz: body.contentAz || '',
        slug: body.slug,
        image: body.image || null,
        features: body.features || [],
        order: body.order || 0,
        isActive: body.isActive !== false
      }
    })
    
    return NextResponse.json(service)
  } catch (error: any) {
    console.error('Service update error:', error)
    
    // Handle unique constraint violation
    if (error.code === 'P2002') {
      return NextResponse.json({ 
        error: 'Bu slug artıq mövcuddur. Başqa bir slug istifadə edin.' 
      }, { status: 400 })
    }
    
    // Handle not found
    if (error.code === 'P2025') {
      return NextResponse.json({ 
        error: 'Xidmət tapılmadı' 
      }, { status: 404 })
    }
    
    return NextResponse.json({ 
      error: 'Xidmət yenilənərkən xəta baş verdi' 
    }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.service.delete({
      where: { id: params.id }
    })
    
    return NextResponse.json({ message: 'Service deleted successfully' })
  } catch (error: any) {
    console.error('Service delete error:', error)
    
    // Handle not found
    if (error.code === 'P2025') {
      return NextResponse.json({ 
        error: 'Xidmət tapılmadı' 
      }, { status: 404 })
    }
    
    return NextResponse.json({ 
      error: 'Xidmət silinərkən xəta baş verdi' 
    }, { status: 500 })
  }
}
