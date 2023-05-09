import express from "express"
import * as NotesControllers from "../controllers/notesControllers"

const router = express.Router()

router.get('/', NotesControllers.getNotes);

router.get('/:noteId', NotesControllers.getNote)

router.post('/', NotesControllers.createNotes)

router.patch('/:noteId', NotesControllers.updateNotes)

router.delete('/:noteId', NotesControllers.deleteNote)

export default router