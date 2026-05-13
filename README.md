## 📌 Project Title
**DecodeLabs Project 3 — Database Integration**

---

## 📖 Description

Extends Project 2 by connecting the Express API to a **real MongoDB database** using **Mongoose ORM**. Data is now permanently stored — it survives server restarts.

**What it does:**
- Connects Node.js + Express backend to **MongoDB Atlas** (cloud database)
- Defines a **User schema** with data types and constraints (UNIQUE, NOT NULL)
- Performs full **CRUD operations** that read/write to the actual database
- Handles all database errors (duplicate keys, invalid IDs, validation failures)
- Uses **Mongoose ORM** — safe from injection attacks

---no

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js | JavaScript runtime |
| Express.js | Web framework / routing |
| MongoDB Atlas | Cloud database (NoSQL) |
| Mongoose | ORM — bridges code and database |
| dotenv | Manages secret environment variables |

---

## 📁 Project Structure

```
decodelabs-p3/
├── config/
│   └── db.js          ← MongoDB connection logic
├── models/
│   └── User.js        ← Database schema (blueprint)
├── server.js          ← Main API server with all routes
├── .env               ← Secret keys (NOT uploaded to GitHub)
├── .gitignore         ← Excludes node_modules & .env
├── package.json       ← Dependencies
└── README.md          ← This file
```

---

## ⚙️ How to Run

### Step 1 — Install Dependencies
```bash
npm install
```

### Step 2 — Start the Server
```bash
node server.js
```

You should see:
```
✅ MongoDB Connected: cluster0.ptu4rmc.mongodb.net
✅ Server running at http://localhost:3000
```

---

## 📡 API Endpoints

| Method | Endpoint | Description | DB Operation |
|--------|----------|-------------|-------------|
| `GET` | `/` | Health check | — |
| `GET` | `/users` | Get all users | SELECT * |
| `GET` | `/users/:id` | Get one user | SELECT WHERE id |
| `POST` | `/users` | Create user | INSERT |
| `PUT` | `/users/:id` | Update user | UPDATE |
| `DELETE` | `/users/:id` | Delete user | DELETE |

---

## 🧱 Database Schema

```javascript
User {
  name:      String  — required, min 2 chars
  email:     String  — required, unique, valid format
  role:      String  — "user" or "admin" (default: "user")
  createdAt: Date    — auto generated
  updatedAt: Date    — auto generated
}
```

---

## 🔑 Key Concepts Demonstrated

| Concept | Implementation |
|---------|---------------|
| Schema Design | Mongoose User model with constraints |
| Database Connection | MongoDB Atlas via Mongoose |
| CRUD Operations | Create, Read, Update, Delete to real DB |
| Data Integrity | UNIQUE email, NOT NULL fields, enum roles |
| Error Handling | Duplicate key, CastError, ValidationError |

---

*Built for DecodeLabs Industrial Training Kit — Project 3: Database Integration*
 
