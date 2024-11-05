import { NextResponse } from 'next/server'

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.redirect('/profile?error=github_auth_failed')
  }

  try {
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
      }),
    })

    const tokenData = await tokenResponse.json()

    if (!tokenResponse.ok) {
      throw new Error(tokenData.error_description || 'Failed to obtain access token')
    }

    // Here you would typically:
    // 1. Fetch the user's GitHub profile using the access token
    // 2. Create or update the user in your database
    // 3. Create a session for the user

    // For now, we'll just redirect back to the profile page with a success message
    return NextResponse.redirect('/profile?github=connected')
  } catch (error) {
    console.error('GitHub authentication error:', error)
    return NextResponse.redirect('/profile?error=github_auth_failed')
  }
}