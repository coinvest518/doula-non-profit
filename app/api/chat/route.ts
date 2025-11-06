import { NextRequest, NextResponse } from 'next/server'
import { Mistral } from '@mistralai/mistralai'

const mistral = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY!,
})

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    const response = await mistral.chat.complete({
      model: 'ft:ministral-3b-latest:de3de3a4:20251106:e77f90f2',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful doula and birth education assistant. Provide supportive, evidence-based information about pregnancy, birth, and postpartum care. Always recommend consulting healthcare providers for medical concerns.'
        },
        {
          role: 'user',
          content: message
        }
      ],
      maxTokens: 500,
    })

    return NextResponse.json({
      response: response.choices?.[0]?.message?.content || 'I apologize, but I could not generate a response.'
    })
  } catch (error) {
    console.error('Mistral API error:', error)
    return NextResponse.json(
      { error: 'Failed to get response from AI assistant' },
      { status: 500 }
    )
  }
}