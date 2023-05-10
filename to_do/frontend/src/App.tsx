import React, { useEffect, useState } from 'react';
import { Note as NoteModel } from './models/notes';
import Note from './components/Note';
import { Col, Container, Row } from "react-bootstrap";
import style from "./styles/NotePage.module.css"

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([])

  useEffect(() => {
    async function loadNotes() {
      try {
        const response = await fetch("/api/notes", { method: "GET" })
        const notes = await response.json()
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
      <Row xs={1} md={2} xl={3} className='g-4'>
      {notes.map(note => {
        return (
          <Col key={note._id} >
            <Note note={note} className={style.note}/>
          </Col>
        )
      })}
      </Row>
    </Container>
  );
}

export default App;
