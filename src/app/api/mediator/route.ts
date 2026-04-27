import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { createHash } from 'crypto'
import { mediatorPrompt } from '@/lib/prompt.mediator'
import { getGithubProjects, getLocalProfile } from '@/lib/helper.profile'
import { checkRateLimit } from '@/lib/ratelimit.mediator'
import { validateRequest } from '@/lib/validate.mediatior'

const responseCache = new Map<string, string>()

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey)
    return NextResponse.json({ error: 'API Key missing' }, { status: 500 })

  try {
    const ip = req.headers.get('x-forwarded-for') ?? '127.0.0.1'
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          error:
            'Request limited by time, this a freetier for testing my profile, so be patience and try in a minute.',
        },
        { status: 429 }
      )
    }

    const { formData } = await req.json()
    const validation = validateRequest(formData)
    if (!validation.valid) {
      return NextResponse.json(
        { error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      )
    }

    const cacheKey = createHash('sha256')
      .update(JSON.stringify(formData))
      .digest('hex')

    const cached = responseCache.get(cacheKey)
    if (cached) return NextResponse.json({ text: cached })

    const { experience, certifications, preferences } = await getLocalProfile()
    const githubData = await getGithubProjects()

    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: { temperature: 0 },
    })

    const systemPrompt = mediatorPrompt({
      experience,
      certifications,
      preferences,
      githubData,
      modalidad: formData.modalidad,
      stack: formData.stack,
      description: formData.description,
    })

    const result = await model.generateContent(systemPrompt)
    const text = result.response.text()

    responseCache.set(cacheKey, text)

    return NextResponse.json({ text })
  } catch (error: unknown) {
    console.error('Error en Gemini:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'

    return NextResponse.json({ error: message }, { status: 500 })
  }
}
