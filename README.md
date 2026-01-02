Visit my portfolio-2.0 at https://www.sabatie.com.ar/

## Overview

This repository contains my personal portfolio-2.0, built as a modern web application and enhanced with an **AI mediator agent** that explains my experience, projects, and technical decisions in natural language.

The goal is to reduce friction between my actual work and how it is presented.

---

## AI Mediator Agent – Role Fit Evaluation

The AI mediator agent is designed to simulate an initial screening step between a recruiter and my profile.

Instead of free-form Q&A, the interaction is structured through:

- Work mode selection: **Remote / Hybrid / On-site**
- Technology stack selection via dropdown
- A job description input where the recruiter is asked to provide:
  > A short description of the project, work environment, team setup, working hours, salary range, and any other relevant details.

Based on this input, the mediator performs an objective compatibility analysis against my technical background, experience, certifications, and documented projects.

### Mediator Response Structure

When the provided job description is valid and sufficiently detailed, the mediator returns a structured evaluation consisting of:

1. **Compatibility Score**  
   A percentage (0–100%) representing how well the role requirements align with my profile.

2. **Justification (4–6 lines)**  
   A concise explanation of the score, highlighting:

   - Direct matches
   - Transferable skills
   - How my background mitigates any partial gaps

3. **Risks or Red Flags**  
   Missing or weaker requirements are identified transparently, framed as:

   - Areas for rapid growth
   - Non-critical technical gaps

4. **Mismatch Management**  
   Clear acknowledgment of mismatches, followed immediately by:

   - Cultural fit considerations
   - Strategic or long-term value

5. **Final Verdict (Conditional Logic)**  
   The conclusion is generated dynamically based on the score:

---

## Deployment Challenge & Technical Decision

During deployment, I initially evaluated **AWS Amplify**, since I work with AWS and cloud infrastructure on a daily basis.

However, for this specific project I encountered limitations related to:

- Free tier DNS restrictions when pointing to a custom domain (Hostinger)

Since this is a personal profile and not a production-scale system, I decided to avoid unnecessary infrastructure complexity.

### Solution

I migrated the project to **Vercel**, which provided:

- Native Next.js support (builds, routing, SSR)
- Preview environments
- DNS configuration fully supported in the free tier

This decision allowed me to focus on product quality instead of infrastructure friction.

---

<!-- PORTFOLIO_DATA_START
**Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS, PrimeReact, Google Gemini API
**Description:** Personal portfolio with an AI mediator agent that explains my experience, projects and certifications in natural language.
**Highlights:**
- AI mediator agent powered by Gemini API
- Type-safe AI responses using TypeScript interfaces
- Markdown rendering with react-markdown (GFM + sanitization)
- Component-based architecture with Next.js App Router
- UI built with Tailwind CSS + PrimeReact
- README-driven knowledge extraction for AI context
PORTFOLIO_DATA_END -->
