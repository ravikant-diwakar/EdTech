<p align="center"> <img width="339" height="287" alt="SkillN Logo" src="https://github.com/user-attachments/assets/0f4d79e1-b3b4-41d8-ba9d-4b3e8a641087" /> <br> <strong>AI-Powered EdTech Learning and Career Platform</strong> </p><h1 align="center">SkillN: Your Smart Career Path</h1><p align="center"> <em>The next-generation platform transforming professional development through AI-driven insights and personalized learning.</em> </p>

A comprehensive **Full-Stack Web Application (MERN Stack)** combining advanced **Course Management** with **EdTech Features**. This platform allows users to enroll in courses, track learning progress, and leverage AI-powered tools for career advancement.

## Key Features

### EdTech & Online Learning
- **Course Platform**: Enroll in and access educational courses.
- **My Learning Dashboard**: Dedicated student dashboard to track progress.
- **Book Catalog**: Browse and purchase books.
- **Stripe Payments**: Secure payment processing for books and courses.
- **Order Management**: Track orders and purchase history.

### AI Career Tools (Powered by Llama 3)
- **Resume Analyzer**: Get detailed feedback on your resume.
- **AI Interview Prep**: Generate custom interview questions based on your resume.
- **LinkedIn Booster**: Optimize your LinkedIn profile with AI suggestions.
- **Smart Prep**: Personalized study plans and interview guides.

### Role-Based Access
- **Admin Dashboard**: Manage books, courses, users, and purchases.
- **Teacher Dashboard**: Create and manage courses.
- **Book Seller Dashboard**: Manage book inventory.
- **Student/User Dashboard**: Access learning materials and purchase history.

---

## Tech Stack

### Frontend
- **Framework**: React.js (Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Material UI, Emotion
- **Routing**: React Router DOM (v6)
- **Icons**: Lucide React, React Icons

### Backend
- **Framework**: Node.js & Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT & bcryptjs
- **Payment**: Stripe API

---

## 📂 Project Structure

```bash
bookStoreApp/
├── Backend/                # Express & MongoDB Server
│   ├── controller/         # Logic for Books, Users, Courses, etc.
│   ├── model/              # Mongoose Schemas (User, Book, Course)
│   ├── route/              # API Routes
│   ├── utils/              # Helper functions (Email, etc.)
│   └── index.js            # Entry point
│
└── Frontend/               # React + TypeScript Client
    ├── src/
    │   ├── components/     # UI Components (Dashboards, AI Tools, etc.)
    │   ├── services/       # API Integrations (Groq, etc.)
    │   ├── context/        # AuthProvider & Global State
    │   └── layouts/        # Dashboard Layouts
    └── vite.config.ts      # Vite Configuration
```

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (Local or Atlas URI)
- Stripe Account (for payments)

### Backend Setup

1.  Navigate to the `Backend` directory:
    ```bash
    cd Backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `Backend` root with the following variables:
    ```env
    PORT=4000
    MongoDBURI=mongodb://localhost:27017/bookstore  # Or your MongoDB Atlas URI
    JWT_SECRET=your_super_secret_jwt_key
    STRIPE_SECRET_KEY=sk_test_... # Your Stripe Secret Key
    ```
4.  Start the server:
    ```bash
    npm start
    ```
    _The server will run on `http://localhost:4000`._

### Frontend Setup

1.  Navigate to the `Frontend` directory:
    ```bash
    cd Frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```
    _The app will run on `http://localhost:5173`._

---

## API Endpoints Overview

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/book` | Get all books |
| **POST** | `/user/signup` | Register a new user |
| **POST** | `/user/login` | Login user |
| **POST** | `/purchase/buy` | Buy a course/book |
| **POST** | `/payment/create-payment-intent` | Initialize Stripe payment |
| **GET** | `/course` | List available courses |
| **GET** | `/admin/stats` | Get dashboard statistics (Admin only) |

---

> [!IMPORTANT]
> - **Email Service**: The `email.service.js` is currently set to **MOCK** mode. It logs email tokens to the console instead of sending actual emails. This is perfect for testing without SMTP credentials.
> - **Stripe**: The payment controller includes a mock mode if the Stripe key is missing or set to a dummy value.

