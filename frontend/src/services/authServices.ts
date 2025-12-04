import type { ICreateUserPayload, ILoginPayload } from '@/types/types'

// Use import.meta.env to access environment variables exposed by Vite.
// We default to the /api proxy path configured in vite.config.js.
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

export const createUserService = async (payload: ICreateUserPayload) => {
  const url = `${API_BASE_URL}/register`

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Registration failed: ${response.status} - ${errorText}`)
    }

    return response.json()
  } catch (error) {
    console.error('Error during user creation:', error)
    throw error
  }
}

export const loginUserService = async (payload: ILoginPayload) => {
  const url = `${API_BASE_URL}/login`

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Login failed: ${response.status} - ${errorText}`)
    }

    return response.json()
  } catch (error) {
    console.error('Error during user login:', error)
    throw error
  }
}
