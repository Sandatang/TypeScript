import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { NoteInput } from "../network/notes_api";
import * as NoteApi from "../network/notes_api"
import { Note } from "../models/notes";

interface AddEditFormProps {
    noteToEdit?: Note,
    onDismiss: () => void,
    onSavedNote: (note: Note) => void,
}

const AddEditForm = ({ noteToEdit, onDismiss,onSavedNote}: AddEditFormProps) => {

    const {register, handleSubmit, formState: {errors, isSubmitting} } = useForm<NoteInput>({
        defaultValues: {
            title: noteToEdit?.title || "",
            text: noteToEdit?.text || ""
        }
    })

    async function onSubmit(input: NoteInput) {
        try {
            let response: Note;
            if(noteToEdit){
                response = await NoteApi.updateNote(noteToEdit._id, input)
            }else{
                response = await NoteApi.createNote(input)
            }
            onSavedNote(response)
        } catch (error) {
            console.error()
            alert(error)
        }
    }

    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {noteToEdit ? "Edit Note":"Add Note"}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form id="addEditFormDialog" onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group  className="mb-4">
                        <Form.Label>
                            Title*
                        </Form.Label>
                        <Form.Control 
                            type="text"
                            placeholder="Title"
                            isInvalid={!!errors.title}
                            {...register("title", {required: "Required"})}
                        />
                        <Form.Control.Feedback>
                            {errors.title?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>
                            Text
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            {...register("text")}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    type="submit"
                    form="addEditFormDialog"
                    disabled={isSubmitting}
                >
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
 
export default AddEditForm;