# TaskNest — Full-Stack Task Management Web App

A MERN-stack task manager built for the **Web Design and Development — Final Project (WEB 68)**.
Authenticated users can create, view, update, and delete personal tasks, with priority
levels, due dates, search/filtering, and a dashboard summary.

## Tech Stack
- **Frontend:** React (Vite), Tailwind CSS, React Router, Axios
- **Backend:** Node.js, Express, Mongoose, JWT, bcryptjs
- **Database:** MongoDB Atlas
- **Version Control:** Git & GitHub

## Features
- 🔐 JWT authentication (register / login / logout), passwords hashed with bcrypt
- ✅ Full task CRUD, scoped per authenticated user
- 🏷️ Status (Pending / Completed) and priority (Low / Medium / High)
- 📅 Optional due dates and created date
- 🔎 Search by title + filter by status and priority
- 📊 Dashboard summary cards (total, pending, completed, high priority)
- 📱 Responsive Tailwind UI

## Project Structure
```
client/   # React + Vite + Tailwind frontend
server/   # Express REST API + MongoDB
```

## Getting Started

### Prerequisites
- Node.js 18+
- A MongoDB Atlas connection string (free tier works)

### 1. Backend
```bash
cd server
npm install
cp .env.example .env       # then fill in your values
npm run dev                # starts on http://localhost:5000
```

`.env` values:
| Key | Description |
|-----|-------------|
| `PORT` | Server port (default 5000) |
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Long random secret for signing tokens |
| `CLIENT_URL` | Frontend origin for CORS (http://localhost:5173) |

### 2. Frontend
```bash
cd client
npm install
npm run dev                # starts on http://localhost:5173
```
The Vite dev server proxies `/api` to the backend on port 5000.

## API Reference

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register, returns JWT |
| POST | `/api/auth/login` | Login, returns JWT |

### Tasks (require `Authorization: Bearer <token>`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks?status=&priority=&search=` | List tasks (filtered) |
| GET | `/api/tasks/stats` | Task statistics |
| POST | `/api/tasks` | Create task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |

## Data Models
**User:** name, email (unique), password (hashed), timestamps
**Task:** title, description, status, priority, dueDate, user (ref), createdAt

## Design
- Figma wireframes & mockups: _<add your Figma link here>_

## Author
- WEB 68 — _Your Name_ — _Reg Number_
