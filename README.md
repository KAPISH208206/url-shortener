# ⚡ Snip — URL Shortener

A full-stack URL shortener built with React, Node/Express, and MongoDB.

## Prerequisites
- Node.js 16+
- MongoDB running locally (or provide a MongoDB Atlas URI)

## Setup & Run

### 1. Install all dependencies
```bash
npm run install-all
```

### 2. Configure environment
The `server/.env` file is pre-configured for local development:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/urlshortener
BASE_URL=http://localhost:5000
CLIENT_URL=http://localhost:3000
```
Update `MONGO_URI` if using MongoDB Atlas.

### 3. Run in development (both server + client)
```bash
npm install          # installs concurrently
npm run dev          # starts server on :5000 and React on :3000
```

### 4. Production
```bash
cd client && npm run build   # build React app
npm start                     # start server only (serve build separately)
```

## API Endpoints
| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/url/shorten` | Shorten a URL `{ originalUrl }` |
| GET | `/api/url/all` | List last 20 shortened URLs |
| GET | `/:code` | Redirect to original URL |
