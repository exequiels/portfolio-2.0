import fs from 'fs'
import path from 'path'
import { githubService } from '@/services/github.service'

export async function getLocalProfile() {
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

export async function getGithubProjects() {
  const token = process.env.GITHUB_TOKEN
  const username = 'exequiels'
  return await githubService.getPortfolioProjects(username, token)
}
