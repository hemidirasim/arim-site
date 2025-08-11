import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    })
    return NextResponse.json(testimonials)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const testimonial = await prisma.testimonial.create({
      data: {
        name: body.name,
        nameAz: body.nameAz,
        content: body.content,
        contentAz: body.contentAz,
        rating: body.rating || 5,
        image: body.image,
        isActive: body.isActive !== false,
        order: body.order || 0
      }
    })
    return NextResponse.json(testimonial)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 })
  }
}
