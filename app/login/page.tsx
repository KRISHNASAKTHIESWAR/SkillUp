'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { BookOpen, ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Here you would typically handle the login logic
    console.log('Login attempt', { email, password })
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
            <h1 className="text-3xl font-bold">Welcome back</h1>
            <p className="text-gray-500">Enter your credentials to access your account</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              Sign In
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
          <div className="text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </div>
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