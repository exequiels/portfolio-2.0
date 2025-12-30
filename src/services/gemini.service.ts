export const geminiService = {
  async analyzeJobOffer(formData: {
    modalidad: string
    stack: string[]
    description: string
  }) {
    const res = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ formData }),
    })

    if (!res.ok) throw new Error('Failed to analyze')

    const data = await res.json()
    return data.text
  },
}
