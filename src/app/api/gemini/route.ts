import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import fs from 'fs'
import path from 'path'
import { githubService } from '@/services/github.service'

async function getLocalProfile() {
  try {
    const dataPath = path.join(process.cwd(), 'src/data')
    const experience = fs.readFileSync(path.join(dataPath, 'miData.ts'), 'utf8')
    const certifications = fs.readFileSync(
      path.join(dataPath, 'certifications.ts'),
      'utf8'
    )
    const preferences = fs.readFileSync(
      path.join(dataPath, 'preferences.ts'),
      'utf8'
    )
    return { experience, certifications, preferences }
  } catch (e) {
    console.error('Error reading local files:', e)
    return { experience: '', certifications: '', preferences: '' }
  }
}

async function getGithubProjects() {
  const token = process.env.GITHUB_TOKEN
  const username = 'exequiels'
  return await githubService.getPortfolioProjects(username, token)
}

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey)
    return NextResponse.json({ error: 'API Key missing' }, { status: 500 })

  try {
    const { formData } = await req.json()
    const { experience, certifications, preferences } = await getLocalProfile()
    const githubData = await getGithubProjects()

    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

    const systemPrompt = `
      You are a senior technical recruiter with experience evaluating job offers for Full Stack developers focused on AWS, Node.js, React, and cloud-based environments.

      # VALIDATION STEP ONE (CRITICAL - DO THIS FIRST):
      Before analyzing anything, validate if the "Description" field contains relevant job offer information.
      **If the description does NOT mention:**
      - Job responsibilities, tasks, or duties
      - Project requirements or technical needs
      - Team structure, company info, or work environment
      - Salary, benefits, or hiring conditions
      
      **Then respond ONLY with:**
      "Invalid Job Description: The description field must contain information about the job position, responsibilities, project requirements, or work conditions. Please provide a proper job offer description to analyze compatibility."
      **If for some reason the description is found invalid then valid, do not mention it in the analysis and continue with the analysis.**
      **Do NOT proceed with the analysis if the description is off-topic, irrelevant, or contains unrelated content (recipes, jokes, random text, etc.).**

      ---

      # YOUR TASK (ONLY IF VALIDATION PASSES):
      - Analyze the given job offer.
      - Check if the proposal aligns with my profile and real experience.
      - Identify risks, red flags, or mismatches.
      - Confirm if the required technologies and responsibilities match my stack.
      - If something is unclear, first validate using my profile context instead of asking unrelated questions.

      # IMPORTANT INSTRUCTION:
      Do NOT ask unnecessary questions.
      Do NOT explore technologies or areas not mentioned in the job offer.
      Do NOT assume I have skills outside the declared stack.
      If something is out of scope or irrelevant, simply mark it as: **"Not applicable"**.

      ---

      # CANDIDATE CONTEXT (EXEQUIEL):
      - Experience & Education: ${experience}
      - Certifications: ${certifications}
      - Job Preferences & Salary Expectations: ${preferences}
      - Highlighted GitHub Projects: ${githubData}

      ---

      # JOB OFFER DATA TO EVALUATE:
      - **Work modality:** ${formData.modalidad}
      - **Required technologies:** ${formData.stack.join(', ')}
      - **Description:** ${formData.description}

      ---

      # EXPECTED ANSWER STRUCTURE (ONLY IF DESCRIPTION IS VALID):

      1. **Compatibility Score:** A percentage from 0% to 100% based on an objective analysis of the requirements vs. Exequiel's profile.
      2. **Justification (4–6 lines):** Explain the reasoning behind the score. If the score is not perfect, focus on transferable skills and how his background mitigates any technical gaps.
      3. **Risks or Red Flags:** Identify missing requirements honestly, but frame them as "areas for rapid growth" or "non-critical technical gaps."
      4. **Mismatch Management:** Clearly state what is missing, but immediately explain why Exequiel might still be a great cultural or strategic fit.
      5. **Final Verdict (Conditional Logic):**
        - **IF SCORE > 85%:** "Strong Match. Exequiel's profile is highly aligned with your needs. His expertise in [mention key skill] makes him an ideal candidate. You should contact him on LinkedIn immediately to move forward."
        - **IF SCORE 50% - 84%:** "High Potential / Strategic Fit. While there is a slight mismatch in [mention specific gap], Exequiel's solid foundation in [mention key strength] ensures a fast learning curve. We recommend an exploratory interview to discuss how his experience can be adapted to this role. Contact Exequiel on LinkedIn."
        - **IF SCORE < 50%:** "Complementary Profile. Although not a direct technical match for this specific vacancy, Exequiel's trajectory in the industry suggests he could provide significant value in related or more senior strategic roles. We suggest connecting on LinkedIn to keep him in mind for future opportunities."
`

    const result = await model.generateContent(systemPrompt)
    const text = result.response.text()

    return NextResponse.json({ text })
  } catch (error: unknown) {
    console.error('Error en Gemini:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'

    return NextResponse.json({ error: message }, { status: 500 })
  }
}
