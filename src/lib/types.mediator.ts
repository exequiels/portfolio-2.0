// Lo que esperas recibir del frontend
export interface MediatorRequest {
  modalidad: string
  stack: string[]
  description: string
}

// Posibles errores de validación
export interface ValidationErrors {
  body?: string
  modalidad?: string
  stack?: string
  description?: string
}

// Lo que retorna el validador
export interface ValidationResult {
  valid: boolean
  errors?: ValidationErrors
}
