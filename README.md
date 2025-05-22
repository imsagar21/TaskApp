# TaskBuddy - Task Management App

This is a full-stack task management application with a React (Vite, TypeScript) frontend and a Node.js (Express, TypeScript, MongoDB) backend.

---

## Prerequisites

- Node.js (v18 or above)
- npm
- MongoDB (local or remote)

---

## Backend Setup

1. **Navigate to the backend folder:**
   ```sh
   cd backend
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Configure environment variables:**
   - Copy `.env.example` to `.env` and fill in your values.
4. **Run the backend server:**
   ```sh
   npm run dev
   ```
   - The backend will start on `http://localhost:5050` by default.

---

## Frontend Setup

1. **Navigate to the frontend folder:**
   ```sh
   cd frontend
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Run the frontend development server:**
   ```sh
   npm run dev
   ```
   - The app will be available at [http://localhost:5173](http://localhost:5173)

---

## Usage

- Open [http://localhost:5173](http://localhost:5173) in your browser.
- Register or log in to manage your tasks.

---

## Project Structure

- `backend/` - Express API, MongoDB models, authentication, and routes.
- `frontend/` - React app, components, pages, and context.

---

## Troubleshooting

- Ensure MongoDB is running and accessible.
- Check `.env` variables for correct values.
- For CORS issues, verify backend `origin` matches frontend URL.

---

## License

MIT
