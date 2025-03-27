# MERN Blog Platform

A modern, full-stack blog platform built with the MERN stack (MongoDB, Express.js, React, Node.js). This platform allows users to create, read, update, and delete blog posts with features like tagging, draft status, and user authentication.

## Features

- 🔐 User Authentication
  - Secure login and registration
  - JWT-based authentication
  - Protected routes

- 📝 Blog Post Management
  - Create, read, update, and delete posts
  - Rich text content
  - Tag support
  - Draft/Published status
  - Author-only actions

- 🎨 Modern UI/UX
  - Responsive design
  - Clean and intuitive interface
  - Loading states and animations
  - Toast notifications

- 🔍 Search and Filtering
  - Search posts by title and content
  - Filter by tags
  - Sort by date (newest/oldest)

- 📱 Responsive Design
  - Mobile-first approach
  - Works on all devices
  - Optimized for different screen sizes

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- React Query for data fetching
- Tailwind CSS for styling
- React Hot Toast for notifications

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/Morphiu/mern-blog-platform.git
cd mern-blog-platform
```

2. Install dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables
```bash
# In backend/.env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

# In frontend/.env
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the development servers
```bash
# Start backend server
cd backend
npm run dev

# Start frontend server
cd frontend
npm start
```

## Project Structure

```
mern-blog-platform/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── contexts/
    │   ├── pages/
    │   ├── services/
    │   └── App.js
    └── package.json
```

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user
- GET /api/auth/me - Get current user

### Posts
- GET /api/posts - Get all posts
- GET /api/posts/:id - Get single post
- POST /api/posts - Create new post
- PUT /api/posts/:id - Update post
- DELETE /api/posts/:id - Delete post
- GET /api/posts/user/me - Get user's posts

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Query](https://tanstack.com/query/latest)

## Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter) - email@example.com

Project Link: [https://github.com/yourusername/mern-blog-platform](https://github.com/yourusername/mern-blog-platform) 