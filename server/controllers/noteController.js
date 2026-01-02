import Note from "../models/Note.js";
import express from "express";

export const createNote = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user?.id; // set by authMiddleware
    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    if (!title || !description) {
      return res.status(500).json({
        success: false,
        message: "Please fill all the details",
      });
    }

    const note = new Note({ title, description, userId });
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.log("Error occured", error);
    res.status(500).json({
      success: false,
      message: "Some Error Occured in login",
    });
  }
};

export const getAllNotes = async (req, res) => {
  try {
    const userId = req.user?.id;
    const notes = await Note.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.log("Error occured", error);
    res.status(500).json({
      success: false,
      message: "Some Error Occured in login",
    });
  }
};

export const updateNotes = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user?.id;
    const noteId = req.params.id;

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      { userId, _id: noteId },
      { title, description }
    );

    if (!updatedNote) {
      return res.status(404).json(updatedNote);
    }

    res.status(200).json(updatedNote);
  } catch (error) {
    console.log("Error occured", error);
    res.status(500).json({
      success: false,
      message: "Some Error Occured",
    });
  }
};

export const deleteNotes = async (req, res) => {
  try {
    const userId = req.users?.id;
    const noteId = req.params.id;
    const deletedNote = await Note.findByIdAndDelete({ userId, _id: noteId });
    if (!deletedNote)
      return res
        .status(404)
        .json({ success: false, message: "Note is not deleted" });
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.log("Error occured", error);
    res.status(500).json({
      success: false,
      message: "Some Error Occured",
    });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const userId = req.user?.id;
    const noteId = req.params.id;
    const note = await Note.findOne({ userId, _id: noteId });

    if (!note) return res.status(404).json({ message: "Note not found" });

    res.status(200).json(note);
  } catch (error) {
    console.log("Error occured", error);
    res.status(500).json({
      success: false,
      message: "Some Error Occured while fetching single note",
    });
  }
};
