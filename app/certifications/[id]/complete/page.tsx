'use client'

import { useEffect, useState } from 'react'
import { LinkedInUpdate } from '@/components/linkedin-update'

export default function CertificationCompletePage({ params }: { params: { id: string } }) {
  const [certification, setCertification] = useState<any>(null)

  useEffect(() => {
    // Fetch certification details
    const fetchCertification = async () => {
      // In a real app, this would be an API call
      const certData = {
        id: params.id,
        title: 'Advanced Web Development',
        description: 'Mastery in modern web technologies and best practices',
      }
      setCertification(certData)
    }

    fetchCertification()
  }, [params.id])

  if (!certification) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Certification Completed!</h1>
      <p className="mb-4">Congratulations on completing the {certification.title} certification!</p>
      <LinkedInUpdate
        achievement={{
          type: 'certification',
          title: certification.title,
          description: certification.description,
        }}
      />
    </div>
  )
}