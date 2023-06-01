import { useEffect, useState } from 'react';
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import AddEditForm from '../components/AddEditFormDialog';
import { Note as NoteModel } from '../models/notes';
import * as NotesApi from "../network/notes_api";
import Note from "./Note";
import style from "../styles/NotePage.module.css";
import styleUtils from "../styles/utils.module.css";

const NotesLoggedInView = () => {
    const [notes, setNotes] = useState<NoteModel[]>([])

    const [showAddFormDialog, setShowAddFormDialog] = useState(false)
    const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null)

    const [notesLoading, setNotesLoading] = useState(true)
    const [notesLoadingError, setNotesLoadingError] = useState(false)

    useEffect(() => {
        async function loadNotes() {
            try {
                setNotesLoadingError(false)
                setNotesLoading(true)
                const notes = await NotesApi.fetchNotes()
                setNotes(notes)
            } catch (error) {
                console.error(error)
                setNotesLoadingError(true)
            } finally {
                setNotesLoading(false)
            }
        }
        loadNotes()
    }, [])

    async function deleteNote(note: NoteModel) {
        try {
            await NotesApi.deleteNotes(note._id)
            setNotes(notes.filter(noteExist => noteExist._id !== note._id))
        } catch (error) {
            console.error(error)
            alert(error)
        }
    }

    const notesGrid =
        <>
            <Row xs={1} md={2} xl={3} className={`g-4 ${style.noteGrid}`}>
                {notes.map(note => {
                    return (
                        <Col key={note._id} >
                            <Note
                                note={note}
                                className={style.note}
                                onDeleteNoteCliked={deleteNote}
                                onNoteClicked={setNoteToEdit}
                            />
                        </Col>
                    )
                })}
            </Row>
        </>
    return (

        <>
            <Button
                className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
                onClick={() => setShowAddFormDialog(true)}>
                <FaPlus />
                Add note
            </Button>

            {notesLoading && <Spinner animation='border' variant='primary' />}
            {notesLoadingError && <p>Something went wrong. Please refresh the page</p>}
            {
                !notesLoading && !notesLoadingError &&
                <>
                    {
                        notes.length > 0
                            ? notesGrid : <p>You don't have any notes yet.</p>
                    }
                </>
            }

            {
                showAddFormDialog &&
                <AddEditForm
                    onDismiss={() => setShowAddFormDialog(false)}
                    onSavedNote={(newNote) => {
                        setNotes([...notes, newNote])
                        setShowAddFormDialog(false)
                    }}
                />
            }

            {
                noteToEdit &&
                <AddEditForm
                    noteToEdit={noteToEdit}
                    onDismiss={() => setNoteToEdit(null)}
                    onSavedNote={(updateNote) => {
                        setNotes(notes.map(existingNote => existingNote._id === updateNote._id ? updateNote : existingNote))
                        setNoteToEdit(null)
                    }}
                />
            }

        </>
    );
}

export default NotesLoggedInView;