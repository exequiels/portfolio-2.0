export const geminiService = {
  async analyzeJobOffer(formData: {
    modalidad: string
    stack: string[]
    description: string
  }) {
    const res = await fetch('/api/mediator', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ formData }),
    })

    const data = await res.json()
    if (!res.ok) {
      throw new Error(data?.error ?? 'API error')
    }
    return data.text
  },
}
