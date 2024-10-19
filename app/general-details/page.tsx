'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { BookOpen, ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'

export default function GeneralDetailsForm() {
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [occupation, setOccupation] = useState('student')
  const [qualification, setQualification] = useState('')
  const [preferredRole, setPreferredRole] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Here you would typically handle the form submission logic
    console.log('Form submitted', { name, address, phoneNumber, occupation, qualification, preferredRole })
    // For now, we'll just redirect to a hypothetical dashboard
    router.push('/dashboard')
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative">
      <div className="absolute inset-0 bg-grid-white/[0.2] bg-[size:20px_20px]" style={{ maskImage: 'radial-gradient(white, transparent)', WebkitMaskImage: 'radial-gradient(white, transparent)' }}></div>
      <header className="px-4 lg:px-6 h-14 flex items-center relative z-10">
        <Link className="flex items-center justify-center" href="/">
          <BookOpen className="h-6 w-6 text-white" />
          <span className="ml-2 text-2xl font-bold text-white">SkillUp</span>
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center relative z-10">
        <div className="w-full max-w-md space-y-8 px-8 py-10 bg-white/90 backdrop-blur-sm shadow-2xl rounded-lg">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Complete Your Profile</h1>
            <p className="text-gray-500">Please provide some additional details to get started</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="tel"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Occupation</Label>
              <RadioGroup value={occupation} onValueChange={setOccupation}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="student" id="student" />
                  <Label htmlFor="student">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="working" id="working" />
                  <Label htmlFor="working">Working Professional</Label>
                </div>
              </RadioGroup>
            </div>
            {occupation === 'student' && (
              <div className="space-y-2">
                <Label htmlFor="qualification">Qualification</Label>
                <Input
                  id="qualification"
                  type="text"
                  required
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                />
              </div>
            )}
            {occupation === 'working' && (
              <div className="space-y-2">
                <Label htmlFor="preferredRole">Preferred Role</Label>
                <Input
                  id="preferredRole"
                  type="text"
                  required
                  value={preferredRole}
                  onChange={(e) => setPreferredRole(e.target.value)}
                />
              </div>
            )}
            <Button type="submit" className="w-full">
              Complete Profile
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-300/20 relative z-10">
        <p className="text-xs text-white/80">
          © 2024 SkillUp. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs text-white/80 hover:text-white hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs text-white/80 hover:text-white hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}