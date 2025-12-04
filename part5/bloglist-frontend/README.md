# Blog List Application - Full Stack Open Part 5

Full-stack blog list application built with React (frontend) and Node.js/Express (backend). Users can create, like, and delete blogs, with complete authentication and authorization.

## 🚀 Features

### Frontend
- User authentication (login/logout)
- Create new blog posts
- View blog details (title, author, URL, likes)
- Like/unlike blogs
- Delete blogs (only by creator)
- Blogs sorted by number of likes
- Responsive notifications for user actions
- Togglable forms and content

### Backend
- RESTful API for blogs and users
- JWT authentication
- MongoDB database
- Password hashing with bcrypt
- User-specific blog management
- Testing endpoint for E2E tests

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **Axios** - HTTP client
- **Vite** - Build tool
- **Vitest** - Unit testing
- **React Testing Library** - Component testing
- **Cypress** - E2E testing
- **ESLint** - Code linting

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **bcrypt** - Password hashing
- **jsonwebtoken** - JWT authentication
- **dotenv** - Environment variables
- **cors** - CORS middleware

## 📁 Project Structure

```
part5/bloglist-frontend/
├── cypress/
│   ├── e2e/
│   │   └── blog_app.cy.js
│   ├── fixtures/
│   └── support/
│       ├── commands.js
│       └── e2e.js
├── node_modules/
├── public/
├── src/
│   ├── components/
│   │   ├── Blog.jsx
│   │   ├── Blog.test.jsx
│   │   ├── BlogForm.jsx
│   │   ├── BlogForm.test.jsx
│   │   ├── Togglable.jsx
│   │   └── Notification.jsx
│   ├── services/
│   │   ├── blogs.js
│   │   └── login.js
│   ├── App.jsx
│   └── main.jsx
├── .gitignore
├── cypress.config.js
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── testSetup.js
└── vite.config.js

part4/bloglist-backend/
├── controllers/
│   ├── blogs.js
│   ├── users.js
│   ├── login.js
│   └── testing.js
├── models/
│   ├── blog.js
│   └── user.js
├── utils/
│   ├── config.js
│   ├── logger.js
│   └── middleware.js
├── tests/
├── .env
├── .gitignore
├── app.js
├── index.js
├── package-lock.json
└── package.json
```

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB
- npm

### Backend Setup

1. Navigate to backend directory:
```bash
cd part4/bloglist-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in root:
```env
MONGODB_URI=your_mongodb_uri
PORT=3003
SECRET=your_jwt_secret
TEST_MONGODB_URI=your_test_mongodb_uri
```

4. Start development server:
```bash
npm run dev
```

5. Start test server (for E2E tests):
```bash
npm run start:test
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd part5/bloglist-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🧪 Testing

### Unit & Component Tests (Vitest)

Run component tests:
```bash
npm test
```

Watch mode:
```bash
npm test -- --watch
```

### Linting

Run ESLint:
```bash
npm run lint
```

Auto-fix errors:
```bash
npm run lint -- --fix
```

### E2E Tests (Cypress)

1. Make sure backend is running in test mode:
```bash
cd part4/bloglist-backend
npm run start:test
```

2. Make sure frontend is running:
```bash
cd part5/bloglist-frontend
npm run dev
```

3. Open Cypress:
```bash
npm run cypress:open
```

Or run headless:
```bash
npm run test:e2e
```

### Test Coverage

**Component Tests (Vitest + React Testing Library):**
- ✅ Blog component renders title and author
- ✅ URL and likes hidden by default
- ✅ URL and likes shown when view button clicked
- ✅ Like button event handler called correctly
- ✅ Blog form submits with correct data

**E2E Tests (Cypress):**
- ✅ Login form is shown by default
- ✅ Login succeeds with correct credentials
- ✅ Login fails with wrong credentials (red notification)
- ✅ Logged-in user can create a new blog
- ✅ User can like a blog
- ✅ User who created a blog can delete it
- ✅ Only the creator can see the delete button
- ✅ Blogs are ordered by number of likes (descending)

## 🎯 Usage

### Demo Credentials
```
Username: mluukkai
Password: sekret
```

### User Flow

1. **Login**: Enter username and password
2. **Create Blog**: Click "create new blog" button, fill form, submit
3. **View Details**: Click "view" button on any blog
4. **Like Blog**: Click "like" button (visible after viewing details)
5. **Delete Blog**: Click "remove" button (only visible for creator)
6. **Logout**: Click "logout" button

## 📜 Available Scripts

### Frontend
```bash
npm run dev          # Start development server (Vite)
npm run build        # Build for production
npm run preview      # Preview production build
npm test             # Run unit/component tests (Vitest)
npm run lint         # Run ESLint
npm run cypress:open # Open Cypress E2E tests
npm run test:e2e     # Run Cypress tests headless
```

### Backend
```bash
npm run dev          # Start development server with nodemon
npm start            # Start production server
npm run start:test   # Start test server (for Cypress)
npm test             # Run backend tests
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors automatically
```

## 🔒 Security Features

- JWT-based authentication with 1-hour token expiration
- Password hashing with bcrypt (10 salt rounds)
- User-specific authorization for delete operations
- Token validation middleware
- CORS protection
- HTTP-only authentication

## 🌟 Key Learning Outcomes

### Part 5 Topics Covered:
- **React Component Architecture**: Reusable components, props, children
- **State Management**: useState, useEffect, useRef hooks
- **Forms in React**: Controlled components, form handling
- **Refs and forwardRef**: Accessing child components imperatively
- **Component Testing**: Vitest, React Testing Library, mock functions
- **E2E Testing**: Cypress, custom commands, test automation
- **Frontend-Backend Integration**: API calls, token management
- **User Experience**: Notifications, togglable content, conditional rendering
- **Code Quality**: ESLint configuration, best practices

## 📚 Exercises Completed

### Part 5 - Testing React apps, custom hooks
- ✅ 5.1-5.4: bloglist frontend, step 1-4 (login, displaying blogs)
- ✅ 5.5-5.7: bloglist frontend, step 5-7 (togglable form, view details)
- ✅ 5.8-5.11: bloglist frontend, step 8-11 (like, delete, sorting)
- ✅ 5.12: bloglist frontend, step 12 (ESLint configuration)
- ✅ 5.13-5.16: Blog list tests, step 1-4 (component testing)
- ✅ 5.17-5.23: Blog list end to end testing, step 1-7 (Cypress E2E)

**All 23 exercises completed! ✅**

## 🐛 Known Issues

None at the moment. All tests passing! 🎉

## 📝 License

This project is part of the [Full Stack Open](https://fullstackopen.com/) course by University of Helsinki.

## 👤 Author

**Muhammad Helmi Assura**
- University of Helsinki - Full Stack Open
- Part 5: Testing React apps, custom hooks

## 🙏 Acknowledgments

- [Full Stack Open](https://fullstackopen.com/) course material
- University of Helsinki
- React documentation
- Cypress documentation
- Vitest and React Testing Library communities

---

**Part 5 - Completed ✅**

>_*"The best error message is the one that never shows up." - Thomas Fuchs*_