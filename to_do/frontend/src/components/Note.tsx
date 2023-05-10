import style from "../styles/Note.module.css"
import { Card } from "react-bootstrap"
import { Note as NoteModel } from "../models/notes"
import { formatedDate } from "../ulits/formatedDate"


interface NoteProps {
    note: NoteModel,
    className?: string,
}

const Note = ({note, className} : NoteProps) => {

    let updatedText: string
    if(note.updatedAt > note.createdAt){
        updatedText = "Updated: " + formatedDate(note.updatedAt)
    }else{
        updatedText = "Created: " + formatedDate(note.createdAt)
    }

    return (
        <Card className={`${style.noteCard} ${className}`}>
            <Card.Body className={`${style.cardBody}`}>
                <Card.Title>
                    {note.title}
                </Card.Title>
                <Card.Text className={style.textCard}>
                    {note.text}
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                {updatedText}
            </Card.Footer>
        </Card>
    )

}

export default Note