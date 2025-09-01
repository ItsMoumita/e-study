# 📘 E-Study

**E-Study** is a full-featured assignment management web application that enables students to attempt assignments and evaluators to create, manage, and grade them. It offers a seamless user experience with protected routes, Google & email/password authentication, assignment filtering, and real-time validation

🌐 **Live Site:** https://e-study-efba6.web.app/

---

## ✨ Features

### 🔐 Authentication
- Firebase authentication using **Email/Password** and **Google Sign-In**
- Custom validation and feedback using **toast/sweet alert**
- JWT-based secure access to private/protected routes

### 📚 Assignment System
- **Create Assignment** (Title, Description, Marks, Level, Due Date, Thumbnail)
- **Assignments Page** (View All Assignments)
  - Public page showing all created assignments
  - Filter assignments by difficulty level (Easy, Medium, Hard)
- **View Assignment Details**
  - Protected dynamic route with full details
  - “Take Assignment” modal for submission (Google Docs link + notes)

### 📝 Assignment Submission & Review
- **Take Assignment** – Users can submit responses for review
- **My Submitted Assignments** – View submitted assignments, their marks & feedback
- **Pending Assignments Page** – For evaluators to review submissions
  - Marking with marks, feedback, and auto-status update
  - Review other users’ submissions (cannot mark own)

### 🛠 Assignment Management
- **Update Assignment** (pre-filled form, only if created by current user)
- **Delete Assignment** (only creator can delete; protected with modal confirmation)

### 🌐 Routing & Navigation
- Conditional Navbar with Login/Logout/Profile (with hover info)
- Private/Protected Routes:
  - Create Assignment
  - View Assignment
  - My Assignments
  - Pending Assignments

### 💡 Home Page
- Responsive **Banner**, **Features Section**, and **FAQ**
- Smooth animation using **Framer Motion**

### 🎨 UI & Theming
- Responsive Tailwind CSS styling
- **Dark/Light Theme Toggle** with full-system appearance switch

---

## 🛠️ Technologies Used

### Frontend:
- **React 19**
- **React Router v7**
- **Firebase Authentication**
- **Axios**
- **Framer Motion** (Animations)
- **SweetAlert2** (Alerts)
- **React Datepicker**
- **React Icons**
- **React Loader Spinner**
- **Tailwind CSS**

### Backend:
- **Node.js**
- **Express.js**
- **MongoDB**
- **JWT** (Token-based private route protection)

---

