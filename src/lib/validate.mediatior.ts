import type { ValidationResult } from '@/lib/types.mediator'

// lib/validate.mediator.ts
export function validateRequest(body: unknown): ValidationResult {
  console.log('Validando body:', JSON.stringify(body, null, 2))

  const errors: Record<string, string> = {}

  // Verificar que body es un objeto
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    console.log('Body no es un objeto válido')
    return { valid: false, errors: { body: 'Invalid request format' } }
  }

  const data = body as {
    modalidad?: unknown
    stack?: unknown
    description?: unknown
  }

  // Validar modalidad
  const validModes = ['Remote', 'Hybrid', 'On-Site']
  if (
    typeof data.modalidad !== 'string' ||
    !validModes.includes(data.modalidad)
  ) {
    console.log('Modalidad inválida:', data.modalidad)
    errors.modalidad = 'Invalid work mode'
  }

  // Validar stack
  if (!Array.isArray(data.stack) || data.stack.length === 0) {
    console.log('Stack inválido:', data.stack)
    errors.stack = 'Please choose at least one technology'
  }

  // Validar description
  if (
    typeof data.description !== 'string' ||
    data.description.trim().length < 30
  ) {
    errors.description = 'Description too short (min 30 chars)'
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors }
  }

  console.log('Validación exitosa')
  return { valid: true }
}
