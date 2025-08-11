import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const content = await prisma.content.update({
      where: { id: params.id },
      data: {
        key: body.key,
        value: body.contentAz, // Using contentAz as value
        valueAz: body.contentAz,
        type: body.type
      }
    })
    return NextResponse.json(content)
  } catch (error) {
    console.error('Content update error:', error)
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const content = await prisma.content.delete({
      where: { id: params.id }
    })
    return NextResponse.json(content)
  } catch (error) {
    console.error('Content deletion error:', error)
    return NextResponse.json({ error: 'Failed to delete content' }, { status: 500 })
  }
}
