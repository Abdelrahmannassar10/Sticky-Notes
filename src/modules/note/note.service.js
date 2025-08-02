import e from 'express';
import { Note } from '../../DB/models/note.model.js';
import { User } from '../../DB/models/user.model.js';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();
export const createNote = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const userId = payload.id;
        const { title, content } = req.body;
        const note = new Note({ title, content, userId });
        await note.save();
        res.status(201).json({ message: 'Note created ' });
    } catch (error) {
        res.status(error.cause || 500).json({ message: error.message, success: false });
    }
};
export const UpdateNote = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const userId = payload.id;
        const noteId = req.params.noteId;
        const { title, content } = req.body;
        const noteExist = await Note.findOne({ _id: noteId });
        if (!noteExist) {
            throw Error("Note not found", { cause: 404 });
        }
        console.log(noteExist.userId);
        if (noteExist.userId.toString() !== userId) {
            throw Error("You are not the owner", { cause: 403 });
        }
        const updatedNote = await Note.findByIdAndUpdate(
            noteId,
            { title, content },
            { new: true }
        ).select("-__v ");
        res.status(200).json({ message: "Note updated", note: updatedNote });
    } catch (error) {
        res.status(error.cause || 500).json({ message: error.message, success: false });
    }

};
export const replaceNote = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const T_userId = payload.id;
        const noteId = req.params.noteId;
        const { title, content,userId } = req.body;
        // console.log(noteId);

        const noteExist = await Note.findById(noteId);
        // console.log(noteExist);
        if (!noteExist) {
            throw Error("Note not found", { cause: 404 });
        }
        console.log(noteExist.userId);
        console.log(T_userId);
        
        if (noteExist.userId.toString() !== T_userId) {
            throw Error("You are not the owner", { cause: 403 });
        }
        const updatedNote = await Note.findByIdAndUpdate(
            noteId,
            { title, content ,userId },
            { new: true }
        ).select("-__v ");
        res.status(200).json({ message: "Note updated", note: updatedNote });
    } catch (error) {
        res.status(error.cause || 500).json({ message: error.message, success: false });
    }

};
export const updateAll = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const userId = payload.id;
        const { title } = req.body;

        const updatedNotes = await Note.updateMany(
            { userId },
            { title },
            { new: true }
        ).select("-__v ");
        if (updatedNotes.matchedCount === 0) {
            throw Error("No notes found ", { cause: 404 });
        }
        res.status(200).json({ message: "All notes updated"});
    } catch (error) {
        res.status(error.cause || 500).json({ message: error.message, success: false });
    }
};
export const deleteNote = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const userId = payload.id;
        const noteId = req.params.noteId;

        const noteExist = await Note.findOne({ _id: noteId }).select("-__v ");
        if (!noteExist) {
            throw Error("Note not found", { cause: 404 });
        }
        if (noteExist.userId.toString() !== userId) {
            throw Error("You are not the owner", { cause: 403 });
        }
        await Note.deleteOne({ _id: noteId });
        res.status(200).json({ message: " deleted", note: noteExist });
    } catch (error) {
        res.status(error.cause || 500).json({ message: error.message, success: false });
    }
};
export const paginateSortNotes =async(req,res,next)=>{
    try {
        const token =req.headers.authorization;
        const payload =jwt.verify(token ,process.env.JWT_SECRET);
        const userId =payload.id;
        const page =parseInt(req.query.page);
        const limit =parseInt(req.query.limit);
        const skip =(page-1)*limit /// for skip some notes to get the notes for specific page 
        const notes =await Note.find({userId}).sort({createdAt:-1}).skip(skip).limit(limit);
        if(!notes){
            throw Error("notes not found",{cause:404});
        }
        res.status(200).json({message:"notes",notes});
    } catch (error) {
       res.status(error.cause || 500).json({ message: error.message, success: false });  
    }
};
export const getNote = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const userId = payload.id;
        const noteId = req.params.noteId;

        const note = await Note.findOne({ _id: noteId }).select("-__v ");
        if (!note) {
            throw Error("Note not found", { cause: 404 });
        }
        if (note.userId.toString() !== userId) {
            throw Error("You are not the owner", { cause: 403 });
        }
        res.status(200).json({ note });
    } catch (error) {
        res.status(error.cause || 500).json({ message: error.message, success: false });
    }
};
export const getNoteByContent = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const userId = payload.id;
        const { content } = req.query;

        const notes = await Note.find({ userId, content }).select("-__v ");
        if (!notes || notes.length === 0) {
            throw Error("No notes found", { cause: 404 });
        }
        res.status(200).json({ notes });
    } catch (error) {
        res.status(error.cause || 500).json({ message: error.message, success: false });
    }
};
export const getNoteWithUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const userId = payload.id;
        const notes = await Note.find({ userId }).select("id title userId createdAt").populate({ path: "userId", select:" email -_id" }).lean();
        if (!notes || notes.length === 0) {
            throw Error("No notes found", { cause: 404 });
        }
        res.status(200).json({ notes });
    } catch (error) {
        res.status(error.cause || 500).json({ message: error.message, success: false });
    }
};
export const getNoteByTitle = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const userId = payload.id;
        const { title } = req.query;

        const notes = await Note.find({ userId, title }).select(" _id title userId createdAt").populate({ path: "userId", select:" name email -_id" }).lean();
        if (!notes || notes.length === 0) {
            throw Error("No notes found", { cause: 404 });
        }
        const formedNotes = notes.map(note => ({
            title: note.title,
            userId:userId,
            createdAt: note.createdAt,
            user:{ name: note.userId.name, email: note.userId.email }

        }));
        res.status(200).json({ notes: formedNotes });
    } catch (error) {
        res.status(error.cause || 500).json({ message: error.message, success: false });
    }
};
export const deleteAllNotes = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const userId = payload.id;

       const result = await Note.deleteMany({ userId });
       if (result.deletedCount === 0) {
            throw Error("No notes found to delete", { cause: 404 });
        }
        res.status(200).json({ message: " Deleted"});
    } catch (error) {
        res.status(error.cause || 500).json({ message: error.message, success: false });
    }
};