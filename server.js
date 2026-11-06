require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const Note = require("./models/Note");

const app = express();
const PORT = process.env.PORT || 3000;

// Allow the server to read JSON data
app.use(express.json());

// Get all notes
app.get("/notes", async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get a note by its ID
app.get("/notes/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: "Invalid note ID" });
    }

    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Create a new note
app.post("/notes", async (req, res) => {
  try {
    const { title, content } = req.body;

    // Check if the user entered valid data
    if (
      typeof title !== "string" ||
      !title.trim() ||
      typeof content !== "string" ||
      !content.trim()
    ) {
      return res.status(400).json({
        error: "Title and content must be non-empty strings"
      });
    }

    const note = new Note({ title, content });
    await note.save();

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Update an existing note
app.put("/notes/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: "Invalid note ID" });
    }

    const { title, content } = req.body;

    // Check the new data before updating
    if (
      typeof title !== "string" ||
      !title.trim() ||
      typeof content !== "string" ||
      !content.trim()
    ) {
      return res.status(400).json({
        error: "Title and content must be non-empty strings"
      });
    }

    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true, runValidators: true }
    );

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Delete a note by its ID
app.delete("/notes/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: "Invalid note ID" });
    }

    const note = await Note.findByIdAndDelete(req.params.id);

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.status(200).json({
      message: "Note deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Handle invalid JSON requests
app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    return res.status(400).json({ error: "Invalid JSON body" });
  }

  res.status(500).json({ error: "Server error" });
});

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });