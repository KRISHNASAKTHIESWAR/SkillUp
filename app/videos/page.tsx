'use client'

import { useState, useEffect } from 'react'
import { Video, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

// This would typically come from an API
const mockVideos = [
  { id: 1, title: 'Introduction to React Hooks', duration: '15:30', thumbnail: '/placeholder.svg?height=120&width=200' },
  { id: 2, title: 'Advanced CSS Techniques', duration: '22:15', thumbnail: '/placeholder.svg?height=120&width=200' },
  { id: 3, title: 'JavaScript Promises Explained', duration: '18:45', thumbnail: '/placeholder.svg?height=120&width=200' },
  { id: 4, title: 'Building RESTful APIs with Node.js', duration: '25:00', thumbnail: '/placeholder.svg?height=120&width=200' },
  { id: 5, title: 'Responsive Web Design Principles', duration: '20:10', thumbnail: '/placeholder.svg?height=120&width=200' },
]

export default function VideosPage() {
  const [videos, setVideos] = useState([])
  const [selectedVideo, setSelectedVideo] = useState(null)

  useEffect(() => {
    // In a real application, you would fetch videos from an API here
    setVideos(mockVideos)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Course Videos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <Card key={video.id} className="overflow-hidden">
            <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover" />
            <CardHeader>
              <CardTitle>{video.title}</CardTitle>
              <CardDescription>Duration: {video.duration}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => setSelectedVideo(video)} className="w-full">
                <Play className="mr-2 h-4 w-4" /> Watch Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-3xl">
            <CardHeader>
              <CardTitle>{selectedVideo.title}</CardTitle>
              <Button onClick={() => setSelectedVideo(null)} variant="ghost" className="absolute top-2 right-2">
                Close
              </Button>
            </CardHeader>
            <CardContent>
              <div className="aspect-w-16 aspect-h-9">
                <Video className="w-full h-full" />
              </div>
              <p className="mt-4">Video player would be implemented here, potentially using a library like react-player.</p>
            
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}