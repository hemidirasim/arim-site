import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const contents = await prisma.content.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(contents)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch contents' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Check if content with this key already exists
    const existingContent = await prisma.content.findUnique({
      where: { key: body.key }
    })

    let content
    if (existingContent) {
      // Update existing content
      content = await prisma.content.update({
        where: { key: body.key },
        data: {
          value: body.value || body.contentAz,
          valueAz: body.valueAz || body.contentAz,
          type: body.type || 'text'
        }
      })
    } else {
      // Create new content
      content = await prisma.content.create({
        data: {
          key: body.key,
          value: body.value || body.contentAz,
          valueAz: body.valueAz || body.contentAz,
          type: body.type || 'text'
        }
      })
    }
    
    return NextResponse.json(content)
  } catch (error) {
    console.error('Content creation/update error:', error)
    return NextResponse.json({ error: 'Failed to create/update content' }, { status: 500 })
  }
}
