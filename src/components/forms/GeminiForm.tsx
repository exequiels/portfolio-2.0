'use client'
import { geminiService } from '@/services/gemini.service'
import { Button } from 'primereact/button'
// import { InputNumber } from 'primereact/inputnumber'
import { InputTextarea } from 'primereact/inputtextarea'
import { MultiSelect } from 'primereact/multiselect'
import { SelectButton } from 'primereact/selectbutton'
import { useEffect, useState } from 'react'
import { optionsStack } from '../utils/optionsStacks'

type FormData = {
  // salary: number | null
  modalidad: string
  stack: string[]
  description: string
}

const GeminiForm = () => {
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState<FormData>({
    // salary: null,
    modalidad: 'Remote',
    stack: [],
    description: '',
  })

  const [errors, setErrors] = useState({
    stack: '',
    description: '',
  })

  const optionsModalidad = ['Remote', 'Hybrid', 'On-Site']

  const handleCheck = async () => {
    setErrors({ stack: '', description: '' })

    let hasError = false

    if (formData.stack.length === 0) {
      setErrors((prev) => ({ ...prev, stack: 'Please choose a stack' }))
      hasError = true
    }

    if (!formData.description.trim()) {
      setErrors((prev) => ({
        ...prev,
        description: 'Please enter a job description',
      }))
      hasError = true
    }

    if (hasError) return

    setLoading(true)
    try {
      const result = await geminiService.analyzeJobOffer(formData)
      setResponse(result)
    } catch (e) {
      setResponse('Error connecting to API')
    }
    setLoading(false)
  }

  const loadingMessages = [
    'Analyzing job expectations...',
    'Matching skills with requirements...',
    'Identifying strengths and friction points...',
    'Cross-referencing role requirements...',
    'Comparing project scope with experience...',
    'Assessing learning curve and ramp-up time...',
    'Preparing compatibility summary...',
    'Finalizing recommendation...',
  ]

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)

  useEffect(() => {
    if (!loading) return

    if (currentMessageIndex !== 0) {
      Promise.resolve().then(() => setCurrentMessageIndex(0))
    }

    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => {
        if (prev < loadingMessages.length - 1) return prev + 1

        clearInterval(interval)
        return prev
      })
    }, 1500)

    return () => clearInterval(interval)
  }, [loading])

  return (
    <div className="flex flex-col gap-4">
      {/* <div>
        <label className="font-semibold">Monthly Budget (USD)</label>
        <InputNumber
          value={formData.salary}
          mode="currency"
          currency="USD"
          locale="en-US"
          placeholder="Min. expected or offered"
          onValueChange={(e) =>
            setFormData({ ...formData, salary: e.value ?? null })
          }
          className="w-full mt-1"
        />
      </div> */}
      <div>
        <label className="font-semibold">Work Mode</label>
        <SelectButton
          value={formData.modalidad}
          options={optionsModalidad}
          onChange={(e) => setFormData({ ...formData, modalidad: e.value })}
          className="w-full mt-1"
        />
      </div>
      <div>
        <label className="font-semibold">Tech Stack</label>
        <MultiSelect
          value={formData.stack}
          options={optionsStack}
          optionGroupLabel="label"
          optionGroupChildren="items"
          onChange={(e) => {
            setFormData({
              ...formData,
              stack: e.value,
            })
            if (errors.stack && e.value.length > 0) {
              setErrors((prev) => ({ ...prev, stack: '' }))
            }
          }}
          className="w-full mt-1"
          placeholder="Pick your stack"
          display="chip"
          filter
          filterPlaceholder="Search..."
        />
        {errors.stack && <small className="p-error">{errors.stack}</small>}
      </div>
      <div>
        <label className="font-semibold">Job Description</label>
        <InputTextarea
          value={formData.description}
          onChange={(e) => {
            setFormData({ ...formData, description: e.target.value })

            if (errors.description && e.target.value.trim()) {
              setErrors((prev) => ({ ...prev, description: '' }))
            }
          }}
          rows={5}
          placeholder="Pls a short description of the project, work enviroment, team, hours, salary and anything related ..."
          className="w-full mt-1"
          maxLength={5000}
        />
        {errors.description && (
          <small className="p-error">{errors.description}</small>
        )}
      </div>
      <div className="flex justify-end">
        <Button
          label="Check compatibility"
          onClick={handleCheck}
          disabled={loading}
          outlined
          raised
          className="flex justify-center align-middle p-0"
        />
      </div>
      {loading && (
        <div className="text-center animate-pulse">
          {loadingMessages[currentMessageIndex]}
          <i
            className="pi pi-spin pi-spinner ml-2"
            style={{ fontSize: '1rem' }}
          ></i>
        </div>
      )}
      {response && (
        <div className="mt-4 p-4 border border-gray-300 rounded bg-gray-50">
          <h3 className="font-bold mb-2">AI Analysis:</h3>
          <p className="whitespace-pre-wrap">{response}</p>
        </div>
      )}
    </div>
  )
}

export default GeminiForm
