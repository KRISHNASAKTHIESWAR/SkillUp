'use client'

import { useState, useEffect } from 'react'
import { Star, Lock, Unlock } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

// Define a type for benefits
type Benefit = {
  id: number;
  title: string;
  description: string;
  requiredPoints: number;
  icon: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & React.RefAttributes<SVGSVGElement>
  >;
};

const mockBenefits: Benefit[] = [
  { id: 1, title: 'Exclusive Webinar Access', description: 'Join live webinars with industry experts', requiredPoints: 100, icon: Unlock },
  { id: 2, title: 'Certificate of Completion', description: 'Receive a personalized certificate for your achievements', requiredPoints: 500, icon: Lock },
  { id: 3, title: 'One-on-One Mentoring Session', description: '30-minute session with a senior developer', requiredPoints: 1000, icon: Lock },
  { id: 4, title: 'Early Access to New Courses', description: 'Be the first to access newly released courses', requiredPoints: 1500, icon: Lock },
  { id: 5, title: 'Job Board Access', description: 'Exclusive access to our curated job board', requiredPoints: 2000, icon: Lock },
]

export default function BenefitsPage() {
  // Type the state as an array of Benefit objects
  const [benefits, setBenefits] = useState<Benefit[]>([])
  const [userPoints, setUserPoints] = useState(100)  // This would typically come from your user state or API

  useEffect(() => {
    // In a real application, you would fetch the benefits and user points from an API here
    setBenefits(mockBenefits)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Benefits</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Your Points</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-2">
            <Star className="h-6 w-6 text-yellow-500 mr-2" />
            <span className="text-2xl font-bold">{userPoints}</span>
          </div>
          <Progress value={(userPoints / 2000) * 100} className="w-full" />
          <p className="mt-2 text-sm text-gray-600">Keep earning points to unlock more benefits!</p>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((benefit) => (
          <Card key={benefit.id}>
            <CardHeader>
              <CardTitle className="flex items-center">
                {benefit.requiredPoints <= userPoints ? (
                  <Unlock className="mr-2 h-5 w-5 text-green-500" />
                ) : (
                  <Lock className="mr-2 h-5 w-5 text-gray-500" />
                )}
                {benefit.title}
              </CardTitle>
              <CardDescription>{benefit.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">
                  {benefit.requiredPoints} points required
                </span>
                {benefit.requiredPoints <= userPoints && (
                  <span className="text-sm font-medium text-green-500">Unlocked!</span>
                )}
              </div>
              <Progress
                value={(userPoints / benefit.requiredPoints) * 100}
                className="w-full mt-2"
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
