import { Form } from "react-bootstrap";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";


interface TextFormFieldsBody{
    name: string,
    label: string,
    register: UseFormRegister<any>,
    registerOptions?: RegisterOptions,
    error?: FieldError,
    [x: string]: any
}

const TextFormFields = ({name, label, register, registerOptions, error, ...props}: TextFormFieldsBody) => {
    return (
        <Form.Group className="mb-3" controlId={name + "-input"}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                {...props}
                {...register(name, registerOptions)}
                isInvalid={!!error}
            />
            <Form.Control.Feedback>
                {error?.message}
            </Form.Control.Feedback>
        </Form.Group>
    );
}
 
export default TextFormFields;