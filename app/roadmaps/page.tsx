'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import { ChevronRight, BookOpen, Code } from 'lucide-react'

const mockPredefinedRoadmaps = [
  { id: 'web-dev', name: 'Web Development', description: 'Learn frontend and backend web technologies' },
  { id: 'data-science', name: 'Data Science', description: 'Master data analysis and machine learning' },
  { id: 'mobile-dev', name: 'Mobile Development', description: 'Build iOS and Android applications' },
]

const mockTechnologies = [
  { id: 'react', name: 'React' },
  { id: 'python', name: 'Python' },
  { id: 'nodejs', name: 'Node.js' },
  { id: 'java', name: 'Java' },
  { id: 'swift', name: 'Swift' },
]

export default function RoadmapsPage() {
  const [selectedPredefined, setSelectedPredefined] = useState('')
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([])
  const [roadmapSteps, setRoadmapSteps] = useState<any[]>([])
  const [resources, setResources] = useState<any[]>([])

  useEffect(() => {
    if (selectedPredefined || selectedTechnologies.length > 0) {
      fetchRoadmapSteps()
      fetchResources()
    }
  }, [selectedPredefined, selectedTechnologies])

  const fetchRoadmapSteps = async () => {
    const params = new URLSearchParams()
    if (selectedPredefined) {
      params.append('roadmapId', selectedPredefined)
    }
    if (selectedTechnologies.length > 0) {
      params.append('technologies', selectedTechnologies.join(','))
    }

    const response = await fetch(`/api/roadmap-steps?${params}`)
    const data = await response.json()
    setRoadmapSteps(data)
  }

  const fetchResources = async () => {
    const params = new URLSearchParams()
    if (selectedPredefined) {
      params.append('roadmapId', selectedPredefined)
    }
    if (selectedTechnologies.length > 0) {
      params.append('technologies', selectedTechnologies.join(','))
    }

    const response = await fetch(`/api/resources?${params}`)
    const data = await response.json()
    setResources(data)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Learning Roadmaps</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Predefined Roadmap</CardTitle>
            <CardDescription>Choose a structured learning path</CardDescription>
          </CardHeader>
          <CardContent>
            <Select onValueChange={setSelectedPredefined}>
              <SelectTrigger>
                <SelectValue placeholder="Select a predefined roadmap" />
              </SelectTrigger>
              <SelectContent>
                {mockPredefinedRoadmaps.map((roadmap) => (
                  <SelectItem key={roadmap.id} value={roadmap.id}>
                    {roadmap.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Custom Roadmap</CardTitle>
            <CardDescription>Create your own learning path</CardDescription>
          </CardHeader>
          <CardContent>
            <Select
              onValueChange={(value) => setSelectedTechnologies((prev) => [...prev, value])}
            >
              <SelectTrigger>
                <SelectValue placeholder="Add technologies to your roadmap" />
              </SelectTrigger>
              <SelectContent>
                {mockTechnologies.map((tech) => (
                  <SelectItem key={tech.id} value={tech.id}>
                    {tech.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedTechnologies.map((tech) => (
                <Button
                  key={tech}
                  variant="secondary"
                  size="sm"
                  onClick={() => setSelectedTechnologies((prev) => prev.filter((t) => t !== tech))}
                >
                  {tech} ✕
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {(selectedPredefined || selectedTechnologies.length > 0) && (
        <>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Your Roadmap</CardTitle>
            </CardHeader>
            <CardContent>
              {roadmapSteps.map((step, index) => (
                <div key={step.id} className="flex items-center mb-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step.completed ? 'bg-green-500' : 'bg-gray-300'} text-white mr-4`}>
                    {index + 1}
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold">{step.name}</h3>
                    <Progress value={step.completed ? 100 : 0} className="mt-2" />
                  </div>
                  <ChevronRight className="w-6 h-6 text-gray-400" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommended Resources</CardTitle>
            </CardHeader>
            <CardContent>
              {resources.map((resource) => (
                <div key={resource.id} className="flex items-center mb-4">
                  {resource.type === 'video' && <BookOpen className="w-6 h-6 mr-4 text-blue-500" />}
                  {resource.type === 'course' && <Code className="w-6 h-6 mr-4 text-green-500" />}
                  {resource.type === 'article' && <BookOpen className="w-6 h-6 mr-4 text-yellow-500" />}
                  <div>
                    <h3 className="font-semibold">{resource.title}</h3>
                    <p className="text-sm text-gray-500 capitalize">{resource.type}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}