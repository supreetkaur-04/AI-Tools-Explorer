# 🧠 AI Tools Explorer – Backend (Node.js + Express)

This is the backend for the AI Tools Explorer Challenge – Round 2 (Simplify AI Internship). It exposes a set of RESTful APIs built with Node.js and Express that serve AI tool data and manage user favorites (in-memory).

## 🚀 Getting Started

### 📦 Prerequisites

- Node.js v14 or later
- npm (Node package manager)

### 🔧 Installation

```terminal

cd server
npm install


### Run

```1st terminal (for backend)
cd server
npm start

```2nd terminal (for frontend)

cd client
npm start

### Screenshots

![Homepage dark mode] (./public/dark_mode.png)
![Homepage light mode] (./public/light_mode.png)
!more images are added in public folder

### 🎁 Bonus Features Implemented (Server Side)
Here are the bonus features handled on the backend (you can update this as you go):

🔒 Duplicate Favorite Prevention
When a user tries to favorite the same tool more than once, the API throws a friendly error message ("Already favorited.").

🔍 Case-insensitive Filtering
The /api/tools?category=... filter works even if the category is typed in lowercase or uppercase.

🧯 Error Handling Middleware
Central error middleware ensures all errors are returned in a clean JSON format with appropriate status codes.