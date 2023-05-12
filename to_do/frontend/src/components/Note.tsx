import style from "../styles/Note.module.css"
import styleUtils from "../styles/utils.module.css"
import { Card } from "react-bootstrap"
import { Note as NoteModel } from "../models/notes"
import { formatedDate } from "../ulits/formatedDate"
import { MdDelete } from 'react-icons/md'

interface NoteProps {
    note: NoteModel,
    onNoteClicked: (note: NoteModel) => void,
    onDeleteNoteCliked: (note: NoteModel) => void,
    className?: string,
}

const Note = ({ note, onNoteClicked, onDeleteNoteCliked, className }: NoteProps) => {

    let updatedText: string
    if (note.updatedAt > note.createdAt) {
        updatedText = "Updated: " + formatedDate(note.updatedAt)
    } else {
        updatedText = "Created: " + formatedDate(note.createdAt)
    }

    return (
        <Card 
        className={`${style.noteCard} ${className}  ${styleUtils.cursorPointer}`}
        onClick={() => onNoteClicked(note)}
        >
            <Card.Body className={`${style.cardBody}`}>
                <Card.Title className={`${styleUtils.flexCenter}`}>
                    {note.title}
                    <MdDelete
                        className={`text-muted ms-auto ${styleUtils.cursorPointer}`}
                        onClick={(e) => {
                            onDeleteNoteCliked(note)
                            e.stopPropagation()
                        }}
                    />
                </Card.Title>
                <Card.Text className={style.textCard}>
                    {note.text}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                {updatedText}
            </Card.Footer>
        </Card>
    )

}

export default Note