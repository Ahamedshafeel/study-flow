# Study Flow – Smart Digital Assistant for Study Planning

A full-stack MERN application that helps students manage study schedules, subjects, tasks, notes, and reminder notifications efficiently.

## Features

- User Authentication
- Subject Management
- Task Scheduling
- Dynamic Timetable Generation
- Notes Management
- Email Reminder System
- Responsive UI

---

## Tech Stack

### Frontend
- React.js
- Vite
- CSS / JSX

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Nodemailer

---

## Project Structure

```bash
StudyFlow/
│
├── frontend/        # React frontend
├── backend/         # Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── config/
│
├── package.json
└── README.md
```

---

## Installation

### 1. Clone Repository

```bash
git clone <your-github-repo-url>
cd StudyFlow
```

### 2. Install Dependencies

#### Frontend

```bash
cd frontend
npm install
```

#### Backend

```bash
cd backend
npm install
```

---

## Environment Variables

Create a `.env` file inside the backend folder.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
EMAIL_USER=<REMOVED>
EMAIL_PASS=your_email_password
```

---

## Run Project

### Backend

```bash
cd backend
npm start
```

### Frontend

```bash
cd frontend
npm run dev
```

---

## Deployment

### Recommended Hosting

Frontend:
- Vercel
- Netlify

Backend:
- Render
- Railway

Database:
- MongoDB Atlas

---

## GitHub Upload

```bash
git init
git add .
git commit -m "Initial Commit"
git branch -M main
git remote add origin <repo-url>
git push -u origin main
```

---

## Author

Study Flow Project