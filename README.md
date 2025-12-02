# AI-Enabled Judiciary & Court Case Management System

A full-stack MERN application for managing court cases, hearings, documents, and legal drafting with AI assistance.

## 🚀 Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: MongoDB (Atlas)
- **Authentication**: JWT
- **File Upload**: Multer

## 📋 Features

- ✅ User Authentication & Role Management (Admin, Advocate, Judge, Client, Staff)
- ✅ Case Management (Create, Assign, Track)
- ✅ Hearing Scheduling & Calendar
- ✅ Document Upload & AI Summarization
- ✅ AI Legal Drafting (Petitions, Notices, Complaints)
- ✅ Land Record Search
- ✅ Notifications System
- ✅ Role-based Dashboards

## 🏃 Quick Start (Local Development)

### Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (or local MongoDB)

### Backend Setup

```bash
cd backend
npm install

# Create .env file with:
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_secret
# JWT_REFRESH_SECRET=your_refresh_secret
# PORT=5000

npm run dev
```

Backend runs on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

### Create Admin User

```bash
cd backend
npm run create-admin
```

Default admin credentials:
- Email: `admin@judiciary.com`
- Password: `admin123`

## 📦 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions to:
- **Backend**: Render (free tier)
- **Frontend**: Vercel (free tier)
- **Database**: MongoDB Atlas (free tier)

## 📁 Project Structure

```
.
├── backend/          # Express API server
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── services/
│   └── scripts/      # Utility scripts (create-admin)
│
└── frontend/         # React + Vite app
    └── src/
        ├── pages/
        ├── components/
        ├── state/
        └── utils/
```

## 🔐 Environment Variables

### Backend (.env)

```env
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_secret
JWT_REFRESH_SECRET=your_refresh_secret
PORT=5000
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api  # For production, use your backend URL
```

## 📝 API Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user
- `GET /api/cases` - List cases
- `POST /api/cases` - Create case
- `GET /api/hearings/calendar` - Get hearings calendar
- `POST /api/ai/draft` - Generate legal draft
- And more...

## 🎓 Academic Project

This is a Final Year Project (FYP) demonstrating:
- Full-stack MERN development
- Role-based access control
- AI integration for legal document generation
- Modern UI/UX with React
- RESTful API design
- Database modeling with MongoDB

## 📄 License

Academic project - for educational purposes only.

---

**Built with ❤️ for FYP**

