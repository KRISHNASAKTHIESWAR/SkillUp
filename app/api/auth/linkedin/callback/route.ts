import { NextResponse } from 'next/server'

const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID
const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET
const LINKEDIN_REDIRECT_URI = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/linkedin/callback`

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.redirect('/profile?error=linkedin_auth_failed')
  }

  try {
    const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: LINKEDIN_CLIENT_ID!,
        client_secret: LINKEDIN_CLIENT_SECRET!,
        redirect_uri: LINKEDIN_REDIRECT_URI,
      }),
    })

    const tokenData = await tokenResponse.json()

    if (!tokenResponse.ok) {
      throw new Error(tokenData.error_description || 'Failed to obtain access token')
    }

    // Here you would typically:
    // 1. Fetch the user's LinkedIn profile using the access token
    // 2. Create or update the user in your database
    // 3. Create a session for the user

    // For now, we'll just redirect back to the profile page with a success message
    return NextResponse.redirect('/profile?linkedin=connected')
  } catch (error) {
    console.error('LinkedIn authentication error:', error)
    return NextResponse.redirect('/profile?error=linkedin_auth_failed')
  }
}