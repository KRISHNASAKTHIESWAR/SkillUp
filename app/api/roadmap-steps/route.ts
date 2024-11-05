import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const roadmapId = searchParams.get('roadmapId')
  const technologies = searchParams.get('technologies')?.split(',')

  // In a real application, you would fetch this data from a database
  // based on the roadmapId or technologies
  const steps = [
    { id: 1, name: 'Fundamentals', completed: true },
    { id: 2, name: 'Advanced Concepts', completed: false },
    { id: 3, name: 'Project Building', completed: false },
    { id: 4, name: 'Best Practices', completed: false },
  ]

  return NextResponse.json(steps)
}