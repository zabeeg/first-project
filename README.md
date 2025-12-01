# 🎀 betterMe

> A beautiful wellness & confidence app for girls who want to feel their best! ✨

betterMe is a coquette-themed self-improvement app featuring workouts, outfit inspiration, skincare routines, and daily affirmations. Built to help girls feel confident, happy, and beautiful.

![betterMe](https://img.shields.io/badge/theme-coquette-pink)
![React](https://img.shields.io/badge/React-18-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)

## 💕 Features

- **🧘‍♀️ Workouts** - Pilates, yoga, dance, strength training & more
- **👗 Outfit Inspo** - Coquette, casual, sporty & elegant outfit ideas
- **✨ Skincare** - Personalized routines for your skin type
- **💝 Affirmations** - Daily reminders of how amazing you are
- **👤 User Accounts** - Save your favorites and track progress

## 🌸 Tech Stack

**Frontend:**
- React 18 + Vite
- React Router for navigation
- Zustand for state management
- Axios for API calls

**Backend:**
- Node.js + Express
- PostgreSQL database
- Knex.js for migrations
- JWT authentication
- MinIO for file storage

## 🎀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Docker & Docker Compose
- npm or yarn

### 1. Start Database & Storage

```bash
docker-compose up -d
```

This starts:
- PostgreSQL on port 5432
- MinIO on ports 9000 (API) and 9001 (Console)

### 2. Setup Backend

```bash
cd backend
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Run database migrations
npx knex migrate:latest

# Seed the database with sample data
npx knex seed:run

# Start the server
npm start
```

The backend will run on **http://localhost:5000**

### 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on **http://localhost:3000**

## 📁 Project Structure

```
betterMe/
├── docker-compose.yml      # PostgreSQL & MinIO
├── backend/
│   ├── src/
│   │   ├── index.js        # Express app entry
│   │   ├── db.js           # Database connection
│   │   ├── routes/         # API routes
│   │   │   ├── auth.js     # Login/Register
│   │   │   ├── workouts.js
│   │   │   ├── outfits.js
│   │   │   ├── skincare.js
│   │   │   ├── affirmations.js
│   │   │   └── upload.js
│   │   └── middleware/
│   │       └── auth.js     # JWT verification
│   ├── migrations/         # Database schema
│   └── seeds/              # Sample data
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   ├── api.js          # Axios setup
    │   ├── store.js        # Zustand store
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Card.jsx
    │   │   └── Hero.jsx
    │   └── pages/
    │       ├── Home.jsx
    │       ├── Workouts.jsx
    │       ├── Outfits.jsx
    │       ├── Skincare.jsx
    │       ├── Affirmations.jsx
    │       ├── Login.jsx
    │       └── Register.jsx
    └── index.html
```

## 💄 API Endpoints

### Auth
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login

### Workouts
- `GET /api/workouts` - Get all workouts
- `GET /api/workouts/categories` - Get categories
- `POST /api/workouts/favorites` - Save favorite (auth required)

### Outfits
- `GET /api/outfits` - Get outfit inspirations
- `GET /api/outfits/categories` - Get categories
- `POST /api/outfits/favorites` - Save favorite (auth required)

### Skincare
- `GET /api/skincare` - Get skincare products
- `GET /api/skincare/skin-types` - Get skin types
- `GET /api/skincare/categories` - Get categories
- `POST /api/skincare/routines` - Save routine (auth required)

### Affirmations
- `GET /api/affirmations` - Get all affirmations
- `GET /api/affirmations/daily` - Get random daily affirmation

## 🌷 Environment Variables

Create a `.env` file in the backend folder:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=betterme
DB_USER=betterme_user
DB_PASSWORD=betterme_password
JWT_SECRET=your-super-secret-key
MINIO_ENDPOINT=http://localhost:9000
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
MINIO_BUCKET=betterme-uploads
```

## 💝 Learning Plan

- [ ] **Week 1**: Explore the Login/Register pages + understand JWT tokens
- [ ] **Week 2**: Learn about the Database Schema (check migrations folder)
- [ ] **Week 3**: Try adding a new workout or outfit
- [ ] **Week 4**: Customize the styling to your taste!

## 🎀 Customization Ideas

- Add new workout categories (ballet, HIIT, swimming)
- Create more coquette outfit ideas
- Add a mood tracker feature
- Implement a water intake reminder
- Add period tracking
- Create a goals/habits section

---

Made with 💖 for girls who want to feel confident and beautiful

*Remember: You are worthy of love, especially from yourself!* ✨
