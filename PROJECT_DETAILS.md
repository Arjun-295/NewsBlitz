# 📋 News Blitz - Project Details

> A comprehensive overview of the News Blitz project for portfolio, interviews, and documentation purposes.

---

## 🔹 1. Project Basics

| Field             | Value                   |
| ----------------- | ----------------------- |
| **Project Title** | News Blitz              |
| **Type**          | Personal / Mini Project |
| **Duration**      | ~2-3 weeks              |
| **Team**          | Solo                    |

---

## 🔹 2. Problem Statement

News Blitz solves the problem of **information overload** by aggregating tech news articles from multiple RSS feeds, storing them as vector embeddings, and allowing users to ask natural language questions to get relevant, summarized answers — instead of manually reading dozens of articles.

---

## 🔹 3. Your Role

**Full Stack Developer** — Designed and implemented the complete application including:

- Frontend UI (React)
- Backend API (Express/Node.js)
- Web scraping pipeline
- RAG (Retrieval-Augmented Generation) pipeline with vector embeddings
- User authentication system

---

## 🔹 4. Tech Stack

| Layer                 | Technologies                                                                                        |
| --------------------- | --------------------------------------------------------------------------------------------------- |
| **Frontend**          | React 19, Vite, React Router DOM, Tailwind CSS, Framer Motion, Lucide React (icons), React Markdown |
| **Backend**           | Node.js, Express.js 5                                                                               |
| **Database**          | MongoDB (Mongoose), ChromaDB (vector database)                                                      |
| **ML / AI**           | LangChain (OpenAI/OpenRouter integration), Google Gemini Embeddings, RAG Pipeline                   |
| **Tools & Libraries** | Cheerio (web scraping), RSS Parser, Bcrypt.js, JWT, Axios, Docker (for ChromaDB)                    |

---

## 🔹 5. Key Features

1. **AI-Powered News Q&A Chatbot**  
   Ask natural language questions about tech news and get contextual, LLM-generated answers using RAG

2. **User Authentication with JWT**  
   Secure register/login with password hashing (bcrypt) and token-based auth

3. **Real-time News Feed Aggregation**  
   Fetches and displays tech news from multiple RSS feed sources

4. **Vector Embedding Storage (ChromaDB)**  
   Stores article embeddings for semantic search and retrieval

5. **Web Scraping & Content Cleaning**  
   Scrapes and cleans article content using Cheerio for embedding

6. **Notes System**  
   Users can create and manage personal notes

---

## 🔹 6. Logic / Architecture (High Level)

**Architecture**: REST API + RAG Pipeline

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   React Client  │────▶│   Express API   │────▶│    MongoDB      │
│   (Vite + TW)   │     │   (Node.js)     │     │   (User Data)   │
└─────────────────┘     └────────┬────────┘     └─────────────────┘
                                 │
                                 ▼
                        ┌─────────────────┐
                        │   ChromaDB      │◀──── Vector Embeddings
                        │(Vector Database)│      (Gemini Embedder)
                        └────────┬────────┘
                                 │
                        ┌────────▼────────┐
                        │   OpenRouter    │──── LLM (GPT-OSS-120B)
                        │   (LangChain)   │
                        └─────────────────┘
```

### RAG Pipeline Flow

1. **Ingestion Phase**:
   - RSS feeds fetched
   - Web scraping with Cheerio
   - Text cleaning & preprocessing
   - Chunking with LangChain
   - Gemini Embeddings generation
   - Storage in ChromaDB

2. **Query Phase**:
   - User sends natural language query
   - Semantic search retrieves top-K (20) relevant documents
   - Context building (max 30,000 chars)
   - LLM prompt construction
   - Response generation with source attribution

---

## 🔹 7. Results / Outcomes

- ✅ Successfully retrieves **top-20 relevant documents** for each user query
- ✅ Context-aware responses using **30,000 character context window**
- ✅ User-friendly chat interface with **source attribution**
- ✅ Modular architecture ready for **SaaS expansion** (roadmap documented)
- ✅ Secure authentication with **JWT tokens (60-min expiry)**

---

## 🔹 8. Deployment / Demo

| Field           | Value                                                   |
| --------------- | ------------------------------------------------------- |
| **Hosted**      | No (Localhost)                                          |
| **Platform**    | Localhost (Vite dev server + Express + Docker ChromaDB) |
| **GitHub Link** | _(Add your GitHub link here)_                           |

### How to Run Locally

```bash
# Start ChromaDB (Docker)
docker run -d --name chroma -p 8000:8000 ghcr.io/chroma-core/chroma:latest

# Start Backend
cd server
npm install
npm run dev

# Start Frontend
cd client
npm install
npm run dev
```

---

## 🔹 9. Why This Project Matters

| Impact Area                   | Description                                                                                 |
| ----------------------------- | ------------------------------------------------------------------------------------------- |
| **AI/LLM Innovation**         | Implements modern RAG architecture to make news consumption intelligent and efficient       |
| **Time Saving**               | Reduces the effort of reading multiple articles by providing concise AI-generated summaries |
| **Personalization Potential** | Architecture supports user preferences and personalized news feeds                          |
| **Scalable Design**           | Documented SaaS roadmap with features like bookmarks, chat history, and trending topics     |

---

## 📁 Project Structure

```
News Blitz/
├── client/                    # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Route pages (NewsBot, NewsFeed, Notes, etc.)
│   │   ├── api/               # Axios API configuration
│   │   └── App.jsx            # Main app with routing
│   └── package.json
│
├── server/                    # Backend (Express.js)
│   ├── config/                # DB & ChromaDB configuration
│   ├── controllers/           # Route handlers (auth, newsChat, etc.)
│   ├── models/                # Mongoose schemas (User, Note)
│   ├── routes/                # API routes
│   ├── web-scraping/          # Scraping & cleaning utilities
│   ├── services/              # Business logic
│   └── server.js              # Express entry point
│
├── README.md
├── FEATURE_IDEAS.md           # Future feature roadmap
├── SAAS_ROADMAP.md            # SaaS transformation plan
└── PROJECT_DETAILS.md         # This file
```

---

## 📝 Resume Bullet Points

Use these for your resume:

- Built a **full-stack AI-powered news aggregator** using React, Express.js, MongoDB, and ChromaDB with RAG pipeline for semantic Q&A
- Implemented **vector embedding storage** using Google Gemini and ChromaDB, enabling top-K semantic search across 20+ news articles
- Developed **secure JWT-based authentication** with bcrypt password hashing and protected route middleware
- Created an **intelligent chatbot interface** using LangChain and OpenRouter LLM integration with source attribution

---

_Last Updated: January 24, 2026_
