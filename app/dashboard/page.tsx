'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BookOpen, User, BookMarked, Award, LogOut, Video, History, Star, Map } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

export default function Dashboard() {
  const [progress, setProgress] = useState(30)
  const [points, setPoints] = useState(100)

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

        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="col-span-full">
            <CardHeader>
              <CardTitle>Your Learning Journey</CardTitle>
              <CardDescription>Explore roadmaps and track your progress</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/roadmaps">
                <Button className="w-full">
                  <Map className="mr-2 h-4 w-4" /> Explore Roadmaps
                </Button>
              </Link>
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
              <Button className="mt-4 w-full" onClick={() => setProgress(Math.min(progress + 10, 100))}>
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