import { useForm } from "react-hook-form";
import { SignUpCredentials } from "../network/users_api";
import * as UserApi from "../network/users_api";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { User } from "../models/users";
import TextFormFields from "./fields/TextFormFields";
import styleUtils from "../styles/utils.module.css"
import {useState} from "react"
import { ConflicError } from "../http-errors/http-error";

interface SignUpProps {
    onDismiss: () => void,
    onSignUpSuccessfull: (user: User) => void
}

const SignUpModalForm = ({ onDismiss, onSignUpSuccessfull }: SignUpProps) => {

    const [errorText, setErrorText] = useState<string | null>(null)
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignUpCredentials>()

    async function onSubmit(credentials: SignUpCredentials) {
        try {
            const newUser = await UserApi.signUp(credentials)
            onSignUpSuccessfull(newUser)
        } catch (error) {
            if(error instanceof ConflicError){
                setErrorText(error.message)
            }else{
                alert(error)
            }
            console.error(error)
        }
    }

    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>Sign Up</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    errorText &&
                    <Alert variant="danger">
                        {errorText}
                    </Alert>
                }
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <TextFormFields
                        name="username"
                        label="Username"
                        type="text"
                        placeholder="Username"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.username}
                    />

                    <TextFormFields
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="Email"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.email}
                    />
                    <TextFormFields
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="password"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.password}
                    />
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className={styleUtils.width100}>
                        Sign Up
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default SignUpModalForm;