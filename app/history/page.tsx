'use client'

import { useState, useEffect } from 'react'
import { Video, Calendar } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

// This would typically come from an API
const mockHistory = [
  { id: 1, title: 'Introduction to React Hooks', watchedOn: '2023-05-15', progress: 100 },
  { id: 2, title: 'Advanced CSS Techniques', watchedOn: '2023-05-14', progress: 75 },
  { id: 3, title: 'JavaScript Promises Explained', watchedOn: '2023-05-13', progress: 100 },
  { id: 4, title: 'Building RESTful APIs with Node.js', watchedOn: '2023-05-12', progress: 50 },
  { id: 5, title: 'Responsive Web Design Principles', watchedOn: '2023-05-11', progress: 90 },
]

export default function HistoryPage() {
  const [history, setHistory] = useState([])

  useEffect(() => {
    // In a real application, you would fetch the watch history from an API here
    setHistory(mockHistory)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Watch History</h1>
      <div className="space-y-4">
        {history.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Video className="mr-2 h-5 w-5" />
                {item.title}
              </CardTitle>
              <CardDescription className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                Watched on: {item.watchedOn}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-500">{item.progress}%</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}