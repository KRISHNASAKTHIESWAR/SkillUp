'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BookOpen, User, BookMarked, Award, LogOut, Code, Layers, Video, History, Star } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function Dashboard() {
  const [progress, setProgress] = useState(30)
  const [selectedPredefinedPath, setSelectedPredefinedPath] = useState('')
  const [selectedCustomPath, setSelectedCustomPath] = useState('')
  const [points, setPoints] = useState(100)

  const predefinedPaths = [
    { value: 'web-dev', label: 'Web Development' },
    { value: 'data-science', label: 'Data Science' },
    { value: 'mobile-dev', label: 'Mobile Development' },
    { value: 'devops', label: 'DevOps' },
    { value: 'ai-ml', label: 'AI and Machine Learning' },
  ]

  const customPaths = [
    { value: 'react', label: 'React' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'nodejs', label: 'Node.js' },
    { value: 'aws', label: 'AWS' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-white mr-2" />
            <h1 className="text-2xl font-bold text-white">SkillUp Dashboard</h1>
          </div>
          <nav className="space-x-4">
            <Link href="/profile">
              <Button variant="ghost" className="text-white hover:text-blue-200">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
            </Link>
            <Link href="/videos">
              <Button variant="ghost" className="text-white hover:text-blue-200">
                <Video className="h-4 w-4 mr-2" />
                Videos
              </Button>
            </Link>
            <Link href="/history">
              <Button variant="ghost" className="text-white hover:text-blue-200">
                <History className="h-4 w-4 mr-2" />
                History
              </Button>
            </Link>
            <Button variant="ghost" className="text-white hover:text-blue-200">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </nav>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-white">
          <Card className="col-span-full">
            <CardHeader>
              <CardTitle>Choose Your Learning Path</CardTitle>
              <CardDescription>Select a predefined roadmap or create a custom path</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Predefined Roadmap</h3>
                <Select onValueChange={setSelectedPredefinedPath}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a predefined path" />
                  </SelectTrigger>
                  <SelectContent className='bg-white'>
                    {predefinedPaths.map((path) => (
                      <SelectItem key={path.value} value={path.value}>
                        {path.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedPredefinedPath && (
                  <Button className="mt-4 w-full">
                    Start Predefined Path
                  </Button>
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Custom Path</h3>
                <Select onValueChange={setSelectedCustomPath}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a custom path" />
                  </SelectTrigger>
                  <SelectContent className='bg-white'>
                    {customPaths.map((path) => (
                      <SelectItem key={path.value} value={path.value}>
                        {path.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedCustomPath && (
                  <Button className="mt-4 w-full">
                    Create Custom Path
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current Learning Path</CardTitle>
              <CardDescription>Web Development Fundamentals</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={progress} className="w-full" />
              <p className="mt-2 text-sm text-gray-600">{progress}% Complete</p>
              <Button className="mt-4 w-full " onClick={() => setProgress(Math.min(progress + 10, 100))}>
                Continue Learning
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Points</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Star className="h-6 w-6 text-yellow-500 mr-2" />
                  <span className="text-2xl font-bold">{points}</span>
                </div>
                <Link href="/benefits">
                  <Button variant="outline">View Benefits</Button>
                </Link>
              </div>
              <p className="mt-2 text-sm text-gray-600">Complete quizzes to earn more points and unlock benefits!</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Videos</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>
                  <Link href="/videos/1" className="text-blue-600 hover:underline flex items-center">
                    <Video className="h-4 w-4 mr-2" />
                    Introduction to React Hooks
                  </Link>
                </li>
                <li>
                  <Link href="/videos/2" className="text-blue-600 hover:underline flex items-center">
                    <Video className="h-4 w-4 mr-2" />
                    Advanced CSS Techniques
                  </Link>
                </li>
                <li>
                  <Link href="/videos/3" className="text-blue-600 hover:underline flex items-center">
                    <Video className="h-4 w-4 mr-2" />
                    JavaScript Promises Explained
                  </Link>
                </li>
              </ul>
              <Link href="/videos">
                <Button className="mt-4 w-full">View All Videos</Button>
              </Link>
            </CardContent>
          </Card>

        </main>
      </div>
    </div>
  )
}