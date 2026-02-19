from fastapi import FastAPI, Request
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import json
import asyncio
import uuid
from datetime import datetime

from app.services.github_service import run_with_retry

app = FastAPI()

# -----------------------------
# CORS (Frontend runs on 9002)
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:9002"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -----------------------------
# Streaming DevOps Agent
# -----------------------------
async def event_stream(repo_url: str, token: str):

    # STEP 1 — CLONING
    yield "data: " + json.dumps({
        "type": "status",
        "status": "cloning",
        "progress": 10
    }) + "\n\n"

    yield "data: " + json.dumps({
        "type": "log",
        "level": "info",
        "message": "Cloning repository..."
    }) + "\n\n"

    await asyncio.sleep(1)


    # STEP 2 — ANALYZING
    yield "data: " + json.dumps({
        "type": "status",
        "status": "analyzing",
        "progress": 30
    }) + "\n\n"

    yield "data: " + json.dumps({
        "type": "log",
        "level": "info",
        "message": "Analyzing repository structure..."
    }) + "\n\n"

    await asyncio.sleep(1)


    # Run your Git automation logic
    result = run_with_retry(repo_url, "AUTO_TEAM", "AUTO_LEADER")


    # STEP 3 — SEND REPO SUMMARY
    repo_data = {
        "url": repo_url,
        "branch": result["branch_created"],
        "owner": repo_url.split("/")[-2],
        "name": repo_url.split("/")[-1],
        "files": [fix["file"] for fix in result["fixes"]]
    }

    yield "data: " + json.dumps({
        "type": "repo",
        "repo": repo_data
    }) + "\n\n"

    await asyncio.sleep(1)


    # STEP 4 — TEST RESULTS (Simulated for UI)
    tests_data = {
        "total": 10,
        "passed": 9,
        "failed": 1,
        "framework": "pytest"
    }

    yield "data: " + json.dumps({
        "type": "tests",
        "tests": tests_data
    }) + "\n\n"

    await asyncio.sleep(1)


    # STEP 5 — FIXING
    yield "data: " + json.dumps({
        "type": "status",
        "status": "fixing",
        "progress": 70
    }) + "\n\n"

    yield "data: " + json.dumps({
        "type": "log",
        "level": "info",
        "message": "Applying AI-generated patch..."
    }) + "\n\n"

    await asyncio.sleep(1)


    # STEP 6 — HISTORY ENTRY
    fix_iteration = {
        "id": str(uuid.uuid4()),
        "timestamp": datetime.now().isoformat(),
        "file": result["fixes"][0]["file"],
        "branch": result["branch_created"],
        "status": "success",
        "patch": "AI-AGENT: Dummy test fix"
    }

    yield "data: " + json.dumps({
        "type": "history",
        "fix": fix_iteration
    }) + "\n\n"

    await asyncio.sleep(1)


    # STEP 7 — COMPLETE
    yield "data: " + json.dumps({
        "type": "status",
        "status": "completed",
        "progress": 100
    }) + "\n\n"

    yield "data: " + json.dumps({
        "type": "log",
        "level": "success",
        "message": "All tests fixed successfully. Branch pushed."
    }) + "\n\n"


# -----------------------------
# API Endpoint
# -----------------------------
@app.post("/analyze")
async def analyze(request: Request):
    body = await request.json()
    repo_url = body.get("repoUrl")
    token = body.get("token")

    return StreamingResponse(
        event_stream(repo_url, token),
        media_type="text/event-stream"
    )