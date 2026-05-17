<div align="center">

# AI Multi-Agent Token Triage System

### Intelligent Support Ticket Management with Autonomous AI Agents

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-5.2-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-AI-886FBF?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev)
[![Inngest](https://img.shields.io/badge/Inngest-Workflows-0B14FB?style=for-the-badge)](https://inngest.com)

An AI-powered support ticket system where autonomous agents handle the entire triage workflow — from analyzing issues and extracting priorities to matching tickets with the right moderators and sending notifications. No manual routing needed.

</div>

---

## Demo

<!-- Add your screenshots and video demos here -->

<!-- ### Screenshots

| Dashboard | Token Details | Admin Panel |
|-----------|--------------|-------------|
| ![Dashboard](./screenshots/dashboard.png) | ![Token Details](./screenshots/token-details.png) | ![Admin Panel](./screenshots/admin-panel.png) |

### Video Demo

[![Watch the demo](./screenshots/video-thumbnail.png)](https://your-video-link.com)
-->

> **TODO:** Add screenshots and demo video. See the [Media](#media) section for recommended assets.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                          FRONTEND (React + Vite)                    │
│                                                                     │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐  │
│   │  Signup   │  │  Login   │  │  Tokens  │  │   Admin Panel    │  │
│   │  Page     │  │  Page    │  │  Dashboard│  │   (User Mgmt)    │  │
│   └──────────┘  └──────────┘  └──────────┘  └──────────────────┘  │
│          │             │             │               │              │
│          └─────────────┴─────────────┴───────────────┘              │
│                              │ REST API                             │
└──────────────────────────────┼──────────────────────────────────────┘
                               │
┌──────────────────────────────┼──────────────────────────────────────┐
│                    BACKEND (Express + MongoDB)                      │
│                              │                                      │
│   ┌──────────────────────────▼───────────────────────────────┐     │
│   │                    Express API Server                      │     │
│   │  /api/auth/*          /api/tokens/*        /api/inngest   │     │
│   └──────────────────────────┬───────────────────────────────┘     │
│                              │                                      │
│          ┌───────────────────┼───────────────────┐                  │
│          │                   │                   │                  │
│          ▼                   ▼                   ▼                  │
│   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐            │
│   │   MongoDB   │    │   Inngest   │    │  Mailtrap   │            │
│   │  Database   │    │  Workflows  │    │    SMTP     │            │
│   └─────────────┘    └──────┬──────┘    └─────────────┘            │
│                              │                                      │
│         ┌────────────────────┼────────────────────┐                 │
│         │                    │                    │                 │
│         ▼                    ▼                    ▼                 │
│   ┌───────────┐     ┌───────────────┐     ┌──────────────┐         │
│   │  Agent 1  │     │    Agent 2    │     │   Google     │         │
│   │  Welcome  │     │  AI Triage    │     │   Gemini     │         │
│   │  Email    │     │  Pipeline     │     │   2.5 Flash  │         │
│   └───────────┘     └───────────────┘     └──────────────┘         │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## How It Works

This system uses **two autonomous AI agents** built on Inngest's durable workflow engine:

### Agent 1: Welcome Email Agent
Triggered when a new user signs up. Looks up the user in the database and sends a welcome email via Mailtrap SMTP.

### Agent 2: AI Triage Agent (Core)
Triggered when a support token is created. Runs a 6-step pipeline:

```
Token Created
     │
     ▼
┌─────────────────┐
│ 1. Fetch Token  │  Retrieve from MongoDB
└────────┬────────┘
         ▼
┌─────────────────┐
│ 2. Set Status   │  Mark as "TODO"
└────────┬────────┘
         ▼
┌─────────────────────────────────────────┐
│ 3. AI Analysis (Google Gemini 2.5 Flash) │
│    • Summary extraction                  │
│    • Priority classification             │
│    • Helpful notes generation            │
│    • Related skills extraction           │
└────────┬────────────────────────────────┘
         ▼
┌─────────────────┐
│ 4. Update Token │  Save AI results to DB
└────────┬────────┘
         ▼
┌─────────────────────────────────────────┐
│ 5. Auto-Assignment                       │
│    • Match skills → moderator            │
│    • Fallback → admin                    │
└────────┬────────────────────────────────┘
         ▼
┌─────────────────┐
│ 6. Notify       │  Email assigned moderator
└─────────────────┘
```

<!-- Add workflow screenshots here -->
<!-- ![Triage Workflow](./screenshots/triage-workflow.png) -->

## Key Features

- **Autonomous AI Triage** — Google Gemini analyzes each ticket, extracts priority, summary, and required skills automatically
- **Smart Assignment** — Tickets are routed to moderators based on skill matching, with admin fallback
- **Durable Workflows** — Inngest ensures each pipeline step is retriable and fault-tolerant
- **Role-Based Access** — Three roles (user, moderator, admin) with distinct permissions
- **Skill-Based Routing** — Moderators have skill tags; AI matches ticket requirements to the right person
- **Email Notifications** — Assigned moderators receive automatic email alerts
- **Admin Panel** — Full user management: roles, skills, and search

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **AI Engine** | Google Gemini 2.5 Flash | Ticket analysis, priority extraction, skill matching |
| **Agent Framework** | Inngest + @inngest/agent-kit | Durable multi-step workflows with retries |
| **Backend** | Express v5 + Node.js | REST API server |
| **Database** | MongoDB + Mongoose | User and token persistence |
| **Auth** | JWT + bcrypt | Token-based authentication with password hashing |
| **Frontend** | React 19 + Vite | Single-page application |
| **Styling** | Tailwind CSS v4 + DaisyUI v5 | UI components and responsive design |
| **Email** | Nodemailer + Mailtrap | SMTP email delivery (dev sandbox) |

## Project Structure

```
AI-Multi-Agents-v1/
├── ai-token-assistant/              # Backend API
│   ├── index.js                     # Express server entry point
│   ├── env.js                       # Environment config loader
│   ├── makeAdmin.js                 # CLI: promote user to admin
│   ├── controllers/
│   │   ├── token.js                 # Token CRUD + creation event
│   │   └── user.js                  # Auth + user management
│   ├── inngest/
│   │   ├── client.js                # Inngest client setup
│   │   └── functions/
│   │       ├── onsignup.js          # Agent 1: welcome email
│   │       └── ont-token-create.js  # Agent 2: AI triage pipeline
│   ├── middlewares/
│   │   └── auth.js                  # JWT verification + role guards
│   ├── models/
│   │   ├── token.js                 # Token schema (title, priority, skills...)
│   │   └── user.js                  # User schema (email, role, skills)
│   ├── routes/
│   │   ├── token.js                 # /api/tokens/*
│   │   └── user.js                  # /api/auth/*
│   ├── scripts/
│   │   └── cleanDb.js               # Database cleanup utility
│   └── utils/
│       ├── Ai.js                    # Gemini AI agent wrapper
│       └── mailer.js                # Nodemailer SMTP config
│
├── ai-token-frontend/               # React SPA
│   ├── src/
│   │   ├── main.jsx                 # App entry point
│   │   ├── components/
│   │   │   ├── checkauth.jsx        # Route guard (auth protection)
│   │   │   └── navbar.jsx           # Dynamic navigation bar
│   │   ├── lib/
│   │   │   └── api.js               # API client (axios)
│   │   └── pages/
│   │       ├── login.jsx            # Login page
│   │       ├── Signup.jsx           # Registration page
│   │       ├── tokens.jsx           # Token list + creation
│   │       ├── token.jsx            # Token detail view
│   │       └── admin.jsx            # Admin user management
│   └── vite.config.js
│
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB instance (local or Atlas)
- Google Gemini API key
- Mailtrap account (for email testing)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/AI-Multi-Agents-v1.git
cd AI-Multi-Agents-v1
```

**Backend setup:**

```bash
cd ai-token-assistant
npm install

# Create environment file
cp .env.sample .env
# Edit .env with your credentials
```

**Frontend setup:**

```bash
cd ../ai-token-frontend
npm install

# Create environment file
cp .env.example .env
# Set VITE_SERVER_URL=http://localhost:3000/api
```

### Environment Variables

**Backend** (`ai-token-assistant/.env`):

| Variable | Description |
|----------|-------------|
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT signing |
| `GEMINI_API_KEY` | Google Gemini API key |
| `MAILTRAP_SMTP_HOST` | Mailtrap SMTP host |
| `MAILTRAP_SMTP_PORT` | Mailtrap SMTP port |
| `MAILTRAP_SMTP_USER` | Mailtrap SMTP username |
| `MAILTRAP_SMTP_PASS` | Mailtrap SMTP password |
| `APP_URL` | Frontend URL (`http://localhost:5173`) |

**Frontend** (`ai-token-frontend/.env`):

| Variable | Description |
|----------|-------------|
| `VITE_SERVER_URL` | Backend API URL (`http://localhost:3000/api`) |

### Run the Application

You need **three terminals** running simultaneously:

```bash
# Terminal 1 — Backend API
cd ai-token-assistant
npm run dev

# Terminal 2 — Inngest Dev Server
cd ai-token-assistant
npm run inngest-dev

# Terminal 3 — Frontend
cd ai-token-frontend
npm run dev
```

### First-Time Setup

1. Open `http://localhost:5173` and create an account
2. Promote your user to admin:
   ```bash
   cd ai-token-assistant
   node makeAdmin.js your-email@example.com
   ```
3. Log in again — you now have access to the Admin panel

## API Reference

### Auth Routes

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/auth/signup` | — | Register a new user |
| `POST` | `/api/auth/login` | — | Login, returns JWT |
| `POST` | `/api/auth/logout` | User | Verify token (stateless) |
| `GET` | `/api/auth/users` | Admin | List all users |
| `POST` | `/api/auth/update-user` | Admin | Update user role & skills |

### Token Routes

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/tokens` | User | List tokens (own for users, all for mods/admins) |
| `GET` | `/api/tokens/:id` | User | Get token details |
| `POST` | `/api/tokens` | User | Create token (triggers AI triage) |

## Data Models

**User:**
- `email` — Unique email address
- `password` — Bcrypt-hashed password
- `role` — `user` | `moderator` | `admin`
- `skills` — Array of skill tags (e.g., `["React", "MongoDB"]`)

**Token:**
- `title` — Issue title
- `description` — Full issue description
- `status` — `TODO` | `IN_PROGRESS`
- `priority` — `low` | `medium` | `high` (AI-generated)
- `helpfulNotes` — AI-generated technical notes
- `relatedSkills` — AI-extracted skill tags
- `assignedTo` — Assigned moderator/admin reference
- `createdBy` — Token creator reference

## Customization

| Component | What to Change |
|-----------|---------------|
| **AI Model** | Swap Gemini for any LLM in `utils/Ai.js` |
| **Email Provider** | Replace Mailtrap with any SMTP provider in `utils/mailer.js` |
| **Skills Taxonomy** | Update the AI prompt in `utils/Ai.js` to extract domain-specific skills |
| **Assignment Logic** | Modify the matching algorithm in `ont-token-create.js` |
| **UI Theme** | Change DaisyUI theme in Tailwind config |

## Acknowledgments

- [Inngest](https://inngest.com) for the durable workflow engine and agent framework
- [Google Gemini](https://ai.google.dev) for the AI analysis capabilities
- [DaisyUI](https://daisyui.com) for the UI component library
- [Mailtrap](https://mailtrap.io) for email testing infrastructure

---

<div align="center">

**Built with autonomous agents. Powered by intelligent automation.**

</div>
