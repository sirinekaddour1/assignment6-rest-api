const mongoose = require("mongoose");

// Define the structure of a note
const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  }
}, { timestamps: true });

// Export the Note model
module.exports = mongoose.model("Note", noteSchema);