import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.nameAz) {
      return NextResponse.json({ 
        error: 'Tərəfdaş adı məcburidir' 
      }, { status: 400 })
    }

    const partner = await prisma.partner.update({
      where: { id: params.id },
      data: {
        name: body.nameAz, // Using nameAz as name
        nameAz: body.nameAz,
        logo: body.logo || null,
        website: body.website || null,
        isActive: body.isActive !== false,
        order: body.order || 0
      }
    })
    return NextResponse.json(partner)
  } catch (error: any) {
    console.error('Partner update error:', error)
    
    // Handle not found
    if (error.code === 'P2025') {
      return NextResponse.json({ 
        error: 'Tərəfdaş tapılmadı' 
      }, { status: 404 })
    }
    
    return NextResponse.json({ 
      error: 'Tərəfdaş yenilənərkən xəta baş verdi' 
    }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.partner.delete({
      where: { id: params.id }
    })
    return NextResponse.json({ message: 'Partner deleted successfully' })
  } catch (error: any) {
    console.error('Partner delete error:', error)
    
    // Handle not found
    if (error.code === 'P2025') {
      return NextResponse.json({ 
        error: 'Tərəfdaş tapılmadı' 
      }, { status: 404 })
    }
    
    return NextResponse.json({ 
      error: 'Tərəfdaş silinərkən xəta baş verdi' 
    }, { status: 500 })
  }
}
