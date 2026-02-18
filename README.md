# OpsMind AI - Enterprise SOP Knowledge Assistant

<div align="center">
  <h3>Context-Aware Corporate Knowledge Assistant</h3>
  <p>A RAG-based system that helps employees instantly find answers from corporate documents</p>
</div>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue" />
  <img src="https://img.shields.io/badge/license-MIT-green" />
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248" />
  <img src="https://img.shields.io/badge/React-18.2-61DAFB" />
  <img src="https://img.shields.io/badge/Node.js-18.x-339933" />
  <img src="https://img.shields.io/badge/Gemini-1.5%20Flash-4285F4" />
</p>

---

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Getting Started for Contributors](#getting-started-for-contributors)
  - [Prerequisites](#prerequisites)
  - [Repository Setup](#repository-setup)
  - [Forking the Repository](#forking-the-repository)
  - [Cloning Your Fork](#cloning-your-fork)
  - [Setting Up Upstream](#setting-up-upstream)
  - [Branching Strategy](#branching-strategy)
  - [Making Your First Commit](#making-your-first-commit)
- [Development Setup](#development-setup)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Team Workflow](#team-workflow)
  - [Daily Workflow](#daily-workflow)
  - [Creating a Pull Request](#creating-a-pull-request)
  - [Code Review Process](#code-review-process)
- [Week-wise Tasks](#week-wise-tasks)
- [Docker Setup](#docker-setup)
- [Troubleshooting](#troubleshooting)
- [Communication Guidelines](#communication-guidelines)
- [License](#license)

---

## 🎯 Project Overview

OpsMind AI is an intelligent knowledge assistant that helps employees instantly find answers from corporate documents (HR policies, SOPs, manuals, etc.). It uses RAG (Retrieval Augmented Generation) to provide accurate, cited answers with a critical "hallucination guardrail" - the AI will explicitly say "I don't know" if the answer isn't in the knowledge base.

**Key Features:**
- 📄 PDF document ingestion
- 🔍 Semantic search using vector embeddings
- 💬 Real-time chat with streaming responses
- 📚 Precise citations with source and page numbers
- 📊 Admin dashboard with knowledge graph analytics
- 🛡️ Hallucination guardrail for reliable answers

---

## 🛠 Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | React, Tailwind CSS, EventSource | Chat UI, streaming, admin dashboard |
| **Backend** | Node.js, Express, Multer | API routes, file uploads |
| **Database** | MongoDB Atlas + Vector Search | Document storage, vector similarity |
| **AI/ML** | Gemini 1.5 Flash, text-embedding-004 | Response generation, embeddings |
| **Queue** | BullMQ + Redis | Background job processing |
| **DevOps** | Docker, Docker Compose | Containerization, deployment |

---

## 🚀 Getting Started for Contributors

### Prerequisites

Before you begin, ensure you have the following installed:

| Tool | Version | Download |
|------|---------|----------|
| **Git** | 2.30+ | [Download](https://git-scm.com/downloads) |
| **Node.js** | 18.x | [Download](https://nodejs.org/) |
| **npm** | 9.x | Comes with Node.js |
| **Docker** | 24.x | [Download](https://www.docker.com/products/docker-desktop) |
| **MongoDB Compass** | Latest | [Download](https://www.mongodb.com/products/compass) (Optional) |
| **Redis Insight** | Latest | [Download](https://redis.com/redis-enterprise/redis-insight/) (Optional) |

### Repository Setup

#### Step 1: Accept GitHub Invitation

You should receive an email invitation to join the repository as a contributor. If you haven't received it:

1. Check your email (including spam folder)
2. Contact the team lead if you don't see the invitation
3. Once invited, click "Accept invitation"

#### Step 2: Fork the Repository

Forking creates your own copy of the repository where you can make changes without affecting the main project.

**Option A: Using GitHub Website**

1. Go to the repository: `https://github.com/sutarvaibhav649/opsmind-ai`
2. Click the **Fork** button (top-right corner)
3. Select your personal GitHub account as the destination
4. Wait for the fork to complete

**Option B: Using GitHub CLI**

```bash
# Install GitHub CLI first, then run:
gh repo fork sutarvaibhav649/opsmind-ai --clone=false