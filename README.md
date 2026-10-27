# ChordCritic

A music review site where users rate albums and tracks (0.5 to 5 stars), write reviews, and curate their profiles. Group project for CEN3031.

## Tech Stack

- Frontend: React (Vite)
- Backend: Node.js + Express REST API
- Database: PostgreSQL (Neon for dev)
- External API: Spotify Web API
- Hosting: Render

## Project Structure

- client/ - React frontend
- server/ - Express API, Postgres schema and migration script

## Getting Started

### Prerequisites

- Node.js 20 or newer

### 1. Clone and install

    git clone https://github.com/deweyyyyyy/ChordCritic.git
    cd ChordCritic
    cd client && npm install && cd ..
    cd server && npm install && cd ..

### 2. Configure environment

    cp server/.env.example server/.env

Ask a teammate for the DATABASE_URL value - it contains a password, so share it by DM, never in commits or PRs. Paste it into server/.env.

### 3. Create the database tables

    cd server && npm run migrate

### 4. Run it

    # Terminal 1 - API on http://localhost:4000
    cd server && npm run dev

    # Terminal 2 - app on http://localhost:5173
    cd client && npm run dev

## Environment Variables (server/.env)

| Variable | Purpose |
| --- | --- |
| DATABASE_URL | Postgres connection string |
| JWT_SECRET | Secret used to sign auth tokens |
| SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET | Spotify Web API access |
| CORS_ORIGIN | Frontend origin allowed to call the API |
| PORT | API port (default 4000) |

## Contributing

Branching, commit format, and the PR process are in CONTRIBUTING.md. All work is tracked on our Jira board - create or find a card before starting.
