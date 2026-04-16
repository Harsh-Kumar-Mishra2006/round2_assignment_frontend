# 📝 BlogSphere - Frontend

A modern, fully-featured blog platform frontend built with **React**, **TypeScript**, and **Tailwind CSS** as a part of Round 2 Assignment from DekNek3D.It Features user authentication, blog post management, likes, comments, and a beautiful responsive UI.

## 🚀 Live Demo

**Frontend:** [https://round2-assignment-frontend.onrender.com](https://round2-assignment-frontend.onrender.com)  
**Backend API:** [https://round2-assignment-backend.onrender.com](https://round2-assignment-backend.onrender.com)

---

## :camera: Screensort

![Screensort_1](screensort_1.png)
![Screensort_2](screensort_2.png)
![Screensort_3](screensort_3.png)
![Screensort_4](screensort_4.png)

---

## ✨ Features

### 🔐 Authentication

- User registration with email & password
- User login with JWT token
- Persistent login state (localStorage)
- Protected routes (cannot access without login)
- Logout functionality

### 📝 Blog Management

- **Create** - Write and publish new blog posts
- **Read** - View all posts on homepage
- **Read Single** - View full post with all details
- **Update** - Edit your own posts
- **Delete** - Remove your own posts with confirmation

### ❤️ Engagement Features

- **Like/Unlike** - Toggle likes on any post (real-time update)
- **Comments** - Add comments to any post
- **Delete Comments** - Remove your own comments
- **Real-time Updates** - Instant UI feedback without page reload

### 👤 User Features

- Profile page with user information
- View all posts written by the user
- Post statistics (total posts, likes received)

### 🎨 UI/UX

- Beautiful gradient design (Teal/Cyan/Rose theme)
- Fully responsive (mobile, tablet, desktop)
- Loading states with spinners
- Toast notifications for success/error messages
- Confirmation dialogs for destructive actions
- Smooth animations and hover effects

---

## 🛠️ Tech Stack

| Technology              | Purpose                 |
| ----------------------- | ----------------------- |
| **React 18**            | UI framework            |
| **TypeScript**          | Type safety             |
| **Vite**                | Build tool & dev server |
| **Tailwind CSS**        | Styling                 |
| **React Router DOM v6** | Client-side routing     |
| **Axios**               | HTTP requests           |
| **React Hot Toast**     | Notifications           |
| **React Icons**         | Icon library            |

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB (local or Atlas)

### One-Click Setup

```bash
# Clone repository
git clone https://github.com/yourusername/project-name.git

# Navigate to project
cd project-name

# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Start development server
npm run dev
```

## :folder: Project Structure

blog_app_frontend/
│
├── src/
│ ├── components/
│ │ ├── layout/
│ │ │ ├── Navbar.tsx # Navigation bar
│ │ │ ├── Footer.tsx # Footer component
│ │ │ └── Layout.tsx # Main layout wrapper
│ │ ├── common/
│ │ │ ├── PostCard.tsx # Post preview card
│ │ │ ├── Loader.tsx # Loading spinner
│ │ │ └── PrivateRoute.tsx # Protected route wrapper
│ │ └── home/
│ │ └── Hero.tsx # Hero banner section
│ │
│ ├── pages/
│ │ ├── Home.tsx # Homepage with all posts
│ │ ├── Login.tsx # Login page
│ │ ├── Signup.tsx # Registration page
│ │ ├── CreateBlog.tsx # Create new post
│ │ ├── EditPost.tsx # Edit existing post
│ │ ├── PostDetail.tsx # Single post view
│ │ └── Profile.tsx # User profile page
│ │
│ ├── context/
│ │ └── AuthContext.tsx # Authentication state management
│ │
│ ├── services/
│ │ └── api.ts # API service layer
│ │
│ ├── types/
│ │ └── index.ts # TypeScript interfaces
│ │
│ ├── utils/
│ │ └── dummyData.ts # Sample posts for testing
│ │
│ ├── App.tsx # Main app with routes
│ ├── main.tsx # Entry point
│ └── index.css # Global styles + Tailwind
│
├── public/
│ └── index.html
│
├── .env # Environment variables
├── .gitignore # Git ignore file
├── package.json # Dependencies
├── tailwind.config.js # Tailwind configuration
├── tsconfig.json # TypeScript configuration
├── vite.config.ts # Vite configuration
├── vercel.json # Vercel deployment config
└── README.md # Documentation

## 🔗 API Integration

The frontend connects to the backend API at VITE_API_URL. All API calls are handled in src/services/api.ts.

| Method     | Endpoint              | Purpose           |
| ---------- | --------------------- | ----------------- |
| **POST**   | /api/auth/signup      | User registration |
| **POST**   | /api/auth/login       | User login        |
| **GET**    | /api/auth/me          | Get current user  |
| **GET**    | /api/posts            | Get all posts     |
| **GET**    | /api/posts/:id        | Get single post   |
| **POST**   | /api/posts            | Create post       |
| **PUT**    | /api/posts/:id        | Update post       |
| **DELETE** | /api/posts/:id        | Delete post       |
| **PUT**    | /api/posts/:id/like   | Like/unlike post  |
| **GET**    | /api/comments/:postId | Get post comments |
| **POST**   | /api/comments         | Add comment       |
| **DELETE** | /api/comments/:id     | Delete comment    |

## :student: Author

**Harsh Kumar Mishra**
