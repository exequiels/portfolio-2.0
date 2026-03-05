export const miData = {
  name: 'Exequiel Sabatié',
  role: 'Full Stack Developer | AWS & React | 4+ years experience',
  picture: '/images/exequiel.jpg',
  contact: {
    location: 'San Juan, Argentina',
    email: 'exequiel@sabatie.com.ar',
    linkedin: 'linkedin.com/in/exequiel-sabatie',
    github: 'github.com/exequiels',
  },
  skills: [
    'HTML',
    'CSS',
    'PHP',
    'React',
    'Next.js',
    'Node.js',
    'Laravel',
    'TypeScript',
    'AWS (EC2, S3, RDS)',
    'MySQL',
    'CI/CD',
    'English C3',
  ],
  projects: [
    {
      name: 'BIM & ACC Project Management',
      summary:
        'Developed a pure PHP web system (no frameworks) to optimize workflows in Autodesk BIM 360/ACC. The platform included session-based authentication, project data visualization, issue/permission management, trouble ticket tracking, and user activity monitoring for operational efficiency.',
      stack:
        'Started in PHP on Lightsail → migrated to a modern stack: AWS ECR, EC2, RDS, S3, React, TypeScript, Strapi.',
      impact: '+3k users',
    },
    {
      name: 'Used Video Game Marketplace',
      summary:
        'Online marketplace for used video games integrating MercadoLibre API. Built with PHP, HTML, Bootstrap, JavaScript, and MySQL. Included automated listings, token refresh via cron, role-based admin panel, dynamic pagination, responsive UI, and centralized error logging. Generated consistent revenue until API restrictions paused operations.',
      stack:
        'PHP, HTML, Bootstrap, JS, MySQL, MercadoLibre API (search, tokens, automation), Cron Jobs',
      impact: 'Independent income stream for 2+ years',
    },
    {
      name: 'AI-Powered Portfolio & Mediator Agent',
      summary:
        'Personal portfolio enhanced with an AI mediator that evaluates role compatibility based on job descriptions, work mode, and technology stack. Designed to simulate an initial technical screening between recruiters and my profile.',
      stack:
        'Next.js 16, React 19, TypeScript, Tailwind CSS, PrimeReact, Google Gemini API',
      impact:
        'Live product | AI-assisted role fit evaluation | https://portfolio.sabatie.com.ar/',
      tags: ['AI', 'Screening', 'LLM', 'Product Thinking', 'Frontend', 'Cloud'],
    },
    {
      name: 'Collaborative Task Lists',
      summary:
        'A list generator that lets users create, share, and complete tasks collaboratively. Lists are created in seconds and auto-expire after 24 hours to keep workflows lightweight and focused.',
      stack:
        'React + Vite, PrimeReact/PrimeCSS, Laravel (PHP) backend, link generation API',
      impact: 'MVP live | https://flashlist.com.ar/',
    },
    {
      name: 'Virtual Cards without Registration',
      summary:
        'A card creator where users can edit templates or design from scratch, generate a link, and share it without signing up. Fast creation, real-time edits, and shareable links with no account required.',
      stack:
        'React + Vite, PrimeReact/PrimeCSS, Laravel (PHP) backend, Context API, react-i18next (i18n), Animate.css',
      impact:
        'MVP live | https://tarjetagratis.com/ link-based sharing, no onboarding friction',
    },
  ],
  experience: [
    {
      role: 'Full Stack Developer – BIM & ACC Project Management',
      company: 'Enarvi · External Contractor for Amazon Enterprise',
      period: '2021 - Present',
      impact: [
        'Assigned full-time as external contractor to Amazon enterprise initiatives, working on production-grade systems at scale.',
        'Built platform from scratch using PHP, HTML, CSS, MySQL, and Bootstrap; integrated Autodesk APIs for BIM 360 and ACC to manage projects, tickets, permissions, and user activity.',
        'Platform acquired by an internal Amazon group; onboarded as external developer and continued as part of the core team.',
        'Collaborated on full architecture rewrite to React + AWS (ECR, EC2, RDS, S3).',
        'Work within trunk-based development workflows with mandatory peer reviews and automated CI/CD pipelines.',
        'Currently responsible for feature development, system expansion, maintenance, and operational reliability.',
        'Contact references available upon request.',
      ],
    },
  ],
}
