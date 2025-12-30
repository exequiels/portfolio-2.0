interface GithubRepo {
  name: string
  description: string | null
  html_url: string
}

export const githubService = {
  async getPortfolioProjects(
    username: string,
    token?: string
  ): Promise<string> {
    try {
      const reposRes = await fetch(
        `https://api.github.com/users/${username}/repos`,
        {
          headers: token ? { Authorization: `token ${token}` } : {},
        }
      )
      const repos: GithubRepo[] = await reposRes.json()

      const markedProjects = await Promise.all(
        repos.map(async (repo) => {
          const readmeRes = await fetch(
            `https://api.github.com/repos/${username}/${repo.name}/readme`,
            {
              headers: { Accept: 'application/vnd.github.v3.raw' },
            }
          )

          if (readmeRes.ok) {
            const content = await readmeRes.text()
            if (content.includes('PORTFOLIO_DATA_START')) {
              const match = content.match(
                /PORTFOLIO_DATA_START([\s\S]*?)PORTFOLIO_DATA_END/
              )
              if (match) {
                const portfolioData = match[1].trim()
                return `## ${repo.name}\n${portfolioData}\n---`
              }
            }
          }
          return null
        })
      )

      return markedProjects.filter(Boolean).join('\n\n')
    } catch (e) {
      console.error('Error loading GitHub projects:', e)
      return 'Could not load projects from GitHub.'
    }
  },
}
