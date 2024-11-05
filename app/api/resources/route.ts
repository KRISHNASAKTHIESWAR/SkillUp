import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const roadmapId = searchParams.get('roadmapId')
  const technologies = searchParams.get('technologies')?.split(',')

  // In a real application, you would fetch this data from a database
  // based on the roadmapId or technologies
  const resources = [
    { id: 1, title: 'Introduction to Web Development', type: 'video' },
    { id: 2, title: 'React Fundamentals', type: 'course' },
    { id: 3, title: 'Building RESTful APIs with Node.js', type: 'article' },
  ]

  return NextResponse.json(resources)
}