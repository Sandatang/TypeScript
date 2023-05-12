import React, { useEffect, useState } from 'react';
import {Note as NoteModel } from './models/notes';
import Note from './components/Note';
import { Button, Col, Container, Row } from "react-bootstrap";
import style from "./styles/NotePage.module.css"
import styleUtils from "./styles/utils.module.css"
import * as NoteApi from "./network/notes_api"
import {FaPlus} from 'react-icons/fa'
import AddEditForm from './components/AddEditFormDialog';

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([])

  const [showAddFormDialog, setShowAddFormDialog] = useState(false)
  const [noteToEdit, setNoteToEdit] = useState<NoteModel|null>(null)
  useEffect(() => {
    async function loadNotes() {
      try {
        const notes = await NoteApi.fetchNotes()
        setNotes(notes)
      } catch (error) {
        console.error(error)
        alert(error)
      }
    }
    loadNotes()
  }, [])

  async function deleteNote(note: NoteModel) {
    try {
      await NoteApi.deleteNotes(note._id)
      setNotes(notes.filter(noteExist  => noteExist._id !== note._id))
    } catch (error) {
      console.error(error)
      alert(error)
    }
  }
  return (
    <Container>
      <Button 
        className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
        onClick={() => setShowAddFormDialog(true)}>
        <FaPlus/>
        Add note
      </Button>
      <Row xs={1} md={2} xl={3} className='g-4'>
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
      {showAddFormDialog &&
        <AddEditForm 
          onDismiss={() => setShowAddFormDialog(false)}
          onSavedNote={(newNote) => {
            setNotes([...notes, newNote])
            setShowAddFormDialog(false)
          }}
        />
      }

      {noteToEdit &&
        <AddEditForm 
          noteToEdit={noteToEdit}
          onDismiss={() => setNoteToEdit(null)}
          onSavedNote={(updateNote) => {
            setNotes(notes.map(existingNote => existingNote._id === updateNote._id ? updateNote: existingNote))
            setNoteToEdit(null)
          }}
        />
      }
    </Container>
  );
}

export default App;
