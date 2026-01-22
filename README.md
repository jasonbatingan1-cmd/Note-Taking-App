# 📝 JBNotes — A Full‑Stack Note‑Taking App
## Overview
JBNotes is a full‑stack web application that allows users to register, log in, and manage personal notes. Once authenticated, users can create, read, update, and delete notes through a clean and intuitive interface. The project demonstrates core skills in Express.js, MongoDB, authentication, RESTful routing, and server‑side rendering with EJS.
## ✨ Features
- User registration and login with secure password hashing
- Session‑based authentication
- Create, view, edit, and delete notes
- Flash/toast notifications for user feedback
- RESTful routing structure
- MongoDB persistence using Mongoose
- EJS templates for dynamic server‑side rendering
## 🧰 Tech Stack
| Layer | Technology |
|---|---|
| Backend | Node.js, Express.js |
| Frontend | EJS, CSS/Bootstrap |
| Database | MongoDB + Mongoose |
| Authentication | Passport.js |
| Utilities | Express‑Session |
## 📦 Installation & Setup
1. Clone the repository
```bash 
git clone https://github.com/yourusername/notekeeper.git
cd notekeeper
```
2. Install dependencies
```
npm install
```
3. Environment variables
Create a .env file with:
```
MONGO_URI=mongodb://localhost:27017/notekeeper
SESSION_SECRET=yourSecretHere
PORT=3000
```
4. Start the server
```
npm start
```
Your app will be available at:
http://localhost:3000
## 🗂️ RESTful Route Structure
### Auth Routes
Method  | Path | Description
|---|---|---|
GET |   /register | Show registration form
POST |  /register | Create new user
GET |   /login |    Show login form
POST |  /login |    Authenticate user
POST |  /logout |   Log out user
### Notes Routes
Method |    Path |  Description
|---|---|---|
GET |   /notes |    List all notes for logged‑in user
GET |   /notes/new| Show form to create a new note
POST |  /notes |    Create a new note
GET |   /notes/:id |    Show a single note
GET |   /notes/:id/edit |   Show edit form
PUT |   /notes/:id |    Update a note
DELETE |    /notes/:id |    Delete a note
## 📁 Project Structure
```
Note-Taking-App
├── models/
│   ├── User.js
│   └── Note.js
├── routes/
│   ├── authRouter.js
│   └── notesRouter.js
├── views/
│   ├── auth.ejs
│   ├── form.ejs
│   ├── notes.ejs
│   └── partials/
|       |── header.ejs
|       └── footer.ejs 
├── index.js
└── package.json
```
## 🔐 Authentication Flow
- Passwords hashed using bcrypt
- Sessions stored in memory or MongoStore
- Middleware protects all /notes/* routes
- Flash/toast messages provide user feedback
<br><br><br>*JBNotes by Jason Batingan, 2026*
