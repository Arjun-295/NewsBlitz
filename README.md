# News Blitz

Simple news Q&A chatbot that ingests web articles, stores embeddings, and answers user queries using a local LLM backend.

## Features
- Scrapes and cleans article text (server/web scraping/cleanWebDocument.js)
- Stores embeddings in Chroma (server/config/chroma.js) or optional in-memory fallback
- Retrieves top-K relevant docs and builds a context for the LLM
- Frontend NewsBot UI (client)

## Prerequisites
- Node.js (16+)
- npm
- Docker (if running Chroma via Docker)
- Env vars:
  - OPENAI_API_KEY — LLM / OpenRouter API key
  - GEMINI_API_KEY — embedding key (if using Google Gemini embedder)
  - (Optional) CHROMA_HOST, CHROMA_PORT if you change defaults

## Quick setup (Windows PowerShell)
```powershell
# install deps
cd "c:\Users\ARJUN-029\Desktop\News Blitz\server"
npm install

cd "../client"
npm install
```

## Running Chroma (recommended)
```powershell
docker pull ghcr.io/chroma-core/chroma:latest
docker run -d --name chroma -p 8000:8000 ghcr.io/chroma-core/chroma:latest
# verify
docker ps
curl http://localhost:8000/
```

## Start app
- Frontend:
```powershell
cd client
npm run dev
```
- Backend (example):
```powershell
cd server
node server.js   # or use your existing start script (npm run start)
```

## Useful scripts
- Count/list docs in Chroma:
```powershell
node .\server\scripts\chromaStats.js
```

## Notes & troubleshooting
- If you see "cannot read properties of undefined": guard against empty query results (results.documents / results.metadatas may be undefined).
- If Chroma is not running, switch to the in-memory fallback (see earlier suggestion using Fuse.js) or start Docker Chroma.
- scrapeAndClean truncates/guards short content; check server/web scraping/cleanWebDocument.js for extraction rules and timeouts.
- For better retrieval, chunk long articles on ingest (langchain text splitter) and store chunks as separate documents.

## Project layout (high level)
- server/ - backend, scraping, chroma config, chat controller
- client/ - frontend NewsBot UI
- server/web scraping/ - scrapers and cleaners
- server/scripts/ - helper scripts (chromaStats.js)

If you want, I can add a detailed start script or create a minimal docker-compose to run the whole stack.// filepath: c:\Users\ARJUN-029\Desktop\News Blitz\README.md

# News Blitz

Simple news Q&A chatbot that ingests web articles, stores embeddings, and answers user queries using a local LLM backend.

## Features
- Scrapes and cleans article text (server/web scraping/cleanWebDocument.js)
- Stores embeddings in Chroma (server/config/chroma.js) or optional in-memory fallback
- Retrieves top-K relevant docs and builds a context for the LLM
- Frontend NewsBot UI (client)

## Prerequisites
- Node.js (16+)
- npm
- Docker (if running Chroma via Docker)
- Env vars:
  - OPENAI_API_KEY — LLM / OpenRouter API key
  - GEMINI_API_KEY — embedding key (if using Google Gemini embedder)
  - (Optional) CHROMA_HOST, CHROMA_PORT if you change defaults

## Quick setup (Windows PowerShell)
```powershell
# install deps
cd "c:\Users\ARJUN-029\Desktop\News Blitz\server"
npm install

cd "../client"
npm install
```

## Running Chroma (recommended)
```powershell
docker pull ghcr.io/chroma-core/chroma:latest
docker run -d --name chroma -p 8000:8000 ghcr.io/chroma-core/chroma:latest
# verify
docker ps
curl http://localhost:8000/
```

## Start app
- Frontend:
```powershell
cd client
npm run dev
```
- Backend (example):
```powershell
cd server
node server.js   # or use your existing start script (npm run start)
```

## Useful scripts
- Count/list docs in Chroma:
```powershell
node .\server\scripts\chromaStats.js
```

## Notes & troubleshooting
- If you see "cannot read properties of undefined": guard against empty query results (results. documents/results.metadatas may be undefined).
- If Chroma is not running, switch to the in-memory fallback (see earlier suggestion using Fuse.js) or start Docker Chroma.
- scrapeAndClean truncates/guards short content; check server/web scraping/cleanWebDocument.js for extraction rules and timeouts.
- For better retrieval, chunk long articles on ingest (langchain text splitter) and store chunks as separate documents.

## Project layout (high level)
- server/ - backend, scraping, chroma config, chat controller
- client/ - frontend NewsBot UI
- server/web scraping/ - scrapers and cleaners
- server/scripts/ - helper scripts (chromaStats.js)

If you want, I can add a detailed start script or create a minimal docker-compose to run the whole stack.
