import React, { useEffect, useState } from 'react';
import { Note as NoteModel } from './models/notes';
import Note from './components/Note';
import { Button, Col, Container, Row } from "react-bootstrap";
import style from "./styles/NotePage.module.css"
import * as NoteApi from "./network/notes_api"
import AddForm from './components/AddFormDialog';

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([])

  const [showAddFormDialog, setShowAddFormDialog] = useState(false)

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

  return (
    <Container>
      <Button onClick={() => setShowAddFormDialog(true)}>
        add note
      </Button>
      <Row xs={1} md={2} xl={3} className='g-4'>
      {notes.map(note => {
        return (
          <Col key={note._id} >
            <Note note={note} className={style.note}/>
          </Col>
        )
      })}
      </Row>
      {showAddFormDialog &&
        <AddForm onDismiss={() => setShowAddFormDialog(false)}/>
      }
    </Container>
  );
}

export default App;
