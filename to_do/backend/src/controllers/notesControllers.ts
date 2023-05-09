import { RequestHandler } from "express"
import NotesModel from "../models/node"
import createHttpError from "http-errors"
import mongoose from "mongoose"

export const getNotes: RequestHandler = async (req, res, next) => {
    try {
        const notes = await NotesModel.find().exec()
        res.status(200).json(notes)
    } catch (error) {
        next(error)
    }
}

export const getNote: RequestHandler = async (req, res, next) => {
    const noteId = req.params.noteId
    try {
        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid note ID")
        }

        const note = await NotesModel.findById(noteId).exec()

        if (!note) {
            throw createHttpError(404, "Note not found")
        }
        res.status(200).json(note)
    } catch (error) {
        next(error)
    }
}

interface CreateNoteBody {
    title?: string,
    text?: string,
}

export const createNotes: RequestHandler<unknown, unknown, CreateNoteBody, unknown> = async (req, res, next) => {
    const title = req.body.title
    const text = req.body.text

    try {

        if (!title) {
            throw createHttpError(400, "Note must have a title")
        }

        const newNotes = await NotesModel.create({
            title: title,
            text: text,
        })

        res.status(201).json(newNotes)
    } catch (error) {
        next(error)
    }
}

interface UpdateNoteId {
    noteId: string
}

interface UpdateNoteBody {
    title?: string,
    text?: string,
}

export const updateNotes: RequestHandler<UpdateNoteId, unknown, UpdateNoteBody, unknown> = async (req, res, next) => {
    const noteId = req.params.noteId
    const newTitle = req.body.title
    const newText = req.body.text

    try {
        if(!mongoose.isValidObjectId(noteId)){
            throw createHttpError(400, "Invalid Note ID")
        }

        if(!newTitle){
            throw createHttpError(400, "Note must have a title")
        }

        const note = await NotesModel.findById(noteId).exec()

        if(!note){
            throw createHttpError(404, "Note not found")
        }

        note.title = newTitle
        note.text = newText

        const updatedNote = await note.save()
        res.status(200).json(updatedNote)

    } catch (error) {
        next(error)
    }
}

export const deleteNote: RequestHandler = async (req, res, next) => {
    const noteId = req.params.noteId

    try {
        if(!mongoose.isValidObjectId(noteId)){
            throw createHttpError(400, "Invalid Note ID")
        }

        const note = await NotesModel.findById(noteId).exec()

        if(!note){
            throw createHttpError(404, "Note not found")
        }

        await note.deleteOne()
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
}