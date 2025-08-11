import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const partners = await prisma.partner.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    })
    return NextResponse.json(partners)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch partners' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.nameAz) {
      return NextResponse.json({ 
        error: 'Tərəfdaş adı məcburidir' 
      }, { status: 400 })
    }

    const partner = await prisma.partner.create({
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
    console.error('Partner creation error:', error)
    return NextResponse.json({ 
      error: 'Tərəfdaş yaradılarkən xəta baş verdi' 
    }, { status: 500 })
  }
}
