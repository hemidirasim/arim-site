import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      where: { isActive: true },
      include: {
        partner: true
      },
      orderBy: { order: 'asc' }
    })
    return NextResponse.json(projects)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, mainImage, images, partnerId, isActive, order } = body

    const project = await prisma.project.create({
      data: {
        title,
        description,
        mainImage,
        images: images || [],
        partnerId: partnerId || null,
        isActive: isActive !== undefined ? isActive : true,
        order: order || 0
      },
      include: {
        partner: true
      }
    })

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}
