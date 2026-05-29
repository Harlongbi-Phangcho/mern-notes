import { Note } from "../models/notes.model.js";

export const getAllNotes = async (_, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });

    return res.status(200).json(notes);
  } catch (error) {
    console.log("Error in getAllNote controller: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    return res.status(200).json(note);
  } catch (error) {
    console.log("Error in getNoteById controller: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    const note = new Note({ title, content });

    const savedNote = await note.save();
    return res.status(201).json(savedNote);
  } catch (error) {
    console.log("Error in createNote controller: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const { id } = req.params;

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      {
        title,
        content,
      },
      { new: true },
    );

    if (!updatedNote)
      return res.status(404).json({ message: "Note not found" });

    return res.status(200).json(updatedNote);
  } catch (error) {
    console.log("Error in updateNote controller: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote)
      return res.status(404).json({ message: "Note not found" });

    return res.status(200).json({ message: "Deleted note successfully" });
  } catch (error) {
    console.log("Error in deleteNote controller: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
