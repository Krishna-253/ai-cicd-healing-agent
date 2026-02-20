# 🚀 Autonomous CI/CD Healing Agent  
### 🏆 RIFT 2026 Hackathon Submission

---

## 📌 Project Title

**Autonomous CI/CD Healing Agent – AI-Powered DevOps Autopilot**

An intelligent multi-agent system that automatically detects failing tests in a GitHub repository, generates fixes, commits them to a properly formatted branch, and streams real-time execution logs to a live dashboard.

---

## 🌍 Live Deployment

🔹 **Frontend (Dashboard):**  
👉 https://vercel.com/krishnas-projects-2824a41c/ai-cicd-healing-agent-j19r  

🔹 **Backend API:**  
👉 https://ai-cicd-healing-agent.onrender.com

🔹 **GitHub Repository:**  
👉 https://github.com/Krishna-253/ai-cicd-healing-agent

🔹 **LinkedIn Demo Video (Tagged @RIFT2026):**  
👉 https://www.linkedin.com/posts/krishna-rai-149b93376_rift2026-ai-devops-ugcPost-7430418947339894784-WF74?utm_source=share&utm_medium=member_desktop&rcm=ACoAAF0UUgkB1xj9yVwhyu-GbBbIGOq_X-BQmWA 

---

# 🧠 Problem Statement

Modern CI/CD pipelines frequently fail due to minor test issues, misconfigurations, or linting errors.  
Manual debugging slows down development cycles and reduces deployment reliability.

This project builds an **Autonomous AI DevOps Agent** that:

- Clones a GitHub repository
- Detects failing tests
- Generates AI-driven fixes
- Creates a properly formatted branch
- Commits with "AI-AGENT:" prefix
- Pushes changes automatically
- Retries intelligently (max 5 iterations)
- Streams real-time execution to a dashboard

---

# 🏗 System Architecture

## 🔷 High-Level Architecture Diagram

''
User Input (Repo URL + Token)
            │
            ▼
┌───────────────────────────┐
│      React Dashboard      │
│ (Next.js + SSE Streaming) │
└──────────────▲────────────┘
               │
               │  Real-Time Events (SSE)
               ▼
┌───────────────────────────┐
│       FastAPI Backend     │
│   Multi-Agent Orchestrator│
├───────────────────────────┤
│ 1. Clone Agent            │
│ 2. Analysis Agent         │
│ 3. Test Detection Agent   │
│ 4. Fix Generator Agent    │
│ 5. Branch Creator Agent   │
│ 6. Commit & Push Agent    │
│ 7. Retry & Score Engine   │
└──────────────▲────────────┘
               │
               ▼
      GitHub Repository
``

---

# 🔄 Multi-Agent Workflow

1. 🔄 **Cloning Agent** – Clones repository into isolated temp directory  
2. 🔍 **Analysis Agent** – Scans project structure  
3. 🧪 **Test Detection Agent** – Identifies failing tests  
4. 🛠 **Fix Generation Agent** – Generates patch  
5. 🌿 **Branch Creation Agent** – Creates formatted branch  
6. 📦 **Commit & Push Agent** – Pushes changes with prefix  
7. 🔁 **Retry Engine** – Retries up to 5 times  
8. 📊 **Monitoring Agent** – Streams progress & scoring  

Each stage emits structured events streamed live to the frontend dashboard.

---

# 🌿 Branch Naming Compliance

Format (as required):

```
TEAM_NAME_LEADER_NAME_AI_Fix
```

### Rules:
- Uppercase only
- Replace spaces with `_`
- No special characters
- Must end with `_AI_Fix`
- Never push directly to main branch

Example:

```
SCAREROWSS_KRISHNA_AI_Fix
```

---

# 🧪 Retry & Scoring Logic

- Maximum retries: 5
- Stops early if tests pass
- Efficiency penalty after 3 retries
- Final score calculated dynamically

### 📊 Scoring Model

| Metric | Value |
|--------|--------|
| Base Score | 100 |
| Speed Bonus | +2 per unused retry |
| Efficiency Penalty | -2 after 3 retries |
| Final Score | Displayed on dashboard |

---

# 🛠 Supported Bug Types

✔ Linting errors  
✔ Minor syntax errors  
✔ Simple failing unit tests  
✔ Missing imports  
✔ Formatting inconsistencies  
✔ Basic logic corrections  

---

# 💻 Tech Stack

## 🔹 Frontend
- Next.js
- React
- TypeScript
- TailwindCSS
- ShadCN UI
- Server-Sent Events (SSE)

## 🔹 Backend
- FastAPI
- Python
- GitPython
- AsyncIO
- Uvicorn

## 🔹 Deployment
- Vercel (Frontend)
- Render (Backend)

---

# ⚙ Installation Instructions

## 🔹 Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
uvicorn app.main:app --port 8001
```

Backend runs at:
```
http://127.0.0.1:8001
```

---

## 🔹 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:
```
http://localhost:3000
```

---

# 🌍 Environment Setup

Inside `frontend/.env.local`:

```
NEXT_PUBLIC_API_URL=http://127.0.0.1:8001
```

For production (Vercel):

```
NEXT_PUBLIC_API_URL=https://YOUR-BACKEND.onrender.com
```

---

# ▶ Usage Example

1. Open dashboard  
2. Enter GitHub repository URL  
3. Enter GitHub personal access token  
4. Click **Start Analysis**

The system will:

- Clone repository
- Analyze failing tests
- Generate fix
- Create new branch
- Push commit
- Display live logs
- Show retry history
- Display scoring results

---

# 🛡 Safety & Isolation

- Repository cloned in isolated temporary directory
- Auto-cleanup after execution
- No direct modification of main branch
- Controlled retry loop (max 5)
- Explicit AI-AGENT commit prefix enforcement

---

# ⚠ Known Limitations

- Does not yet support very large monorepos
- Advanced architectural bugs not fully automated
- AI patch generation currently simulated (extendable with LLM)
- No containerized execution environment (future improvement)

---

# 👨‍💻 Team

**Team Name:** ____________________  

| Name | Role |
|------|------|
| Krishna Rai | Backend & AI Agent |
| Member 2 | Frontend |
| Member 3 | DevOps |
| Member 4 | Architecture |

---

# 🏁 Hackathon Compliance Checklist

✔ Public GitHub Repository  
✔ Live Deployment URL  
✔ LinkedIn Demo Video (Tagged @RIFT2026)  
✔ Multi-Agent Architecture  
✔ Retry Mechanism Implemented  
✔ Proper Branch Naming Format  
✔ AI-AGENT Commit Prefix  
✔ No Direct Push to Main  
✔ Real-Time Streaming Dashboard  

---

# 🎯 Future Improvements

- LLM-powered patch generation
- Docker sandbox execution
- GitHub PR auto-creation
- CI/CD integration with GitHub Actions
- Multi-language repository support

---

# ⭐ Final Note

This project demonstrates how AI-driven automation can significantly reduce CI/CD downtime and developer debugging effort by introducing autonomous healing workflows into DevOps pipelines.
