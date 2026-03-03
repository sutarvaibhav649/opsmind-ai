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
  <img src="https://img.shields.io/badge/Node.js-20.x-339933" />
  <img src="https://img.shields.io/badge/OpenRouter-LLM-4285F4" />
</p>

---

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Getting Started for Contributors](#getting-started-for-contributors)
  - [Prerequisites](#prerequisites)
  - [Forking the Repository](#forking-the-repository)
  - [Cloning Your Fork](#cloning-your-fork)
  - [Setting Up Upstream](#setting-up-upstream)
  - [Branching Strategy](#branching-strategy)
- [Development Setup](#development-setup)
  - [Docker Setup (Recommended)](#docker-setup-recommended)
  - [Local Setup (Alternative)](#local-setup-alternative)
  - [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Team Workflow](#team-workflow)
  - [Daily Workflow](#daily-workflow)
  - [Making Your First Commit](#making-your-first-commit)
  - [Creating a Pull Request](#creating-a-pull-request)
  - [Code Review Process](#code-review-process)
- [Features Completed](#features-completed)
- [Troubleshooting](#troubleshooting)
- [Communication Guidelines](#communication-guidelines)
- [License](#license)

---

## 🎯 Project Overview

OpsMind AI is an intelligent knowledge assistant that helps employees instantly find answers from corporate documents (HR policies, SOPs, manuals, etc.). It uses RAG (Retrieval Augmented Generation) to provide accurate, cited answers with a critical **"hallucination guardrail"** - the AI will explicitly say "I don't know" if the answer isn't in the knowledge base.

### Key Features:
| Feature | Description |
|---------|-------------|
| 📄 **Document Ingestion** | Upload PDF documents (Admin only) |
| 🔍 **Semantic Search** | Vector embeddings for intelligent retrieval |
| 💬 **Real-time Chat** | Streaming responses with typing indicator |
| 📚 **Precise Citations** | Source documents, page numbers, confidence scores |
| 📊 **Admin Dashboard** | Knowledge graph with usage analytics |
| 🛡️ **Hallucination Guardrail** | "I don't know" for out-of-scope questions |
| 👥 **Role-Based Access** | Admins upload, all users query |

---

## 🛠 Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | React 18, Tailwind CSS, Vite | Chat UI, streaming, admin dashboard |
| **Backend** | Node.js 20, Express, Multer | API routes, file uploads |
| **Database** | MongoDB Atlas + Vector Search | Document storage, vector similarity |
| **AI/ML** | OpenRouter (LLaMA 3.1), text-embedding-3-small | Response generation, embeddings |
| **Queue** | BullMQ + Redis (Memurai for Windows) | Background PDF processing |
| **Auth** | JWT, bcrypt | Authentication, role management |
| **DevOps** | Docker, Docker Compose | Containerization, deployment |

---

## 🚀 Getting Started for Contributors

### Prerequisites

Before you begin, ensure you have the following installed:

| Tool | Version | Download |
|------|---------|----------|
| **Git** | 2.30+ | [Download](https://git-scm.com/downloads) |
| **Docker Desktop** | 24.x+ | [Download](https://www.docker.com/products/docker-desktop) |
| **Node.js** | 20.x | [Download](https://nodejs.org/) (for local setup) |
| **Memurai** | Latest | [Download](https://www.memurai.com/) (Windows Redis alternative) |
| **MongoDB Compass** | Latest | [Download](https://www.mongodb.com/products/compass) (Optional) |

### Repository Setup

#### Step 1: Accept GitHub Invitation

1. Check your email for the GitHub invitation
2. Click "Accept invitation"
3. You'll get access to the repository

#### Step 2: Fork the Repository

**Using GitHub Website:**
1. Go to: `https://github.com/sutarvaibhav649/opsmind-ai`
2. Click the **Fork** button (top-right)
3. Select your GitHub account
4. Wait for fork to complete

**Using GitHub CLI:**
```bash
gh repo fork sutarvaibhav649/opsmind-ai --clone=true

