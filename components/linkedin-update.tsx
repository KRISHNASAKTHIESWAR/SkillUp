'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/components/ui/use-toast'

interface LinkedInUpdateProps {
  achievement: {
    type: 'certification' | 'project'
    
    title: string
    description: string
  }
}

export function LinkedInUpdate({ achievement }: LinkedInUpdateProps) {
  const [isChecked, setIsChecked] = useState(true)
  const { toast } = useToast()

  const handleUpdate = async () => {
    if (!isChecked) return

    try {
      // In a real application, this would be an API call to your backend
      // which would then use the LinkedIn API to post the update
      const response = await fetch('/api/linkedin/post-update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(achievement),
      })

      if (!response.ok) {
        throw new Error('Failed to post update to LinkedIn')
      }

      toast({
        title: 'LinkedIn Updated',
        description: `Your ${achievement.type} has been posted to LinkedIn.`,
      })
    } catch (error) {
      console.error('Error posting to LinkedIn:', error)
      toast({
        title: 'Update Failed',
        description: 'There was an error posting your update to LinkedIn. Please try again.',
        variant: 'destructive',
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Share Your Achievement</CardTitle>
        <CardDescription>
          Congratulations on your new {achievement.type}! Would you like to share it on LinkedIn?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-4">
          <Checkbox
            id="linkedin-share"
            checked={isChecked}
            onCheckedChange={(checked: boolean) => setIsChecked(checked as boolean)}
          />
          <label
            htmlFor="linkedin-share"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Post to LinkedIn
          </label>
        </div>
        <Button onClick={handleUpdate} disabled={!isChecked}>
          Share Achievement
        </Button>
      </CardContent>
    </Card>
  )
}