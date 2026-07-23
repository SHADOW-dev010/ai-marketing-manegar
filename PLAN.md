# AI Marketing Manager — Build Plan

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Desktop Shell | Electron |
| Frontend | React + Vite + TypeScript |
| Backend | Python FastAPI |
| AI / LLM | OpenAPI / Anthropic API (via LangChain) |
| Image Gen | DALL-E API |
| Sentiment / NLP | HuggingFace Transformers |
| Predictive Analytics | scikit-learn / Prophet |
| Database | SQLite |
| State Management | Zustand |

## Architecture

```
┌─────────────────────────────────────┐
│           Electron App              │
│  ┌───────────────────────────────┐  │
│  │     React Frontend (UI)       │  │
│  └───────────┬───────────────────┘  │
│              │ HTTP (localhost)      │
│  ┌───────────▼───────────────────┐  │
│  │   Python FastAPI Backend      │  │
│  │  ┌───────┬──────┬──────────┐  │  │
│  │  │ LLM   │ Image│ Analytics│  │  │
│  │  │ Chain │ Gen  │ Pipeline │  │  │
│  │  └───────┴──────┴──────────┘  │  │
│  └───────────┬───────────────────┘  │
│  ┌───────────▼───────────────────┐  │
│  │         SQLite DB             │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

## Project Structure

```
ai-marketing-manager/
├── frontend/                  # Electron + React + Vite
│   ├── electron/              # Electron main process
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Dashboard, Content, Campaigns, etc.
│   │   ├── store/             # Zustand state management
│   │   └── services/          # API client calls
│   └── package.json
├── backend/                   # Python FastAPI
│   ├── api/                   # Route handlers
│   ├── services/
│   │   ├── llm.py             # Content generation (OpenAI/Anthropic)
│   │   ├── image_gen.py       # Image generation (DALL-E)
│   │   ├── sentiment.py       # Sentiment analysis
│   │   └── analytics.py       # Predictive analytics
│   ├── models/                # Database models
│   ├── main.py                # FastAPI entry point
│   └── requirements.txt
└── README.md
```

## Feature Modules

1. **Dashboard** — KPIs, campaign overview, quick actions
2. **AI Content Studio** — Generate ad copy, emails, blog posts, landing pages via LLM
3. **Image Studio** — Generate/edit marketing visuals via DALL-E
4. **Campaign Manager** — Multi-channel campaigns (email, social, ads)
5. **Analytics & Insights** — Charts, sentiment trends, predictive forecasts
6. **Social Scheduler** — Content calendar & auto-posting
7. **AI Marketing Assistant** — Chatbot for strategy questions
8. **Settings & Integrations** — API keys, brand voice config, channel connections
