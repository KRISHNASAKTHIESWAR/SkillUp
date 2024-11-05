'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Github, Linkedin } from 'lucide-react'

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    bio: '',
    linkedInConnected: false,
    githubConnected: false,
  })

  useEffect(() => {
    // Fetch user data from API
    const fetchUserData = async () => {
      // In a real app, this would be an API call
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        bio: 'Passionate learner and developer',
        linkedInConnected: false,
        githubConnected: false,
      }
      setUser(userData)
    }

    fetchUserData()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setUser(prevUser => ({ ...prevUser, [name]: value }))
  }

  const handleSave = async () => {
    // In a real app, this would be an API call to update user data
    console.log('Saving user data:', user)
    // Implement API call here
  }

  const handleLinkedInConnect = () => {
    // Implement LinkedIn OAuth2 flow
    window.location.href = '/api/auth/linkedin'
  }

  const handleGitHubConnect = () => {
    // Implement GitHub OAuth2 flow
    window.location.href = '/api/auth/github'
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your profile details and manage connected accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={user.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={user.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={user.bio}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex space-x-4">
              <Button
                type="button"
                onClick={handleLinkedInConnect}
                className="flex items-center"
                variant={user.linkedInConnected ? "secondary" : "default"}
              >
                <Linkedin className="w-4 h-4 mr-2" />
                {user.linkedInConnected ? 'LinkedIn Connected' : 'Connect LinkedIn'}
              </Button>
              <Button
                type="button"
                onClick={handleGitHubConnect}
                className="flex items-center"
                variant={user.githubConnected ? "secondary" : "default"}
              >
                <Github className="w-4 h-4 mr-2" />
                {user.githubConnected ? 'GitHub Connected' : 'Connect GitHub'}
              </Button>
            </div>
            <Button type="submit">Save Changes</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}