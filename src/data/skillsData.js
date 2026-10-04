/**
 * Données complètes des compétences avec logos SVG officiels en haute définition.
 * Correspondance exacte avec les 6 catégories et 40 compétences demandées.
 */

export const skillsCategories = [
  {
    id: "ai-llm",
    title: "AI & LLM Systems",
    icon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <circle cx="12" cy="12" r="3" />
      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" />
    </svg>`,
    skills: [
      {
        name: "RAG Systems",
        svg: `<svg viewBox="0 0 24 24" width="18" height="18">
          <defs>
            <linearGradient id="rag-g" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#8B5CF6"/>
              <stop offset="100%" stop-color="#06B6D4"/>
            </linearGradient>
          </defs>
          <rect width="24" height="24" rx="5" fill="url(#rag-g)"/>
          <circle cx="8" cy="8" r="2.2" fill="#FFFFFF"/>
          <circle cx="16" cy="8" r="2.2" fill="#FFFFFF"/>
          <circle cx="12" cy="16" r="2.2" fill="#FFFFFF"/>
          <path d="M8 8h8M8 8l4 8M16 8l-4 8" stroke="#FFFFFF" stroke-width="1.4" stroke-linecap="round"/>
        </svg>`,
      },
      {
        name: "LangChain",
        svg: `<svg viewBox="0 0 24 24" width="18" height="18">
          <rect width="24" height="24" rx="5" fill="#0E2E28"/>
          <path fill="#10B981" d="M12 4.2c-3.1 0-5.6 2.5-5.6 5.6 0 1.7.8 3.2 2 4.2L7.2 18l4.2-1.4c.2 0 .4.1.6.1 3.1 0 5.6-2.5 5.6-5.6s-2.5-6.9-5.6-6.9zm-1.4 4.7a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8zm4.2 4.2c-.9.9-2.3.9-3.2 0-.3-.3-.3-.8 0-1.1.3-.3.8-.3 1.1 0 .3.3.9.3 1.2 0 .3-.3.8-.3 1.1 0 .3.3.3.8-.2 1.1z"/>
        </svg>`,
      },
      {
        name: "LangGraph",
        svg: `<svg viewBox="0 0 24 24" width="18" height="18">
          <rect width="24" height="24" rx="5" fill="#241242"/>
          <circle cx="7" cy="12" r="2.5" fill="#A855F7"/>
          <circle cx="17" cy="7" r="2.5" fill="#C084FC"/>
          <circle cx="17" cy="17" r="2.5" fill="#E879F9"/>
          <path d="M7 12l10-5M7 12l10 5M17 7v10" stroke="#DDD6FE" stroke-width="1.6" stroke-linecap="round"/>
        </svg>`,
      },
      {
        name: "Ollama (Llama 3, Mistral)",
        svg: `<svg viewBox="0 0 24 24" width="18" height="18">
          <rect width="24" height="24" rx="5" fill="#1C1D27"/>
          <path fill="#FFFFFF" d="M7.8 5.2L9.2 8.5h5.6l1.4-3.3 1 3v4.8c0 2.2-1.8 4-4 4h-2.4c-2.2 0-4-1.8-4-4V8.2l1-3zm2.4 5.8a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm4.4 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
        </svg>`,
      },
      {
        name: "Claude API",
        svg: `<svg viewBox="0 0 24 24" width="18" height="18">
          <rect width="24" height="24" rx="5" fill="#D97706"/>
          <path d="M12 4v16M4 12h16M6.3 6.3l11.4 11.4M17.7 6.3L6.3 17.7" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round"/>
        </svg>`,
      },
      {
        name: "LiteLLM Gateway",
        svg: `<svg viewBox="0 0 24 24" width="18" height="18">
          <rect width="24" height="24" rx="5" fill="#312204"/>
          <path fill="#F59E0B" d="M13.2 2.8L5.5 12.2h5.2l-1.6 9 8.4-10.4h-5.2l1.9-8z"/>
        </svg>`,
      },
      {
        name: "n8n AI Automation",
        svg: `<svg viewBox="0 0 24 24" width="18" height="18">
          <rect width="24" height="24" rx="5" fill="#EA4B71"/>
          <circle cx="7.5" cy="12" r="2.8" fill="#FFFFFF"/>
          <circle cx="16.5" cy="7.5" r="2.4" fill="#FFFFFF"/>
          <circle cx="16.5" cy="16.5" r="2.4" fill="#FFFFFF"/>
          <path d="M7.5 12h9M7.5 12l9 4.5M7.5 12l9-4.5" stroke="#FFFFFF" stroke-width="1.6"/>
        </svg>`,
      },
    ],
  },
  {
    id: "programming-languages",
    title: "Programming Languages",
    icon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
      <line x1="14" y1="4" x2="10" y2="20" />
    </svg>`,
    skills: [
      {
        name: "Python",
        svg: `<svg viewBox="0 0 24 24" width="18" height="18">
          <path fill="#3776AB" d="M11.9 2c-3.1 0-5.1 1.4-5.1 3.9v2.9h5.3v.8H4.7c-2.5 0-4.7 1.5-4.7 5.1 0 3.2 1.8 5.1 4.7 5.1h1.7v-2.4c0-2.8 2.4-5.2 5.2-5.2h5.2V9.8c0-2.9-2.5-4.8-5.3-4.8H11.9zm-2.8 1.6c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1z"/>
          <path fill="#FFD438" d="M12.1 22c3.1 0 5.1-1.4 5.1-3.9v-2.9h-5.3v-.8h7.4c2.5 0 4.7-1.5 4.7-5.1 0-3.2-1.8-5.1-4.7-5.1h-1.7v2.4c0 2.8-2.4 5.2-5.2 5.2H7.2v2.4c0 2.9 2.5 4.8 5.3 4.8h-.4zm2.8-1.6c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z"/>
        </svg>`,
      },
      {
        name: "C++",
        svg: `<svg viewBox="0 0 24 24" width="18" height="18">
          <polygon points="12,1.5 21.5,6.8 21.5,17.2 12,22.5 2.5,17.2 2.5,6.8" fill="#00599C"/>
          <text x="12" y="16.2" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="10.5" fill="#FFFFFF" text-anchor="middle">C++</text>
        </svg>`,
      },
      {
        name: "C#",
        svg: `<svg viewBox="0 0 24 24" width="18" height="18">
          <polygon points="12,1.5 21.5,6.8 21.5,17.2 12,22.5 2.5,17.2 2.5,6.8" fill="#68217A"/>
          <text x="12" y="16.2" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="10.5" fill="#FFFFFF" text-anchor="middle">C#</text>
        </svg>`,
      },
      {
        name: "Java",
        svg: `<svg viewBox="0 0 24 24" width="18" height="18">
          <path fill="#5382A1" d="M7.7 17.6s-.9.2-1.8.3c-2.3.2-3.4-.6-3.4-.6s1 .3 2.6.2c2.2-.2 2.6-.8 2.6-.8v.9zm-1-2.4s-1.1.2-2.1.3c-2.7.3-4-.7-4-.7s1.2.4 3.1.2c2.6-.2 3-.8 3-.8v1zm5.2 4.4s-1.8.5-3.8.5c-3.1 0-5.8-.8-5.8-.8s2.3.6 5.3.6c2.7 0 4.3-.3 4.3-.3zm-2.8-4.9c1.6 1.7-1.2 3.2-1.2 3.2s2.5-.9 1.4-2.4c-1-1.3-2.1-1.9-1.2-3.6 1.1-2 2.6-2.5 2.6-2.5s-.8 1-1.6 2.3c-.9 1.4-.4 2.1 0 3zm6.6 2.4s.8.4-1.2.8c-2.4.5-5.3.5-8.2.2-1.5-.2-2-.5-2-.5s.7.2 2.4.3c2.7.2 6.1.1 8-.3 1.8-.3 1-.5 1-.5z"/>
          <path fill="#EA2D2E" d="M12.9 8.6c.9 1.1-.3 2.5-1.5 3.3 1.3-.4 2.4-1.2 2.4-2.1 0-1.7-1.4-2.5-1.4-2.5s.4.7.5 1.3zm3.5 6.6c.5-.9 1.4-1.3 1.4-1.3s-.5.3-1 .8c-.6.6-.9 1.3-.4 1.9 1 1 2.3.5 2.3.5s-.7.3-1.6 0c-.8-.3-1.1-.9-.7-1.9zm-4.7-12c.9 1.4-.4 2.7-1.6 3.6 1.4-.5 2.6-1.4 2.6-2.4 0-1.9-1.5-2.8-1.5-2.8s.4.8.5 1.6z"/>
        </svg>`,
      },
      {
        name: "TypeScript",
        svg: `<svg viewBox="0 0 24 24" width="18" height="18">
          <rect width="24" height="24" rx="4" fill="#3178C6"/>
          <text x="12" y="16.5" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="11" fill="#FFFFFF" text-anchor="middle">TS</text>
        </svg>`,
      },
      {
        name: "JavaScript",
        svg: `<svg viewBox="0 0 24 24" width="18" height="18">
          <rect width="24" height="24" rx="4" fill="#F7DF1E"/>
          <text x="12" y="16.5" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="11" fill="#000000" text-anchor="middle">JS</text>
        </svg>`,
      },
      {
        name: "PHP",
        svg: `<svg viewBox="0 0 24 24" width="18" height="18">
          <ellipse cx="12" cy="12" rx="11" ry="7.5" fill="#777BB4"/>
          <text x="12" y="15" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="9" fill="#FFFFFF" text-anchor="middle">php</text>
        </svg>`,
      },
      {
        name: "SQL",
        svg: `<svg viewBox="0 0 24 24" width="18" height="18">
          <rect width="24" height="24" rx="4" fill="#00758F"/>
          <text x="12" y="16.2" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="10" fill="#FFFFFF" text-anchor="middle">SQL</text>
        </svg>`,
      },
    ],
  },
  {
    id: "backend-apis",
    title: "Backend & APIs",
    icon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="3" width="20" height="7" rx="2" />
      <rect x="2" y="14" width="20" height="7" rx="2" />
      <circle cx="6" cy="6.5" r="1" fill="currentColor" />
      <circle cx="6" cy="17.5" r="1" fill="currentColor" />
      <line x1="10" y1="6.5" x2="16" y2="6.5" />
      <line x1="10" y1="17.5" x2="16" y2="17.5" />
    </svg>`,
    skills: [
      {
        name: "FastAPI",
        svg: `<svg viewBox="0 0 24 24" width="18" height="18">
          <circle cx="12" cy="12" r="11" fill="#05998B"/>
          <path fill="#FFFFFF" d="M13 2.5L5.5 13.5h5l-1.5 8L18.5 10.5h-5.5l1.5-8z"/>
        </svg>`,
      },
      {
        name: "Django",
        svg: `<svg viewBox="0 0 24 24" width="18" height="18">
          <rect width="24" height="24" rx="4" fill="#092E20"/>
          <text x="12" y="16.5" font-family="Georgia, serif" font-weight="900" font-size="11" fill="#44B78B" text-anchor="middle">dj</text>
        </svg>`,
      },
      {
        name: ".NET Core",
        svg: `<svg viewBox="0 0 24 24" width="18" height="18">
          <rect width="24" height="24" rx="5" fill="#512BD4"/>
          <text x="12" y="16" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="7.5" fill="#FFFFFF" text-anchor="middle">.NET</text>
        </svg>`,
      },
      {
        name: "Laravel",
        svg: `<svg viewBox="0 0 24 24" width="18" height="18">
          <path fill="#FF2D20" d="M19.7 5.6L12 1.2 4.3 5.6v12.8l7.7 4.4 7.7-4.4V5.6zm-7.7 2L17.2 10l-2.6 1.5-5.2-3 2.6-1.5zm-5.6 3.2l5 2.9v5.8l-5-2.9v-5.8zm11.3 5.8l-5 2.9v-5.8l5-2.9v5.8z"/>
        </svg>`,
      },
      {
        name: "RESTful APIs",
        svg: `<svg viewBox="0 0 24 24" width="18" height="18">
          <rect width="24" height="24" rx="4" fill="#3B185F"/>
          <text x="12" y="15.8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="8" fill="#C084FC" text-anchor="middle">API</text>
        </svg>`,
      },
      {
        name: "SQLite",
        svg: `<svg viewBox="0 0 24 24" width="18" height="18">
          <rect width="24" height="24" rx="4" fill="#003B57"/>
          <path fill="#00A2ED" d="M5.5 16.5C5.5 14.5 9.5 13 14 13c3 0 4.5 1 4.5 2.5v2c0 1.5-1.5 2.5-4.5 2.5s-8.5-1-8.5-3.5z"/>
          <path fill="#37C3FF" d="M5.5 11.5C5.5 9.5 9.5 8 14 8c3 0 4.5 1 4.5 2.5v2c0 1.5-1.5 2.5-4.5 2.5s-8.5-1-8.5-3.5z"/>
          <ellipse cx="14" cy="7" rx="4.5" ry="2" fill="#8CE1FF"/>
        </svg>`,
      },
    ],
  },
  {
    id: "frontend-engineering",
    title: "Frontend Engineering",
    icon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="21" x2="9" y2="9" />
    </svg>`,
    skills: [
      {
        name: "React",
        svg: `<svg viewBox="0 0 24 24" width="18" height="18">
          <circle cx="12" cy="12" r="2.2" fill="#61DAFB"/>
          <g stroke="#61DAFB" stroke-width="1.3" fill="none">
            <ellipse cx="12" cy="12" rx="10" ry="3.8"/>
            <ellipse cx="12" cy="12" rx="10" ry="3.8" transform="rotate(60 12 12)"/>
            <ellipse cx="12" cy="12" rx="10" ry="3.8" transform="rotate(120 12 12)"/>
          </g>
        </svg>`,
      },
      {
        name: "Tailwind CSS",
        svg: `<svg viewBox="0 0 24 24" width="18" height="18">
          <path fill="#06B6D4" d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.335 6.182 14.974 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.335 13.382 8.974 12 6.001 12z"/>
        </svg>`,
      },
      {
        name: "TypeScript UI",
        svg: `<svg viewBox="0 0 24 24" width="18" height="18">
          <rect width="24" height="24" rx="4" fill="#3178C6"/>
          <rect x="3.5" y="4" width="17" height="4.5" rx="1" fill="#60A5FA"/>
          <text x="12" y="18" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="9" fill="#FFFFFF" text-anchor="middle">TS</text>
        </svg>`,
      },
      {
        name: "HTML5",
        svg: `<svg viewBox="0 0 24 24" width="18" height="18">
          <path fill="#E34F26" d="M3 2l1.6 18.2L12 23l7.4-2.8L21 2H3zm14.8 5.4l-.2 2.3H8.3l.2 2.3h7.6l-.6 6.3-3.5 1-3.5-1-.2-2.7h2.2l.1 1.4 1.4.4 1.4-.4.2-2H6.4l-.6-6.6h12z"/>
        </svg>`,
      },
      {
        name: "CSS3",
        svg: `<svg viewBox="0 0 24 24" width="18" height="18">
          <path fill="#1572B6" d="M3 2l1.6 18.2L12 23l7.4-2.8L21 2H3zm14.8 5.4l-.2 2.3H8.3l.2 2.3h7.6l-.6 6.3-3.5 1-3.5-1-.2-2.7h2.2l.1 1.4 1.4.4 1.4-.4.2-2H6.4l-.6-6.6h12z"/>
        </svg>`,
      },
      {
        name: "Vite",
        svg: `<svg viewBox="0 0 24 24" width="18" height="18">
          <defs>
            <linearGradient id="vite-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#41D1FF"/>
              <stop offset="100%" stop-color="#BD34FE"/>
            </linearGradient>
          </defs>
          <path fill="url(#vite-bg)" d="M20.5 3.5L12.7 18.2c-.4.7-1.3.7-1.7 0L3.5 3.5c-.5-.9.3-2 1.3-1.8l7.2 1.4 7.2-1.4c1-.2 1.8.9 1.3 1.8z"/>
          <path fill="#FFD438" d="M12.9 5.8l-4.5 7.4h3.2l-1.3 5.4 5.3-8.2h-3.4l.7-4.6z"/>
        </svg>`,
      },
      {
        name: "Streamlit",
        svg: `<svg viewBox="0 0 24 24" width="18" height="18">
          <path fill="#FF4B4B" d="M17.5 10.2L12 3 6.5 10.2l-4.5 5.9h20l-4.5-5.9z"/>
          <polygon points="12,6.5 7.5,12.5 16.5,12.5" fill="#FFFFFF" opacity="0.35"/>
        </svg>`,
      },
    ],
  },
  {
    id: "data-devops",
    title: "Data & DevOps Pipelines",
    icon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="18" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 15V9a3 3 0 0 0-3-3H9" />
      <line x1="6" y1="9" x2="6" y2="15" />
    </svg>`,
    skills: [
      {
        name: "Apache Spark",
        svg: `<svg viewBox="0 0 24 24" width="18" height="18">
          <path fill="#E25A1C" d="M12 2l2.4 6.8H21l-5.6 4.3 2.1 6.9-5.5-4.2-5.5 4.2 2.1-6.9L3 8.8h6.6L12 2z"/>
        </svg>`,
      },
      {
        name: "Apache Airflow",
        svg: `<svg viewBox="0 0 24 24" width="18" height="18">
          <circle cx="12" cy="12" r="10.5" fill="#017CEE"/>
          <path fill="#FFFFFF" d="M12 4a8 8 0 0 1 8 8c0 3.3-2 6.1-4.9 7.3l-1.2-3.1A4.5 4.5 0 0 0 16.5 12c0-2.5-2-4.5-4.5-4.5v-3.5z"/>
          <path fill="#53D5FF" d="M4.7 8.7l3.1 1.2A4.5 4.5 0 0 0 7.5 12c0 2.5 2 4.5 4.5 4.5v3.5A8 8 0 0 1 4 12c0-1.2.3-2.4.7-3.3z"/>
        </svg>`,
      },
      {
        name: "Airbyte",
        svg: `<svg viewBox="0 0 24 24" width="18" height="18">
          <rect width="24" height="24" rx="5" fill="#655CFA"/>
          <circle cx="8.5" cy="10" r="1.8" fill="#FFFFFF"/>
          <circle cx="15.5" cy="10" r="1.8" fill="#FFFFFF"/>
          <path fill="#FFFFFF" d="M6.5 15.5c1.5 2.2 3.5 2.8 5.5 1.5 2 1.3 4 .7 5.5-1.5"/>
        </svg>`,
      },
      {
        name: "Docker",
        svg: `<svg viewBox="0 0 24 24" width="18" height="18">
          <path fill="#2496ED" d="M22.5 11.5c-.3-.2-1.3-.4-2-.2-.2-.8-.7-1.5-1.5-2l-.5-.3-.3.5c-.4.7-.5 1.6-.2 2.4-.6.3-1.4.3-1.8.1l-.3-.2-.2.3c-.6 1.1-1.6 1.8-2.8 2H2.2c-.4 1.8.3 3.6 1.6 4.9C5.4 20.6 8.5 21 12 21c7.2 0 11.5-4 11.8-9.2v-.3h-1.3zM4.7 12.3h2.1v2.1H4.7zm2.7 0h2.1v2.1H7.4zm2.7 0h2.1v2.1h-2.1zm2.7 0H15v2.1h-2.2zm-5.4-2.7h2.1v2.1H7.4zm2.7 0h2.1v2.1h-2.1zm2.7 0H15v2.1h-2.2zm0-2.7H15V9h-2.2z"/>
        </svg>`,
      },
      {
        name: "MinIO S3",
        svg: `<svg viewBox="0 0 24 24" width="18" height="18">
          <rect width="24" height="24" rx="4" fill="#C72C48"/>
          <path fill="#FFFFFF" d="M5 8l7 4.5L19 8v8l-7 4.5L5 16V8zm7 2.3L7.4 9v6l4.6 3 4.6-3V9L12 10.3z"/>
        </svg>`,
      },
      {
        name: "Git",
        svg: `<svg viewBox="0 0 24 24" width="18" height="18">
          <path fill="#F05032" d="M22.7 10.8L13.2 1.3c-.6-.6-1.5-.6-2.1 0L9 3.4l2.7 2.7c.6-.2 1.4 0 1.9.5.5.5.7 1.3.5 1.9l2.6 2.6c.6-.2 1.4 0 1.9.5.8.8.8 2.1 0 2.9-.8.8-2.1.8-2.9 0-.6-.6-.7-1.4-.4-2.1L12.8 9v6.5c.2.2.4.4.5.7.8.8.8 2.1 0 2.9-.8.8-2.1.8-2.9 0-.8-.8-.8-2.1 0-2.9.3-.3.7-.5 1.1-.6V9c.4-.1.8-.3 1.1-.6L9.8 4.7 1.3 13.2c-.6.6-.6 1.5 0 2.1l9.5 9.5c.6.6 1.5.6 2.1 0l9.8-9.8c.6-.7.6-1.6 0-2.2z"/>
        </svg>`,
      },
      {
        name: "GitHub",
        svg: `<svg viewBox="0 0 24 24" width="18" height="18">
          <rect width="24" height="24" rx="5" fill="#24292E"/>
          <path fill="#FFFFFF" d="M12 3C7.03 3 3 7.03 3 12c0 3.98 2.58 7.35 6.16 8.54.45.08.62-.2.62-.43v-1.52c-2.5.54-3.03-1.2-3.03-1.2-.41-1.04-1-1.32-1-1.32-.82-.56.06-.55.06-.55.9.06 1.38.93 1.38.93.8 1.37 2.1 0.98 2.62.75.08-.58.31-.98.57-1.2-2-.23-4.1-1-4.1-4.44 0-.98.35-1.78.92-2.4-.09-.23-.4-1.14.09-2.38 0 0 .75-.24 2.47.92.71-.2 1.48-.3 2.24-.3.76 0 1.53.1 2.25.3 1.71-1.16 2.46-.92 2.46-.92.5 1.24.19 2.15.09 2.38.58.62.92 1.42.92 2.4 0 3.46-2.1 4.2-4.11 4.43.32.28.61.83.61 1.67V20.1c0 .24.16.52.62.43C18.42 19.35 21 15.98 21 12c0-4.97-4.03-9-9-9z"/>
        </svg>`,
      },
    ],
  },
  {
    id: "databases-analytics",
    title: "Databases & Analytics",
    icon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>`,
    skills: [
      {
        name: "PostgreSQL",
        svg: `<svg viewBox="0 0 24 24" width="18" height="18">
          <path fill="#336791" d="M12 2C6.5 2 2 6.5 2 12c0 4.2 2.6 7.8 6.4 9.2.4.1.8-.1.9-.5l.8-3.2c.2-.8.8-1.5 1.6-1.7 1.4-.4 2.8-.4 4.2 0 .8.2 1.4.9 1.6 1.7l.8 3.2c.1.4.5.6.9.5C19.4 19.8 22 16.2 22 12c0-5.5-4.5-10-10-10zm-1.8 7.3c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5zm3.6 0c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5z"/>
        </svg>`,
      },
      {
        name: "MSSQL",
        svg: `<svg viewBox="0 0 24 24" width="18" height="18">
          <rect width="24" height="24" rx="4" fill="#CC292B"/>
          <ellipse cx="12" cy="7" rx="6.5" ry="2.2" fill="#FFFFFF"/>
          <path fill="none" stroke="#FFFFFF" stroke-width="1.6" d="M5.5 7v10c0 1.2 2.9 2.2 6.5 2.2s6.5-1 6.5-2.2V7M5.5 12c0 1.2 2.9 2.2 6.5 2.2s6.5-1 6.5-2.2"/>
        </svg>`,
      },
      {
        name: "MySQL",
        svg: `<svg viewBox="0 0 24 24" width="18" height="18">
          <rect width="24" height="24" rx="4" fill="#00758F"/>
          <path fill="#F29111" d="M18.8 8.6c-1.3-1.8-3.5-2.8-6.1-2.6-4.2.4-7.5 4.3-7.5 8.7 0 .5.1 1 .2 1.4 1.1-2.2 3.1-3.9 5.6-4.5 2.1-.5 4.3-.2 6.1.9 1.1.7 1.8 1.7 2.2 2.8.2-.6.3-1.3.3-2 0-1.8-.7-3.4-1.8-4.7z"/>
          <circle cx="15.5" cy="9.5" r="1" fill="#FFFFFF"/>
        </svg>`,
      },
      {
        name: "MongoDB",
        svg: `<svg viewBox="0 0 24 24" width="18" height="18">
          <path fill="#13AA52" d="M12.1 2c-.3 0-.6.3-.7.6C10.1 5.3 7 9.8 7 14.1c0 3.8 2.6 7.4 5.1 7.9.3 0 .7 0 .9-.2 2.6-.7 5.1-4.2 5.1-8 0-4.3-3.1-8.7-4.4-11.4-.2-.2-.4-.4-.6-.4zm-.1 3.2c1.7 2.7 3.8 6.3 3.8 8.9 0 2.2-1.3 4.8-3.8 5.7V5.2z"/>
        </svg>`,
      },
      {
        name: "Power BI",
        svg: `<svg viewBox="0 0 24 24" width="18" height="18">
          <rect width="24" height="24" rx="4" fill="#F2C811"/>
          <rect x="5.5" y="13.5" width="2.8" height="6.5" rx="0.8" fill="#212121"/>
          <rect x="10.6" y="9.5" width="2.8" height="10.5" rx="0.8" fill="#212121"/>
          <rect x="15.7" y="5.5" width="2.8" height="14.5" rx="0.8" fill="#212121"/>
        </svg>`,
      },
    ],
  },
];
