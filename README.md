# Music Streaming App

A full-stack music streaming application with React frontend, Node.js backend, MongoDB, and support for local MP3 uploads, Spotify, and YouTube.

## Features

- Upload and play local MP3 files
- Create and manage playlists
- Search music
- User authentication
- Integration with Spotify and YouTube (basic setup)

## Setup

1. Clone the repo
2. Install dependencies:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```
3. Set up environment variables: Copy `.env.example` to `.env` and fill in the values.
4. Start MongoDB locally or use Docker.
5. Run the backend: `cd backend && npm run dev`
6. Run the frontend: `cd frontend && npm run dev`
7. For Docker: `docker-compose up --build`

## API Endpoints

- POST /api/auth/register
- POST /api/auth/login
- POST /api/music/upload
- GET /api/music
- GET /api/music/search?q=query
- POST /api/playlists
- GET /api/playlists