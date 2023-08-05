const express = require("express");
const fetchuser = require("../middleware/fetchUser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const router = express.Router();

//ROUTE 1: GEt all notes of a user using GET '/api/notes/fetchallnotes'. login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
  console.log('Done');
});

//ROUTE 2: Add new notes of a user using POST '/api/notes/addnote'. login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a Title").exists(),
    body("description", "Enter a Description").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const note = await Notes.create({
        user: req.user.id,
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag ? req.body.tag : "General",
      });
      res.send({ note });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

//ROUTE 3: Update a note of a user using POST '/api/notes/updatenote'. login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  // create newNote
  const newNote = {};
  if (!newNote.title) {
    newNote.title = title;
  }
  if (!newNote.description) {
    newNote.description = description;
  }
  if (!newNote.tag) {
    newNote.tag = tag;
  }

  try {
    // Find the note to be updated and update it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
});

//ROUTE 4: Delete a note of a user using DELETE '/api/notes/deletenote'. login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // Find the note to be Deleted and Delete it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: "Note has been removed", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
});
module.exports = router;
