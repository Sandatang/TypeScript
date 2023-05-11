import { Button, Form, Modal } from "react-bootstrap";

interface AddFormProps {
    onDismiss: () => void,
}

const AddForm = ({onDismiss}: AddFormProps) => {
    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Add Note
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group  className="mb-4">
                        <Form.Label>
                            Title
                        </Form.Label>
                        <Form.Control 
                            type="text"
                            placeholder="Title"
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>
                            Text
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
 
export default AddForm;