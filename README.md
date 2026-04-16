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
