require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const User = require("./models/User");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// ── GET /  →  Health Check ────────────────────
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "DecodeLabs Project 3 API 🚀 — Database Connected!",
    version: "2.0.0",
    database: "MongoDB Atlas",
    endpoints: {
      "GET  /users": "Get all users from DB",
      "GET  /users/:id": "Get one user by ID",
      "POST /users": "Create & save user to DB",
      "PUT  /users/:id": "Update user in DB",
      "DELETE /users/:id": "Delete user from DB",
    },
  });
});

// ── GET /users  →  Get ALL users ─────────────
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// ── GET /users/:id  →  Get ONE user ──────────
app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: `User with ID ${req.params.id} not found.`,
      });
    }
    res.status(200).json({ status: "success", data: user });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ status: "error", message: "Invalid ID format." });
    }
    res.status(500).json({ status: "error", message: error.message });
  }
});

// ── POST /users  →  CREATE user ───────────────
app.post("/users", async (req, res) => {
  try {
    const { name, email, role } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        status: "error",
        message: "Bad Request: 'name' and 'email' are required.",
      });
    }

    const newUser = await User.create({ name, email, role });

    res.status(201).json({
      status: "success",
      message: "User saved to database successfully.",
      data: newUser,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        status: "error",
        message: "Conflict: A user with this email already exists.",
      });
    }
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ status: "error", message: messages.join(", ") });
    }
    res.status(500).json({ status: "error", message: error.message });
  }
});

// ── PUT /users/:id  →  UPDATE user ───────────
app.put("/users/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({
        status: "error",
        message: `User with ID ${req.params.id} not found.`,
      });
    }
    res.status(200).json({
      status: "success",
      message: "User updated in database.",
      data: updatedUser,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ status: "error", message: "Invalid ID format." });
    }
    if (error.code === 11000) {
      return res.status(409).json({ status: "error", message: "Email already exists." });
    }
    res.status(500).json({ status: "error", message: error.message });
  }
});

// ── DELETE /users/:id  →  DELETE user ────────
app.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({
        status: "error",
        message: `User with ID ${req.params.id} not found.`,
      });
    }
    res.status(200).json({
      status: "success",
      message: `User "${deletedUser.name}" deleted from database.`,
      data: deletedUser,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ status: "error", message: "Invalid ID format." });
    }
    res.status(500).json({ status: "error", message: error.message });
  }
});

// ── 404 Handler ───────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: `Route ${req.method} ${req.originalUrl} not found.`,
  });
});

// ── Start Server ──────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
