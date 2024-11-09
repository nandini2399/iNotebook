const express = require("express");
const router = express.Router();
var fetchUser = require("../middleware/fetchUser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// get all notes using get "/api/notes/fetchAllNotes" (login required)
router.get("/fetchAllNotes", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Internal error occurred" });
  }
});

// add new note using post "/api/notes/addNewNote" (login required)
router.post(
  "/addNewNote",
  fetchUser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be of atleast 5 characters").isLength(
      { min: 3 }
    ),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, description, tag } = req.body;

      const note = new Notes({
        user: req.user.id,
        title,
        description,
        tag,
      });

      const savedNotes = await note.save();

      res.json(savedNotes);
    } catch (error) {
      res.status(500).json({ error: "Internal error occurred" });
    }
  }
);

// update existing note using put "/api/notes/updateNote" (login required)
router.put("/updateNote/:id", fetchUser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Unauthorized");
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.send(note);
  } catch (error) {
    res.status(500).json({ error: "Internal error occurred" });
    console.log(error.message);
  }
});

// delte existing note using delete "/api/notes/deleteNote" (login required)
router.delete("/deleteNote/:id", fetchUser, async (req, res) => {
  try {
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Unauthorized");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    console.log(note);
    if (note) res.status(200).send("Deleted");
  } catch (error) {
    res.status(500).json({ error: "Internal error occurred" });
    console.log(error.message);
  }
});

module.exports = router;
